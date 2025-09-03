import { useState, useRef, useEffect, useCallback, useMemo, memo } from "react";
import {
  Box,
  Paper,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  Avatar,
  TextareaAutosize,
} from "@mui/material";
import { ICONS } from "../assets/icons";
import { AIResponseRenderer } from "./ai-response-renderer";
import { useStreamingOptimization, useMessageOptimization } from "../hooks/useOptimizedChat";

// Memoized bot message component to prevent unnecessary re-renders
const BotMessage = memo(({ message, config }) => {
  return (
    <Box
      sx={{ "& > *:first-of-type": { mt: 0 }, "& > *:last-child": { mb: 0 } }}
    >
      <AIResponseRenderer message={message} config={config} />
    </Box>
  );
});

// Memoized individual message component
const MessageItem = memo(({ msg, index, botAvatar, userAvatar, config }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
        mb: 1.5,
        alignItems: "flex-start",
        gap: 1,
      }}
    >
      {msg.sender === "bot" && (
        <Avatar sx={{ width: 28, height: 28, bgcolor: "primary.main", fontSize: "0.8rem", mt: 0.5 }}>
          {botAvatar}
        </Avatar>
      )}
      <Box
        sx={{
          maxWidth: "75%",
          px: 2,
          py: 1.2,
          borderRadius: 1.5,
          bgcolor: msg.sender === "user" ? "primary.main" : "background.paper",
          color: msg.sender === "user" ? "white" : "text.primary",
          border: msg.sender === "bot" ? "1px solid" : "none",
          borderColor: msg.sender === "bot" ? "grey.200" : "transparent",
        }}
      >
        {msg.sender === "bot" ? (
          <BotMessage message={msg.text} config={config} />
        ) : (
          <Typography variant="body2" sx={{ lineHeight: 1.4, whiteSpace: "pre-wrap" }}>
            {msg.text}
          </Typography>
        )}
      </Box>
      {msg.sender === "user" && (
        <Avatar sx={{ width: 28, height: 28, bgcolor: "secondary.main", fontSize: "0.8rem", mt: 0.5 }}>
          {userAvatar}
        </Avatar>
      )}
    </Box>
  );
});

// Memoized loading indicator
const LoadingIndicator = memo(({ botAvatar }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1, mb: 2 }}>
    <Avatar sx={{ width: 28, height: 28, bgcolor: "primary.main", fontSize: "0.8rem" }}>
      {botAvatar}
    </Avatar>
    <Box
      sx={{
        bgcolor: "background.paper",
        px: 2,
        py: 1.5,
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.85rem" }}>
        AI is thinking
      </Typography>
      <Box sx={{ display: "flex", gap: 0.5 }}>
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              bgcolor: "primary.main",
              animation: `bounce 1.4s ease-in-out ${i * 0.2}s infinite`,
              "@keyframes bounce": {
                "0%, 80%, 100%": { transform: "scale(0.8)", opacity: 0.5 },
                "40%": { transform: "scale(1)", opacity: 1 },
              },
            }}
          />
        ))}
      </Box>
    </Box>
  </Box>
));

const ChatWindow = memo(function ChatWindow({ onClose, messages, setMessages, config }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasFirstChunk, setHasFirstChunk] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Use optimization hooks
  const { addToStream, flushStream, resetStream } = useStreamingOptimization();
  const { messageKeys } = useMessageOptimization(messages);

  // Memoize configuration values to prevent recalculation
  const configValues = useMemo(() => ({
    apiUrl: config?.apiUrl || "http://192.168.0.39:3000/api",
    botName: config?.botName || "IT Path Assistant",
    botAvatar: config?.botAvatar || "🤖",
    userAvatar: config?.userAvatar || "👤",
    placeholder: config?.placeholder || "Type your message...",
    windowSize: config?.windowSize || {
      width: { xs: 'calc(100vw - 16px)', sm: 'min(90vw, 540px)', md: 'min(50vw, 650px)' },
      height: { xs: 'calc(100vh - 32px)', sm: 'min(90vh, 720px)', md: 'min(85vh, 750px)' }
    },
    borderRadius: config?.borderRadius || 3,
    shadow: config?.shadow || "0 8px 32px rgba(0,0,0,0.12)",
    zIndex: config?.zIndex || 1300,
    fontFamily: config?.fontFamily || '"Roboto", "Helvetica", "Arial", sans-serif'
  }), [config]);

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
                updateInterval: 30
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

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!loading) sendMessage();
    }
  }, [loading, sendMessage]);

  const handleSendClick = useCallback(() => {
    if (!loading) sendMessage();
  }, [loading, sendMessage]);

  // Memoize messages to prevent unnecessary re-renders
  const memoizedMessages = useMemo(() => messages, [messages]);

  return (
    <Paper
      elevation={8}
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        left: { xs: 10, sm: "auto" },
        width: configValues.windowSize.width,
        height: configValues.windowSize.height,
        display: "flex",
        flexDirection: "column",
        borderRadius: configValues.borderRadius,
        overflow: "hidden",
        zIndex: configValues.zIndex,
        boxShadow: configValues.shadow,
        border: "1px solid",
        borderColor: "grey.200",
      }}
    >
      {/* Header */}
      <AppBar position="static" color="primary">
        <Toolbar
          variant="dense"
          sx={{ display: "flex", justifyContent: "space-between", minHeight: { xs: 48, sm: 56 } }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 32, height: 32, fontSize: "1.2rem" }}>
              {configValues.botAvatar}
            </Avatar>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
              {configValues.botName}
            </Typography>
          </Box>
          <IconButton
            size="small"
            color="inherit"
            onClick={onClose}
            sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
          >
            <ICONS.CLOSE fontSize="small" />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          bgcolor: "#E5E4E2",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": { background: "#d0d0d0", borderRadius: "10px" },
        }}
      >
        <Box sx={{ p: { xs: 1, sm: 2 } }}>
          {memoizedMessages.map((msg, i) => (
            <MessageItem
              key={messageKeys[i] || `${msg.sender}-${i}`}
              msg={msg}
              index={i}
              botAvatar={configValues.botAvatar}
              userAvatar={configValues.userAvatar}
              config={config}
            />
          ))}

          {/* Loading fallback UI */}
          {loading && !hasFirstChunk && (
            <LoadingIndicator botAvatar={configValues.botAvatar} />
          )}
        </Box>
        <div ref={messagesEndRef} />
      </Box>

      <Divider />

      {/* Input */}
      <Box sx={{ display: "flex", p: 2, alignItems: "flex-end", gap: 1.5, bgcolor: "background.paper" }}>
        <TextareaAutosize
          minRows={1}
          maxRows={4}
          placeholder={configValues.placeholder}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            borderRadius: "20px",
            padding: "12px 16px",
            border: "2px solid #e0e0e0",
            resize: "none",
            outline: "none",
            fontSize: "14px",
            fontFamily: configValues.fontFamily,
          }}
        />
        <IconButton
          onClick={handleSendClick}
          disabled={!input.trim() || loading}
          sx={{
            bgcolor: "primary.main",
            color: "white",
            width: 44,
            height: 44,
            "&:hover": { bgcolor: "primary.dark", transform: "scale(1.05)" },
            "&:disabled": { bgcolor: "grey.300", color: "grey.500" },
          }}
        >
          <ICONS.SEND fontSize="small" />
        </IconButton>
      </Box>
    </Paper>
  );
});

export default ChatWindow;
