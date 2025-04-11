import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";


export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! Ask me anything about Karteek." }
  ]);

  const bottomRef = useRef(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]); 

  const handleSend = (userInput) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userInput },
      { role: "bot", text: "This is a dummy response until the backend exists........................................................" }
    ]);
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, index) => (
          <MessageBubble key={index} role={msg.role} text={msg.text} />
        ))}
        <div ref={bottomRef} />
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
}
