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
        pr: "36px",
        alignItems: "flex-end",
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
      {QUICK_REPLIES.map((reply, idx) => (
        <Button
          key={reply.id}
          variant="outlined"
          onClick={() => onQuickReply(reply)}
          sx={{
            position: 'relative',
            overflow: 'hidden',
            alignSelf: "flex-end",
            justifyContent: "flex-start",
            textAlign: "left",
            textTransform: "none",
            borderRadius: 2,
            p: 1,
            borderColor: "primary.main",
            color: "text.primary",
            bgcolor: "white",
            width: "fit-content",
            // Entrance animation (fade + slide up) with stagger per index
            animation: `fadeInUp 380ms cubic-bezier(0.2,0.8,0.2,1) ${idx * 70}ms both`,
            // Base transitions
            transition: "transform 200ms cubic-bezier(.2,.9,.3,1), box-shadow 200ms cubic-bezier(.2,.9,.3,1), border-color 180ms ease",

            // Sheen pseudo-element (via ::after) and base hidden state
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '-40%',
              left: '-60%',
              width: '40%',
              height: '180%',
              background: 'linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0) 100%)',
              transform: 'skewX(-20deg) translateX(-120%)',
              transition: 'transform 650ms cubic-bezier(.2,.9,.3,1), opacity 450ms ease',
              opacity: 0,
              zIndex: 0
            },

            // Child icon and label micro-animations
            '& .qr-icon': {
              transition: 'transform 220ms cubic-bezier(.2,.9,.3,1), opacity 160ms ease',
              transform: 'scale(1)'
            },
            '& .qr-label': {
              transition: 'color 220ms ease',
              color: 'inherit'
            },

            // Hover: lift, sheen sweep, icon pop, label color change and subtle border highlight
            '&:hover': {
              transform: 'translateY(-6px)',
              boxShadow: '0 14px 36px rgba(16,24,40,0.12)',
              borderColor: 'primary.dark',
              '&::after': {
                transform: 'skewX(-20deg) translateX(220%)',
                opacity: 1
              },
              '& .qr-icon': {
                transform: 'scale(1.08) rotate(-6deg)'
              },
              '& .qr-label': {
                color: 'primary.main'
              }
            },

            '&:active': {
              transform: 'translateY(0) scale(0.995)'
            },

            // Local keyframes injected via sx
            '@keyframes fadeInUp': {
              '0%': { opacity: 0, transform: 'translateY(10px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, position: 'relative', zIndex: 1 }}>
            <Typography className="qr-icon" sx={{ fontSize: "1.2rem", position: 'relative', zIndex: 1 }}>{reply.icon}</Typography>
            <Typography className="qr-label" variant="body2" sx={{ fontWeight: 500, position: 'relative', zIndex: 1 }}>
              {reply.label}
            </Typography>
          </Box>
        </Button>
      ))}
    </Box>
  );
});

export default QuickReplyButtons;
