import { useState, useRef, useEffect, useMemo  } from "react";
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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ICONS } from "../assets/icons";
import { BASE_URL } from "../utils/constant";

// Enhanced component to render different types of bot responses with improved spacing
const BotMessage = ({ message }) => {
  return (
    <Box
      sx={{ "& > *:first-of-type": { mt: 0 }, "& > *:last-child": { mb: 0 } }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <Typography
              variant="body2"
              sx={{
                m: 0,
                mb: 1,
                lineHeight: 1.5,
                fontSize: "0.875rem",
                whiteSpace: "pre-wrap",
                "&:last-child": { mb: 0 },
              }}
            >
              {children}
            </Typography>
          ),
          h1: ({ children }) => (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                m: 0,
                mb: 1.5,
                mt: 1.5,
                lineHeight: 1.3,
                fontSize: "1.1rem",
                color: "primary.main",
                "&:first-of-type": { mt: 0 },
              }}
            >
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 650,
                m: 0,
                mb: 1,
                mt: 1.5,
                lineHeight: 1.3,
                fontSize: "1rem",
                color: "primary.dark",
                "&:first-of-type": { mt: 0 },
              }}
            >
              {children}
            </Typography>
          ),
          h3: ({ children }) => (
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                m: 0,
                mb: 0.8,
                mt: 1,
                lineHeight: 1.3,
                fontSize: "0.95rem",
                "&:first-of-type": { mt: 0 },
              }}
            >
              {children}
            </Typography>
          ),
          ul: ({ children }) => (
            <Box
              component="ul"
              sx={{
                pl: 2.5,
                m: 0,
                mb: 1,
                mt: 0.5,
                lineHeight: 1.4,
                "& li": { mb: 0.4, pl: 0.5 },
                "& li::marker": { color: "primary.main" },
              }}
            >
              {children}
            </Box>
          ),
          ol: ({ children }) => (
            <Box
              component="ol"
              sx={{
                pl: 2.5,
                m: 0,
                mb: 1,
                mt: 0.5,
                lineHeight: 1.4,
                "& li": { mb: 0.4, pl: 0.5 },
                "& li::marker": { color: "primary.main", fontWeight: 600 },
              }}
            >
              {children}
            </Box>
          ),
          li: ({ children }) => (
            <Typography
              component="li"
              variant="body2"
              sx={{ fontSize: "0.875rem", lineHeight: 1.4, color: "text.primary" }}
            >
              {children}
            </Typography>
          ),
          a: ({ href, children }) => (
            <Box
              component="a"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "primary.main",
                textDecoration: "none",
                fontSize: "inherit",
                fontWeight: 500,
                borderBottom: "1px solid transparent",
                transition: "all 0.2s ease",
                "&:hover": { borderBottomColor: "primary.main", color: "primary.dark" },
              }}
            >
              {children}
            </Box>
          ),
          blockquote: ({ children }) => (
            <Box
              component="blockquote"
              sx={{
                borderLeft: "4px solid",
                borderColor: "primary.light",
                bgcolor: "grey.50",
                pl: 2,
                py: 1,
                my: 1.5,
                mx: 0,
                fontStyle: "italic",
                "& p": { m: 0 },
              }}
            >
              {children}
            </Box>
          ),
          code: ({ inline, children }) =>
            inline ? (
              <Box
                component="code"
                sx={{
                  bgcolor: "grey.100",
                  color: "error.dark",
                  px: 0.6,
                  py: 0.2,
                  borderRadius: 1,
                  fontSize: "0.85rem",
                  fontFamily: '"Fira Code", "Consolas", monospace',
                  border: "1px solid",
                  borderColor: "grey.300",
                }}
              >
                {children}
              </Box>
            ) : (
              <Box
                component="pre"
                sx={{
                  bgcolor: "grey.900",
                  color: "grey.100",
                  p: 2,
                  borderRadius: 2,
                  fontSize: "0.8rem",
                  overflowX: "auto",
                  m: 0,
                  my: 1.5,
                  fontFamily: '"Fira Code", "Consolas", monospace',
                  border: "1px solid",
                  borderColor: "grey.700",
                  "& code": { bgcolor: "transparent", p: 0, fontSize: "inherit", fontFamily: "inherit" },
                }}
              >
                <code>{children}</code>
              </Box>
            ),
          table: ({ children }) => (
            <Box sx={{ overflowX: "auto", my: 1.5 }}>
              <Box
                component="table"
                sx={{
                  width: "100%",
                  borderCollapse: "collapse",
                  border: "1px solid",
                  borderColor: "grey.300",
                  fontSize: "0.85rem",
                }}
              >
                {children}
              </Box>
            </Box>
          ),
          thead: ({ children }) => (
            <Box
              component="thead"
              sx={{
                bgcolor: "grey.100",
                "& th": {
                  border: "1px solid",
                  borderColor: "grey.300",
                  p: 1,
                  fontWeight: 600,
                  textAlign: "left",
                },
              }}
            >
              {children}
            </Box>
          ),
          tbody: ({ children }) => (
            <Box
              component="tbody"
              sx={{
                "& td": { border: "1px solid", borderColor: "grey.300", p: 1 },
                "& tr:nth-of-type(even)": { bgcolor: "grey.50" },
              }}
            >
              {children}
            </Box>
          ),
          hr: () => <Divider sx={{ my: 2, borderColor: "grey.400" }} />,
        }}
      >
        {message}
      </ReactMarkdown>
    </Box>
  );
};

