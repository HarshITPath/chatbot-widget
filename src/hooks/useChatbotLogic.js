import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useStreamingOptimization, useMessageOptimization } from "./useOptimizedChat";

export const useChatLogic = (initialMessages, config) => {
  const [messages, setMessages] = useState(initialMessages || []);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasFirstChunk, setHasFirstChunk] = useState(false);
  const messagesEndRef = useRef(null);

  // Use optimization hooks
  const { addToStream, flushStream, resetStream } = useStreamingOptimization();
  const { messageKeys } = useMessageOptimization(messages);

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

  // Optimized sendMessage with reduced state updates during streaming
  const sendMessage = useCallback(async () => {
    if (!input.trim() || loading) return;

    const userMessage = { sender: "user", text: input };
    const question = input;

    // Clear input immediately for better UX
    setInput("");

    // Add user message
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);
    setHasFirstChunk(false);
    resetStream();

    try {
      const res = await fetch(`${configValues.apiUrl}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, useStreaming: true }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let botMessageAdded = false;

      // Optimized update function using streaming hook
      const updateBotMessage = (text) => {
        setMessages((prev) => {
          const updated = [...prev];
          const lastIndex = updated.length - 1;
          if (updated[lastIndex]?.sender === "bot") {
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

            if (json.chunk) {
              // First chunk - add bot message placeholder
              if (!botMessageAdded) {
                setMessages((prev) => [...prev, { sender: "bot", text: "" }]);
                botMessageAdded = true;
                setHasFirstChunk(true);
              }

              // Use optimized streaming with batching
              addToStream(json.chunk, updateBotMessage, {
                batchSize: 5,
                updateInterval: 30,
              });
            }
          } catch (e) {
            console.error("Failed to parse chunk:", line, e);
          }
        }
      }

      // Final flush to ensure all content is displayed
      flushStream(updateBotMessage);
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
  }, [input, loading, configValues.apiUrl, setMessages]);

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
    handleInputChange,
    handleKeyDown,
    handleSendClick,
    sendMessage
  };
};