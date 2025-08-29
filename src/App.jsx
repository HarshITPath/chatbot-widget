import { useState } from "react";
import ChatWindow from "./components/chat-window";
import ChatButton from "./components/chat-button";

export default function App({ config }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: config?.greeting || "Hi! 👋 How can I help you today?" },
  ]);

  return (
    <>
      {open && (
        <ChatWindow 
          onClose={() => setOpen(false)} 
          messages={messages}
          setMessages={setMessages}
          config={config}
        />
      )}
      <ChatButton 
        onClick={() => setOpen(true)} 
        config={config}
      />
    </>
  );
}
