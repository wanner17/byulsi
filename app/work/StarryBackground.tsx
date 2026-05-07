"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function StarryBackground() {
  const [stars] = useState<Star[]>(() =>
    typeof window === "undefined"
      ? []
      : Array.from({ length: 70 }).map((_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 3,
        }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
          transition={{ duration: star.duration, repeat: Infinity, ease: "easeInOut", delay: star.delay }}
        />
      ))}
    </div>
  );
}