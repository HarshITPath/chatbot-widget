import { Fab, Tooltip, Zoom } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

export default function ChatButton({ onClick, config }) {
  const buttonSize = config?.buttonSize || 64;
  const position = config?.position || 'bottom-right';
  
  // Calculate position styles based on config
  const getPositionStyles = () => {
    switch (position) {
      case 'bottom-left':
        return { bottom: 24, left: 24 };
      case 'top-right':
        return { top: 24, right: 24 };
      case 'top-left':
        return { top: 24, left: 24 };
      case 'bottom-right':
      default:
        return { bottom: 24, right: 24 };
    }
  };

  return (
    <Tooltip title="Chat with us" placement="left" arrow TransitionComponent={Zoom}>
      <Fab
        color="primary"
        aria-label="chat"
        onClick={onClick}
        sx={{
          position: "fixed",
          ...getPositionStyles(),
          width: buttonSize,
          height: buttonSize,
          boxShadow: config?.shadow || "0 6px 12px rgba(0,0,0,0.2)",
          "&:hover": {
            boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
            transform: "scale(1.05)",
          },
          transition: "all 0.3s ease",
        }}
      >
        <ChatIcon fontSize="medium" />
      </Fab>
    </Tooltip>
  );
}
