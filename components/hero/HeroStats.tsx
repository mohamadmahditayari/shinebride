"use client";

import CountUp from "react-countup";
import { motion } from "framer-motion";

const stats = [
  {
    number: 500,
    suffix: "+",
    title: "محصول لوکس",
  },
  {
    number: 3000,
    suffix: "+",
    title: "مشتری راضی",
  },
  {
    number: 8,
    suffix: "سال",
    title: "تجربه",
  },
];

export default function HeroStats() {
  return (
    <div className="grid grid-cols-3 gap-6 mt-14">
      {stats.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{
            y: -8,
            scale: 1.04,
          }}
          className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 text-center shadow-xl"
        >
          <h3 className="text-4xl font-bold text-yellow-400">
            <CountUp end={item.number} duration={3} />
            {item.suffix}
          </h3>

          <p className="mt-2 text-gray-300">
            {item.title}
          </p>
        </motion.div>
      ))}
    </div>
  );
}