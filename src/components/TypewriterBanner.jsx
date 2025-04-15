import React, { useEffect, useRef } from "react";

export default function TypewriterBanner() {
  const typewriterRef = useRef(null);

  useEffect(() => {
    const phrases = [
      "🕰️ This website may look like it time-traveled from the 1980s, but don’t be fooled — it’s evolving, and so are my skills!",
      "🤖 But hey, at least the chatbot is from the future.💬 It probably knows your favorite color. Or your IP address. Who knows.",
      "🛸 Might seem like a portfolio from the past! But my skills are from 2025, and the chatbot?🧠 That thing is from 2087.",
      "⚙️ This site may not win any design awards (yet), but it’s a work in progress — like me. Try Kar_Per, the other me!"
    ];

    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;
    let timeoutId;

    function type() {
      const fullText = phrases[currentPhrase];
      const visibleText = fullText.substring(0, currentChar);

      if (typewriterRef.current) {
        typewriterRef.current.textContent = visibleText;
      }

      if (!isDeleting && currentChar < fullText.length) {
        // Continue typing
        currentChar++;
        timeoutId = setTimeout(type, 50);
      } else if (isDeleting && currentChar > 0) {
        // Continue deleting
        currentChar--;
        timeoutId = setTimeout(type, 30);
      } else {
        // Switch between typing and deleting once a phrase is fully displayed or removed
        isDeleting = !isDeleting;
        if (!isDeleting) {
          currentPhrase = (currentPhrase + 1) % phrases.length;
        }
        timeoutId = setTimeout(type, isDeleting ? 1000 : 1500);
      }
    }

    type();

    // Cleanup function: clear any pending timeouts when the component unmounts.
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="typewriter-container">
      <span className="typewriter-text" ref={typewriterRef}></span>
    </div>
  );
}
