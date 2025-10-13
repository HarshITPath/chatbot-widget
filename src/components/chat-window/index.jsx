import { memo, useState } from "react";
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
import QuickReplyButtons from "../quick-reply";
import logo from "../../assets/logo.png";
import userAvatar from "../../assets/user.png";

const ChatWindow = memo(function ChatWindow({
  onClose,
  messages: initialMessages,
  config,
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const {
    messages,
    input,
    loading,
    hasFirstChunk,
    messagesEndRef,
    messageKeys,
    configValues,
    sessionId,
    isInputDisabled,
    showQuickReplies,
    handleInputChange,
    handleKeyDown,
    handleSendClick,
    clearSession,
    handleQuickReply,
  } = useChatLogic(initialMessages, config, onClose);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Paper
      elevation={8}
      sx={{
        position: "fixed",
        ...(isFullscreen
          ? {
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100vw",
              height: "100vh",
              borderRadius: 0,
            }
          : {
              bottom: 20,
              right: 20,
              left: { xs: 10, sm: "auto" },
              width: configValues.windowSize.width,
              height: configValues.windowSize.height,
              borderRadius: configValues.borderRadius,
            }),
        display: "flex",
        flexDirection: "column",
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
              src={logo}
              alt="Bot Logo"
              sx={{
                bgcolor: "white",
                width: 32,
                height: 32,
              }}
            />
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
                    display: "block",
                  }}
                >
                  Session: {sessionId.split("_")[1]?.substring(0, 8)}...
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
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "View Fullscreen"}
              sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
            >
              {isFullscreen ? (
                <ICONS.FULLSCREEN_EXIT fontSize="small" />
              ) : (
                <ICONS.FULLSCREEN fontSize="small" />
              )}
            </IconButton>
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
          bgcolor: "#ffffff",
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
              botLogo={logo}
              userAvatar={configValues.userAvatar}
              userLogo={userAvatar}
              config={config}
            />
          ))}

          {/* Show quick reply buttons when showQuickReplies is true */}
          {showQuickReplies && (
            <QuickReplyButtons onQuickReply={handleQuickReply} />
          )}

          {/* Loading fallback UI */}
          {loading && !hasFirstChunk && (
            <LoadingIndicator botAvatar={configValues.botAvatar} botLogo={logo} />
          )}
        </Box>
        <div ref={messagesEndRef} />
      </Box>

      <Divider />

      {/* Input - conditionally hidden/disabled */}
      {!isInputDisabled ? (
        <Box
          sx={{
            p: 0.5,
            boxShadow: isFocused ? "0px -4px 12px rgba(0, 0, 0, 0.1)" : "none",
            transition: "box-shadow 0.3s ease",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "transparent",
              borderRadius: "28px",
              padding: "6px 8px 6px 16px",
            }}
          >
            {/* Text Input */}
            <TextareaAutosize
              minRows={1}
              maxRows={4}
              placeholder={configValues.placeholder}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                resize: "none",
                outline: "none",
                fontSize: "14px",
                fontFamily: configValues.fontFamily,
                padding: "8px 4px",
                lineHeight: "1.5",
              }}
            />

            {/* Send Button */}
            <IconButton
              onClick={handleSendClick}
              disabled={!input.trim() || loading}
              sx={{
                color: "primary.main",
                "&:hover": {
                  bgcolor: "transparent",
                },
                "&:disabled": {
                  color: "#9e9e9e",
                },
              }}
            >
              <ICONS.SEND fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            p: 2,
            bgcolor: "grey.100",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Thank you for your interest! Please send your resume to the email
            address provided.
          </Typography>
        </Box>
      )}
    </Paper>
  );
});

export default ChatWindow;