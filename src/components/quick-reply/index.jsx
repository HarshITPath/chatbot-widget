import { memo } from "react";
import { Box, Button, Typography } from "@mui/material";
import { QUICK_REPLIES } from "../../utils/constant";

const QuickReplyButtons = memo(function QuickReplyButtons({ onQuickReply }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        p: 2,
        pl:"36px",
        bgcolor: "#ffffff ",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          color: "text.secondary",
          mb: 0.5,
          textAlign: "center",
        }}
      >
        Quick Replies:
      </Typography>
      {QUICK_REPLIES.map((reply) => (
        <Button
          key={reply.id}
          variant="outlined"
          onClick={() => onQuickReply(reply)}
          sx={{
            justifyContent: "flex-start",
            textAlign: "left",
            textTransform: "none",
            borderRadius: 2,
            p: 1,
            borderColor: "primary.main",
            color: "text.primary",
            bgcolor: "white",
            width:"fit-content"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontSize: "1.2rem" }}>{reply.icon}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {reply.label}
            </Typography>
          </Box>
        </Button>
      ))}
    </Box>
  );
});

export default QuickReplyButtons;
