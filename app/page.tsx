import Image from "next/image";
import FeaturedProducts from "@/components/products/FeaturedProducts";
import EsfandSlider from "@/components/EsfandSlider";

export default async function Home() {
  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(160deg,#fffdf9 0%,#faf6ee 50%,#f5f0e8 100%)" }}>

      {/* Hero */}
      <section className="relative overflow-hidden">

        {/* Background decorative circles */}
        <div className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-[#D4AF37]/8 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-[#C0C0C0]/10 blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-16 md:pt-28 md:pb-24 text-center">

          {/* Animated Logo with Luxury Shine & Floating Motion */}
          <div className="relative inline-block animate-float-logo group">

            {/* Outer spinning aura 1 */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF8DC] via-[#E6C280] to-[#D4AF37] animate-spin-glow blur-md opacity-80 group-hover:opacity-100 transition" />

            {/* Inner reverse-spinning aura 2 */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-l from-[#B8860B] via-[#FFF8DC] to-[#D4AF37] animate-spin-glow-reverse blur-sm opacity-90" />

            {/* Ambient breathing glow */}
            <div className="absolute -inset-8 rounded-full bg-[#D4AF37]/35 blur-2xl animate-pulse-glow" />

            {/* Main logo frame */}
            <div className="relative rounded-full p-[3px] bg-gradient-to-tr from-[#D4AF37] via-[#FFF8DC] via-[#F3E5AB] to-[#B8860B] shadow-2xl shadow-[#D4AF37]/40 transition-transform duration-500 group-hover:scale-105">
              <div className="relative overflow-hidden rounded-full bg-white p-1">
                <Image
                  src="/images/logo.png"
                  alt="ShineBride"
                  width={110}
                  height={110}
                  className="relative mx-auto rounded-full md:w-[140px] md:h-[140px] object-cover transition-transform duration-700 group-hover:rotate-3"
                />
                {/* Shining sweep light effect across the logo */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/85 to-transparent animate-shine-sweep pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Title */}
          <div className="mt-10 md:mt-14">
            <h1 className="text-6xl md:text-8xl tracking-[14px] md:tracking-[24px]" style={{ color: "#D4AF37", fontWeight: 300 }}>
              SHINE
            </h1>
            <h2 className="text-6xl md:text-8xl tracking-[14px] md:tracking-[24px] -mt-2" style={{ color: "#9CA3AF", fontWeight: 300 }}>
              BRIDE
            </h2>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mt-8 md:mt-10">
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="text-[#D4AF37] text-lg">✦</span>
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>

          {/* Subtitle */}
          <p className="mt-6 text-xs md:text-sm tracking-[4px] md:tracking-[6px] uppercase text-gray-400">
            Luxury Wedding Accessories
          </p>

          {/* CTA */}
          <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#c9a227] px-8 py-4 text-sm text-white shadow-xl shadow-[#D4AF37]/30 transition hover:shadow-[#D4AF37]/50 hover:-translate-y-0.5"
            >
              مشاهده محصولات
              <span>←</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-[#D4AF37]/40 px-8 py-4 text-sm text-[#D4AF37] transition hover:bg-[#D4AF37]/10"
            >
              تماس با ما
            </a>
          </div>

          {/* Stats */}
          <div className="mt-14 md:mt-20 grid grid-cols-3 gap-4 md:gap-8 max-w-lg mx-auto">
            {[
              { num: "+۱۰۰۰", label: "مشتری راضی" },
              { num: "+۵۰", label: "مدل اختصاصی" },
              { num: "+۶", label: "سال تجربه" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-[#D4AF37]">{s.num}</p>
                <p className="mt-1 text-xs text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Divider wave */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 40" className="w-full fill-white/60">
          <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" />
        </svg>
      </div>

      <FeaturedProducts />

      {/* Product Sliders */}
      <div className="max-w-7xl mx-auto pb-16">
        <EsfandSlider />
      </div>

    </main>
  );
}
