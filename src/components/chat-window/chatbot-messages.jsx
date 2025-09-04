import { Avatar, Box, Typography } from "@mui/material";
import { memo } from "react";
import { AIResponseRenderer } from "../ai-response-renderer";

const MessageItem = memo(({ msg, botAvatar, userAvatar, config }) => {
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
        <Avatar
          sx={{
            width: 28,
            height: 28,
            bgcolor: "primary.main",
            fontSize: "0.8rem",
            mt: 0.5,
          }}
        >
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
          <AIResponseRenderer message={msg.text} config={config} />
        ) : (
          <Typography
            variant="subtitle1"
            sx={{ lineHeight: 1.4, whiteSpace: "pre-wrap" }}
          >
            {msg.text}
          </Typography>
        )}
      </Box>
      {msg.sender === "user" && (
        <Avatar
          sx={{
            width: 28,
            height: 28,
            bgcolor: "secondary.main",
            fontSize: "0.8rem",
            mt: 0.5,
          }}
        >
          {userAvatar}
        </Avatar>
      )}
    </Box>
  );
});

export default MessageItem;