export default function ChatWindow({ onClose, messages, setMessages }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasFirstChunk, setHasFirstChunk] = useState(false); // track first chunk
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const question = input;
    setInput("");
    setLoading(true);
    setHasFirstChunk(false);

    try {
      const res = await fetch(`${BASE_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, useStreaming: true }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let botMessageAdded = false;

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
              // First chunk arrived
              if (!botMessageAdded) {
                setMessages((prev) => [...prev, { sender: "bot", text: "" }]);
                botMessageAdded = true;
                setHasFirstChunk(true);
              }

              // Append chunk
                for (const char of json.chunk) {
                    await new Promise((resolve) => setTimeout(resolve, 0));
                  setMessages((prev) => {
                    const updated = [...prev];
                    const lastIndex = updated.length - 1;
                    if (updated[lastIndex]?.sender === "bot") {
                      updated[lastIndex] = {
                        ...updated[lastIndex],
                        text: updated[lastIndex].text + char,
                      };
                    }
                    return updated;
                  });
                }
            }
          } catch (e) {
            console.error("Failed to parse chunk:", line, e);
          }
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
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <Paper
      elevation={8}
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        left: { xs: 10, sm: "auto" },
        width: {
          xs: "calc(100vw - 16px)",
          sm: "min(90vw, 540px)",
          md: "min(50vw, 650px)",
          lg: "min(45vw, 720px)",
          xl: "min(40vw, 800px)",
        },
        height: {
          xs: "calc(100vh - 32px)",
          sm: "min(90vh, 720px)",
          md: "min(85vh, 750px)",
          lg: "min(80vh, 800px)",
          xl: "min(75vh, 850px)",
        },
        display: "flex",
        flexDirection: "column",
        borderRadius: { xs: 2, sm: 3 },
        overflow: "hidden",
        zIndex: 1300,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
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
              🤖
            </Avatar>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
              IT Path Assistant
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
          {messages.map((msg, i) => (
            <Box
              key={i}
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
                  🤖
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
                  <BotMessage message={msg.text} />
                ) : (
                  <Typography variant="body2" sx={{ lineHeight: 1.4, whiteSpace: "pre-wrap" }}>
                    {msg.text}
                  </Typography>
                )}
              </Box>
              {msg.sender === "user" && (
                <Avatar sx={{ width: 28, height: 28, bgcolor: "secondary.main", fontSize: "0.8rem", mt: 0.5 }}>
                  👤
                </Avatar>
              )}
            </Box>
          ))}

          {/* Loading fallback UI */}
          {loading && !hasFirstChunk && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1, mb: 2 }}>
              <Avatar sx={{ width: 28, height: 28, bgcolor: "primary.main", fontSize: "0.8rem" }}>🤖</Avatar>
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
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (!loading) sendMessage();
            }
          }}
          style={{
            flex: 1,
            borderRadius: "20px",
            padding: "12px 16px",
            border: "2px solid #e0e0e0",
            resize: "none",
            outline: "none",
            fontSize: "14px",
          }}
        />
        <IconButton
          onClick={sendMessage}
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
}
