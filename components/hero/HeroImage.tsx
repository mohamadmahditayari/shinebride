"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroImage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="relative flex justify-center items-center"
    >
      {/* Glow */}
      <div className="absolute h-[520px] w-[520px] rounded-full bg-gradient-to-r from-yellow-300/20 to-slate-300/20 blur-[120px]" />

      {/* Glass Card */}
      <motion.div
        whileHover={{
          y: -12,
          rotate: -1,
        }}
        transition={{
          duration: 0.4,
        }}
        className="relative rounded-[40px] bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl p-6"
      >
        <Image
          src="/images/hero.png"
          alt="ShineBride"
          width={520}
          height={700}
          priority
          className="rounded-[30px] object-cover"
        />

        {/* Floating Badge */}
        <motion.div
          animate={{
            y: [-8, 8, -8],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
          className="absolute -left-8 top-12 rounded-2xl bg-white/80 backdrop-blur-xl px-5 py-3 shadow-xl"
        >
          <p className="text-xs tracking-[3px] text-gray-500 uppercase">
            Luxury
          </p>

          <h3 className="mt-1 text-xl font-semibold text-yellow-500">
            Handmade
          </h3>
        </motion.div>

        {/* Floating Badge 2 */}
        <motion.div
          animate={{
            y: [10, -10, 10],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
          }}
          className="absolute -right-8 bottom-14 rounded-2xl bg-white/80 backdrop-blur-xl px-5 py-3 shadow-xl"
        >
          <p className="text-xs tracking-[3px] text-gray-500 uppercase">
            Premium
          </p>

          <h3 className="mt-1 text-xl font-semibold text-slate-500">
            Design
          </h3>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}