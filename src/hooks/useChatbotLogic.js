import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useStreamingOptimization, useMessageOptimization } from "./useOptimizedChat";
import { chatAPI } from "../api/client";
import sessionManager from "../utils/helper/sessionManager";

export const useChatLogic = (initialMessages, config) => {
  const [messages, setMessages] = useState(initialMessages || []);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasFirstChunk, setHasFirstChunk] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  // Use optimization hooks
  const { addToStream, flushStream, resetStream } = useStreamingOptimization();
  const { messageKeys } = useMessageOptimization(messages);

  // Load session from localStorage on component mount
  useEffect(() => {
    const storedSessionId = sessionManager.getCurrentSessionId();
    if (storedSessionId) {
      setSessionId(storedSessionId);
      // Load conversation history for existing session
      loadSessionMessages(storedSessionId);
    }
  }, []);

  // Save session to localStorage when sessionId changes
  useEffect(() => {
    if (sessionId) {
      sessionManager.setSessionId(sessionId);
    }
  }, [sessionId]);

  // Load messages from session
  const loadSessionMessages = async (sessionId) => {
    try {
      const data = await chatAPI.getSessionMessages(sessionId);
      if (data.messages && Array.isArray(data.messages)) {
        // Transform API messages to match our message format
        const transformedMessages = data.messages.map(msg => ({
          sender: msg.role === 'user' ? 'user' : 'bot',
          text: msg.content,
          timestamp: msg.timestamp,
          messageIndex: msg.messageIndex
        }));
        setMessages(transformedMessages);
        
        // Save session info to history
        sessionManager.saveSessionToHistory(sessionId, {
          messageCount: data.count || transformedMessages.length,
          lastMessage: transformedMessages[transformedMessages.length - 1]?.text || '',
          historyType: data.historyType || 'comprehensive'
        });
      }
    } catch (error) {
      console.error('Failed to load session messages:', error);
      // If session is invalid, clear it
      if (error.message.includes('404') || error.message.includes('not found')) {
        clearSession();
      }
    }
  };

  // Memoize configuration values to prevent recalculation
  const configValues = useMemo(
    () => ({
      apiUrl: config?.apiUrl || "http://192.168.0.39:3000/api",
      botName: config?.botName || "IT Path Assistant",
      botAvatar: config?.botAvatar || "🤖",
      userAvatar: config?.userAvatar || "👤",
      placeholder: config?.placeholder || "Type your message...",
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

  // Optimized sendMessage with session management
  const sendMessage = useCallback(async () => {
    if (!input.trim() || loading) return;

    const userMessage = { sender: "user", text: input };
    const messageText = input;

    // Clear input immediately for better UX
    setInput("");

    // Add user message
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);
    setHasFirstChunk(false);
    resetStream();

    try {
      // Use the chatAPI with automatic session handling
      const data = await chatAPI.sendMessage(messageText, sessionId);

      // Set session ID if this was the first message
      if (!sessionId && data.sessionId) {
        setSessionId(data.sessionId);
      }

      // Add bot response to messages
      if (data.response) {
        const botMessage = {
          sender: "bot",
          text: data.response,
          sessionId: data.sessionId,
          messageCount: data.messageCount,
          timestamp: new Date().toISOString(),
          tokenUsage: data.tokenUsage, // Include token usage info
          cacheHit: data.cacheHit // Include cache hit info
        };

        setMessages((prev) => [...prev, botMessage]);

        // Update session history
        if (data.sessionId) {
          sessionManager.saveSessionToHistory(data.sessionId, {
            messageCount: data.messageCount,
            lastMessage: data.response,
            lastTimestamp: botMessage.timestamp,
            tokenUsage: data.tokenUsage
          });
        }
      }

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Something went wrong. Please try again." },
      ]);
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
      resetStream();
    }
  }, [input, loading, sessionId, resetStream]);

  // Function to clear session and start fresh
  const clearSession = useCallback(() => {
    sessionManager.clearSession();
    setSessionId(null);
    setMessages([]);
  }, []);

  // Optimized scroll effect with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [messages.length, loading]);

  // Memoized input handlers
  const handleInputChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (!loading) sendMessage();
      }
    },
    [loading, sendMessage]
  );

  const handleSendClick = useCallback(() => {
    if (!loading) sendMessage();
  }, [loading, sendMessage]);

  // Memoize messages to prevent unnecessary re-renders
  const memoizedMessages = useMemo(() => messages, [messages]);

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
    loadSessionMessages
  };
};