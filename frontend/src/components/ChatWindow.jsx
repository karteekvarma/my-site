import { useState } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! Ask me anything about Karteek. Sometimes I might Hallucinate too!!" }
  ]);

  const handleSend = async (userInput) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userInput },
    ]);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.response },
      ]);
    } catch (error) {
      console.error("🛑 Backend error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Oops, backend failed to respond" },
      ]);
    }
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, index) => (
          <MessageBubble key={index} role={msg.role} text={msg.text} />
        ))}
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
}
