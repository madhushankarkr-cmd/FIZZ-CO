"use client";

import React, { useEffect, useState, useRef } from "react";

interface Bubble {
  id: number;
  left: string;
  size: string;
  delay: string;
  duration: string;
}

interface BubbleEffectProps {
  count?: number;
  color?: string;
  opacity?: number;
}

export const BubbleEffect: React.FC<BubbleEffectProps> = ({
  count = 12,
  color = "rgba(255, 255, 255, 0.4)",
  opacity = 0.5,
}) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    // Generate initial bubbles
    const initialBubbles = Array.from({ length: count }).map(() => ({
      id: nextId.current++,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 12 + 6}px`,
      delay: `${Math.random() * 4}s`,
      duration: `${Math.random() * 3 + 3}s`,
    }));
    setBubbles(initialBubbles);

    // Keep adding new bubbles as old ones finish
    const interval = setInterval(() => {
      setBubbles((prev) => {
        // Remove one random bubble and add a new one to keep the animation running smoothly
        const filtered = prev.slice(1);
        return [
          ...filtered,
          {
            id: nextId.current++,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 12 + 6}px`,
            delay: "0s",
            duration: `${Math.random() * 3 + 3}s`,
          },
        ];
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {bubbles.map((bubble) => (
        <span
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            left: bubble.left,
            width: bubble.size,
            height: bubble.size,
            backgroundColor: color,
            opacity: opacity,
            bottom: "-20px",
            animation: `fizzUp ${bubble.duration} linear ${bubble.delay} infinite`,
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes fizzUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-200px) scale(0.6);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// Hook for triggering quick-burst bubbles on click/hover
export const useBubbleBurst = () => {
  const triggerBurst = (e: React.MouseEvent<HTMLElement>, bubbleColor = "var(--primary-container)") => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    
    for (let i = 0; i < 8; i++) {
      const bubble = document.createElement("div");
      bubble.className = "fizz-bubble";
      bubble.style.backgroundColor = bubbleColor;
      
      const size = Math.random() * 8 + 4;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      
      // Calculate position relative to document body to prevent overflow/clipping issues
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      bubble.style.left = `${rect.left + window.scrollX + x}px`;
      bubble.style.top = `${rect.top + window.scrollY + y}px`;
      
      document.body.appendChild(bubble);
      
      // Animate and remove
      const animation = bubble.animate([
        { transform: "translateY(0) scale(1)", opacity: 0.7 },
        { transform: `translateY(-${80 + Math.random() * 50}px) scale(1.6)`, opacity: 0 }
      ], {
        duration: 1000 + Math.random() * 500,
        easing: "ease-out"
      });
      
      animation.onfinish = () => bubble.remove();
    }
  };

  return triggerBurst;
};
