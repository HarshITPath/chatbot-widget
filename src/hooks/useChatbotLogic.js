import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  useStreamingOptimization,
  useMessageOptimization,
} from "./useOptimizedChat";
import { chatAPI } from "../api/client";
import sessionManager from "../utils/helper/sessionManager";
import { USER_TYPE } from "../utils/constant";

export const useChatLogic = (initialMessages, config) => {
  const [messages, setMessages] = useState(initialMessages || []);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasFirstChunk, setHasFirstChunk] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);
  const sessionLoadedRef = useRef(false);
  const loadingSessionRef = useRef(false);

  // Use optimization hooks
  const { addToStream, flushStream, resetStream } = useStreamingOptimization();
  const { messageKeys } = useMessageOptimization(messages);

  // Load messages from session - memoized to prevent duplicate calls
  const loadSessionMessages = useCallback(async (sessionId) => {
    if (!sessionId || sessionLoadedRef.current || loadingSessionRef.current) {
      return;
    }

    loadingSessionRef.current = true;
    sessionLoadedRef.current = true;

    try {
      console.log("Loading session messages for:", sessionId);
      const data = await chatAPI.getSessionMessages(sessionId);
      if (data.messages && Array.isArray(data.messages)) {
        // Transform API messages to match our message format
        const transformedMessages = data.messages.map((msg) => ({
          sender: msg.role === USER_TYPE.USER ? USER_TYPE.USER : USER_TYPE.BOT,
          text: msg.content,
          timestamp: msg.timestamp,
          messageIndex: msg.messageIndex,
        }));
        setMessages(transformedMessages);

        // Save session info to history
        sessionManager.saveSessionToHistory(sessionId, {
          messageCount: data.count || transformedMessages.length,
          lastMessage:
            transformedMessages[transformedMessages.length - 1]?.text || "",
          historyType: data.historyType || "comprehensive",
        });

        console.log(
          "Session messages loaded successfully:",
          transformedMessages.length,
          "messages"
        );
      }
    } catch (error) {
      console.error("Failed to load session messages:", error);
      // Reset the flags on error so retry is possible
      sessionLoadedRef.current = false;
      loadingSessionRef.current = false;

      clearSession();
    } finally {
      loadingSessionRef.current = false;
    }
  }, []);

  // Memoize configuration values to prevent recalculation
  const configValues = useMemo(
    () => ({
      apiUrl: config?.apiUrl || "http://192.168.0.39:3000/api",
      botName: config?.botName || "IT Path Assistant",
      botAvatar: config?.botAvatar || "🤖",
      userAvatar: config?.userAvatar || "👤",
      placeholder: config?.placeholder || "Type your message...",
      useStreaming: config?.useStreaming !== false, // Default to true, can be disabled
      windowSize: config?.windowSize || {
        width: {
          xs: "calc(100vw - 16px)",
          sm: "min(90vw, 540px)",
          md: "min(50vw, 650px)",
        },
        height: {
          xs: "calc(100vh - 32px)",
          sm: "min(90vh, 720px)",
          md: "min(85vh, 750px)",
        },
      },
      borderRadius: config?.borderRadius || 3,
      shadow: config?.shadow || "0 8px 32px rgba(0,0,0,0.12)",
      zIndex: config?.zIndex || 1300,
      fontFamily:
        config?.fontFamily || '"Roboto", "Helvetica", "Arial", sans-serif',
    }),
    [config]
  );

  // Optimized sendMessage with session management and streaming support
  const sendMessage = useCallback(
    async (useStreaming = true) => {
      if (!input.trim() || loading) return;

      const userMessage = { sender: USER_TYPE.USER, text: input };
      const messageText = input;

      // Clear input immediately for better UX
      setInput("");

      // Add user message
      setMessages((prev) => [...prev, userMessage]);

      setLoading(true);
      setHasFirstChunk(false);
      resetStream();

      try {
        if (useStreaming) {
          // Handle streaming response
          const response = await chatAPI.sendMessage(
            messageText,
            sessionId,
            true
          );

          if (!response.body) throw new Error("No response body");

          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let botMessageAdded = false;
          let sessionData = {};

          // Optimized update function using streaming hook
          const updateBotMessage = (text) => {
            setMessages((prev) => {
              const updated = [...prev];
              const lastIndex = updated.length - 1;
              if (updated[lastIndex]?.sender === USER_TYPE.BOT) {
                updated[lastIndex] = {
                  ...updated[lastIndex],
                  text: text,
                };
              }
              return updated;
            });
          };

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk
              .split("\n")
              .filter((line) => line.trim().startsWith("data:"));

            for (const line of lines) {
              try {
                const json = JSON.parse(line.replace(/^data:\s*/, ""));

                // Handle session creation/metadata - check for both formats
                if (json.sessionId) {
                  if (!sessionId) {
                    console.log(
                      "Setting session ID from streaming:",
                      json.sessionId
                    );
                    setSessionId(json.sessionId);
                  }
                  sessionData.sessionId = json.sessionId;
                }

                // Handle session creation type
                if (json.type === "session_created" && json.sessionId) {
                  if (!sessionId) {
                    console.log(
                      "Session created via streaming:",
                      json.sessionId
                    );
                    setSessionId(json.sessionId);
                  }
                  sessionData.sessionId = json.sessionId;
                }

                if (json.messageCount) {
                  sessionData.messageCount = json.messageCount;
                }
                if (json.tokenUsage) {
                  sessionData.tokenUsage = json.tokenUsage;
                }

                if (json.chunk) {
                  // First chunk - add bot message placeholder
                  if (!botMessageAdded) {
                    setMessages((prev) => [
                      ...prev,
                      {
                        sender: USER_TYPE.BOT,
                        text: "",
                        sessionId: sessionData.sessionId,
                        messageCount: sessionData.messageCount,
                        timestamp: new Date().toISOString(),
                      },
                    ]);
                    botMessageAdded = true;
                    setHasFirstChunk(true);
                  }

                  // Use optimized streaming with batching
                  addToStream(json.chunk, updateBotMessage, {
                    batchSize: 5,
                    updateInterval: 30,
                  });
                }

                // Handle completion - check for both formats
                if (json.done === true) {
                  // Final session update
                  if (sessionData.sessionId || json.sessionId) {
                    const finalSessionId =
                      sessionData.sessionId || json.sessionId;
                    const finalMessageCount =
                      sessionData.messageCount || json.messageCount;

                    console.log(
                      "Streaming completed. Final session:",
                      finalSessionId,
                      "Message count:",
                      finalMessageCount
                    );

                    // Update session history with final data
                    sessionManager.saveSessionToHistory(finalSessionId, {
                      messageCount: finalMessageCount,
                      lastMessage:
                        json.finalResponse || "Streaming response completed",
                      lastTimestamp: new Date().toISOString(),
                      tokenUsage: sessionData.tokenUsage || json.tokenUsage,
                    });

                    // Ensure session ID is set if not already
                    if (!sessionId && finalSessionId) {
                      console.log("Setting final session ID:", finalSessionId);
                      setSessionId(finalSessionId);
                    }
                  }
                }
              } catch (e) {
                console.error("Failed to parse chunk:", line, e);
              }
            }
          }

          // Final flush to ensure all content is displayed
          flushStream(updateBotMessage);
        } else {
          // Handle non-streaming JSON response
          const data = await chatAPI.sendMessage(messageText, sessionId, false);

          // Set session ID if this was the first message
          if (!sessionId && data.sessionId) {
            setSessionId(data.sessionId);
          }

          // Add bot response to messages
          if (data.response) {
            const botMessage = {
              sender: USER_TYPE.BOT,
              text: data.response,
              sessionId: data.sessionId,
              messageCount: data.messageCount,
              timestamp: new Date().toISOString(),
              tokenUsage: data.tokenUsage,
              cacheHit: data.cacheHit,
            };

            setMessages((prev) => [...prev, botMessage]);

            // Update session history
            if (data.sessionId) {
              sessionManager.saveSessionToHistory(data.sessionId, {
                messageCount: data.messageCount,
                lastMessage: data.response,
                lastTimestamp: botMessage.timestamp,
                tokenUsage: data.tokenUsage,
              });
            }
          }
        }
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          {
            sender: USER_TYPE.BOT,
            text: "⚠️ Something went wrong. Please try again.",
          },
        ]);
        console.error("Chat error:", error);
      } finally {
        setLoading(false);
        resetStream();
      }
    },
    [input, loading, sessionId, resetStream, addToStream, flushStream]
  );

  // Function to clear session and start fresh
  const clearSession = useCallback(() => {
    sessionManager.clearSession();
    setSessionId(null);
    setMessages([]);
    sessionLoadedRef.current = false; // Reset loading flags
    loadingSessionRef.current = false;
  }, []);

  // Memoized input handlers
  const handleInputChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (!loading) sendMessage(configValues.useStreaming);
      }
    },
    [loading, sendMessage, configValues.useStreaming]
  );

  const handleSendClick = useCallback(() => {
    if (!loading) sendMessage(configValues.useStreaming);
  }, [loading, sendMessage, configValues.useStreaming]);

  // Memoize messages to prevent unnecessary re-renders
  const memoizedMessages = useMemo(() => messages, [messages]);

  // Save session to localStorage when sessionId changes
  useEffect(() => {
    if (sessionId) {
      console.log("Saving session to localStorage:", sessionId);
      sessionManager.setSessionId(sessionId);
    }
  }, [sessionId]);

  // Load session from localStorage on component mount - StrictMode safe
  useEffect(() => {
    const storedSessionId = sessionManager.getCurrentSessionId();
    if (storedSessionId && !sessionLoadedRef.current) {
      console.log("Found stored session ID:", storedSessionId);
      setSessionId(storedSessionId);
      loadSessionMessages(storedSessionId);
    }
  }, [loadSessionMessages]);

  // Optimized scroll effect with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [messages.length, loading]);

  return {
    messages: memoizedMessages,
    input,
    loading,
    hasFirstChunk,
    messagesEndRef,
    messageKeys,
    configValues,
    sessionId,
    handleInputChange,
    handleKeyDown,
    handleSendClick,
    sendMessage,
    clearSession,
    loadSessionMessages,
  };
};
