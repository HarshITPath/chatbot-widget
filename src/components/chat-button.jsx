import { Fab, Tooltip, Zoom } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

export default function ChatButton({ onClick }) {
  return (
    <Tooltip title="Chat with us" placement="left" arrow TransitionComponent={Zoom}>
      <Fab
        color="primary"
        aria-label="chat"
        onClick={onClick}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 64,
          height: 64,
          boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
          "&:hover": {
            boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
          },
        }}
      >
        <ChatIcon fontSize="medium" />
      </Fab>
    </Tooltip>
  );
}
