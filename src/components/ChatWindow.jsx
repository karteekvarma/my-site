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

  const handleSend = async (userInput) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userInput },
      //{ role: "bot", text: "This is a dummy response until the backend exists" }
    ]);

    try {
      const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userInput }),
      });
    
      const data = await res.json();
      const botResponse = data.response;
    
      // Add bot's response to chat
      setMessages((prev) => [...prev, { role: "bot", text: botResponse }]);
    } catch (error) {
      console.error("Backend error:", error);
      setMessages((prev) => [
      ...prev,
      { role: "bot", text: "Oops, backend failed to respond" },
      ]);
    }

//###########################################################################

//######## Just a simple endpoint to test the server and your skills#########

//###########################################################################

    // try {
    //   const res = await fetch(`http://localhost:8000/mimic?message=${encodeURIComponent(userInput)}`, {
    //     method: "GET",
    //   });

    //   const data = await res.json();
    //   const botResponse = data.response;

    //   setMessages((prev) => [...prev, { role: "bot", text: botResponse }]);
      
    // } catch (error) {
    //   console.error("Backend error:", error);
    //   setMessages((prev) => [
    //     ...prev,
    //     { role: "bot", text: "Oops, backend failed to respond for get" },
    //   ]);
    // }

  //  ###########################################################################
  //  ###########################################################################
  //  ###########################################################################

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
