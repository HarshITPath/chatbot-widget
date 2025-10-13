import { Avatar, Box, Typography } from "@mui/material";
import { memo } from "react";
import { AIResponseRenderer } from "../ai-response";
import { USER_TYPE } from "../../utils/constant";

const MessageItem = memo(({ msg, botAvatar, botLogo, userLogo, userAvatar, config }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: msg.sender === USER_TYPE.USER ? "flex-end" : "flex-start",
        mb: 1.5,
        alignItems: "flex-start",
        gap: 1,
      }}
    >
      {msg.sender === USER_TYPE.BOT && (
        <Avatar
          src={botLogo}
          alt="Bot Logo"
          sx={{
            width: 28,
            height: 28,
            bgcolor: "white",
            mt: 0.5,
          }}
        />
      )}
      <Box
        sx={{
          maxWidth: "75%",
          px: 2,
          py: 1.2,
          borderRadius: 1.5,
          bgcolor: msg.sender === USER_TYPE.USER ? "primary.main" : "background.paper",
          color: msg.sender === USER_TYPE.USER ? "white" : "text.primary",
          border: msg.sender === USER_TYPE.BOT ? "1px solid" : "none",
          borderColor: msg.sender === USER_TYPE.BOT ? "grey.200" : "transparent",
          boxShadow: msg.sender === USER_TYPE.USER 
            ? "0 2px 8px rgba(26, 59, 104, 0.2)" 
            : "0 2px 8px rgba(0, 0, 0, 0.1)",
          wordWrap: 'break-word',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          overflow: 'hidden',
        }}
      >
        {msg.sender === USER_TYPE.BOT ? (
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
      {msg.sender === USER_TYPE.USER && (
        <Avatar
        src={userLogo}
          sx={{
            width: 28,
            height: 28,
            bgcolor: "white",
            mt: 0.5,
          }}
        />
      )}
    </Box>
  );
});

export default MessageItem;
