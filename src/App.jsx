import { useState } from "react";
import ChatWindow from "./components/chat-window";
import ChatButton from "./components/chat-button";
import Typography from "@mui/material/Typography";

export default function App() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! 👋 How can I help you today?" },
  ]);

  return (
    <>
      {open && <ChatWindow onClose={() => setOpen(false)} messages={messages}
          setMessages={setMessages} />}
      <ChatButton onClick={() => setOpen(true)} />
    </>
  );
}
