"use client";

import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <>
      {/* Golden Blur */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute -left-32 -top-32 h-[520px] w-[520px] rounded-full bg-yellow-300/20 blur-[140px]"
      />

      {/* Silver Blur */}
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute -right-44 bottom-0 h-[620px] w-[620px] rounded-full bg-slate-300/20 blur-[160px]"
      />

      {/* Pink Glow */}
      <motion.div
        animate={{
          y: [-20, 20, -20],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
        }}
        className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-pink-300/10 blur-[120px]"
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#999 1px, transparent 1px), linear-gradient(90deg, #999 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.span
            key={i}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
            }}
            className="absolute h-2 w-2 rounded-full bg-yellow-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </>
  );
}