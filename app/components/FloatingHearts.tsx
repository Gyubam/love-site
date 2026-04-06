"use client";

import { useEffect, useState } from "react";

interface Heart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

const heartEmojis = ["\u2665", "\u2661", "\u{1F495}", "\u{1F496}", "\u{1F497}"];

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const createHeart = () => {
      const heart: Heart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        size: 0.8 + Math.random() * 1.2,
        duration: 6 + Math.random() * 8,
        delay: 0,
        emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      };
      setHearts((prev) => [...prev.slice(-15), heart]);
    };

    const interval = setInterval(createHeart, 2000);
    // Create a few initial hearts
    for (let i = 0; i < 5; i++) {
      setTimeout(createHeart, i * 400);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-particle"
          style={{
            left: `${heart.left}%`,
            bottom: "-20px",
            fontSize: `${heart.size}rem`,
            animationDuration: `${heart.duration}s`,
            opacity: 0.6,
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </>
  );
}
