"use client";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import HeroStats from "./HeroStats";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen bg-gradient-to-b from-white via-[#faf9f7] to-[#f3f3f3]">
      <HeroBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-0 min-h-screen grid lg:grid-cols-2 items-center gap-16">
        <div>
          <HeroContent />
          <HeroStats />
        </div>

        <HeroImage />
      </div>
    </section>
  );
}