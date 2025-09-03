import { memo } from "react";
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
import { ICONS } from "../../assets/icons";
import { useChatLogic } from "../../hooks/useChatbotLogic";
import MessageItem from "./chatbot-messages";
import LoadingIndicator from "./chatbot-loading";

const ChatWindow = memo(function ChatWindow({
  onClose,
  messages: initialMessages,
  config,
}) {
  const {
    messages,
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
    clearSession,
  } = useChatLogic(initialMessages, config, onClose);

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
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minHeight: { xs: 48, sm: 56 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                width: 32,
                height: 32,
                fontSize: "1.2rem",
              }}
            >
              {configValues.botAvatar}
            </Avatar>
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, lineHeight: 1.2 }}
              >
                {configValues.botName}
              </Typography>
              {sessionId && (
                <Typography
                  variant="caption"
                  sx={{ 
                    opacity: 0.8, 
                    fontSize: "0.75rem",
                    display: "block"
                  }}
                >
                  Session: {sessionId.split('_')[1]?.substring(0, 8)}...
                </Typography>
              )}
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {sessionId && (
              <IconButton
                size="small"
                color="inherit"
                onClick={clearSession}
                title="Clear Session"
                sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
              >
                <ICONS.REFRESH fontSize="small" />
              </IconButton>
            )}
            <IconButton
              size="small"
              color="inherit"
              onClick={onClose}
              sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
            >
              <ICONS.CLOSE fontSize="small" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          bgcolor: "#E5E4E2",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "10px",
          },
        }}
      >
        <Box sx={{ p: { xs: 1, sm: 2 } }}>
          {messages?.map((msg, i) => (
            <MessageItem
              key={messageKeys[i] || `${msg.sender}-${i}`}
              msg={msg}
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
      <Box
        sx={{
          display: "flex",
          p: 2,
          alignItems: "flex-end",
          gap: 1.5,
        }}
      >
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