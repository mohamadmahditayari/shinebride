import OptimizedImage from "@/components/OptimizedImage";
import FeaturedProducts from "@/components/products/FeaturedProducts";

export default async function Home() {
  return (
    <main className="yalda-shell min-h-screen relative overflow-hidden" style={{ background: "linear-gradient(180deg, #4a1221 0%, #6d1a2d 24%, #7d1d2a 52%, #90374a 100%)" }}>
      <section className="relative overflow-hidden py-6 md:py-10">
        <div className="pointer-events-none absolute -top-24 -right-16 h-[440px] w-[440px] rounded-full bg-[#a52d40]/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-12 h-[360px] w-[360px] rounded-full bg-[#e5bb6d]/18 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-12 h-56 w-56 -translate-x-1/2 rounded-full bg-[#f8d7b3]/25 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 pb-16 pt-14 text-center md:pb-24 md:pt-20">
          <div className="group relative inline-block animate-float-logo">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#7d1d2a] via-[#f7d9a7] via-[#c05c62] to-[#7d1d2a] opacity-85 blur-md animate-spin-glow" />
            <div className="absolute -inset-2 rounded-full bg-gradient-to-l from-[#6a1727] via-[#f3dfc3] to-[#d18949] opacity-90 blur-sm animate-spin-glow-reverse" />
            <div className="absolute -inset-8 rounded-full bg-[#ad2e3f]/25 blur-2xl animate-pulse-glow" />

            <div className="relative rounded-full p-[3px] bg-gradient-to-tr from-[#7d1d2a] via-[#f7d9a7] via-[#d98e7e] to-[#6a1727] shadow-[0_20px_50px_rgba(125,29,42,0.35)] transition-transform duration-500 group-hover:scale-105">
              <div className="relative overflow-hidden rounded-full bg-white p-1">
                <OptimizedImage
                  src="/images/logo.png"
                  alt="ShineBride"
                  width={110}
                  height={110}
                  className="relative mx-auto rounded-full object-cover md:h-[140px] md:w-[140px] transition-transform duration-700 group-hover:rotate-3"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/85 to-transparent animate-shine-sweep" />
              </div>
            </div>
          </div>

          <div className="mt-10 md:mt-14">
            <h1 className="text-5xl tracking-[12px] text-[#7d1d2a] md:text-8xl md:tracking-[24px]" style={{ fontWeight: 300 }}>
              SHINE
            </h1>
            <h2 className="-mt-2 text-5xl tracking-[12px] text-[#d8a65d] md:text-8xl md:tracking-[24px]" style={{ fontWeight: 300 }}>
              BRIDE
            </h2>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 md:mt-10">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#7d1d2a] md:w-24" />
            <span className="text-lg text-[#d8a65d]">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#7d1d2a] md:w-24" />
          </div>

          <p className="mt-6 text-xs uppercase tracking-[4px] text-[#7d1d2a]/70 md:text-sm md:tracking-[6px]">
            Yalda &nbsp;•&nbsp; Luxury Wedding Accessories
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row md:mt-12">
            <a
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7d1d2a] to-[#ad2e3f] px-8 py-4 text-sm text-white shadow-[0_16px_32px_rgba(125,29,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_38px_rgba(125,29,42,0.42)]"
            >
              مشاهده محصولات
              <span>←</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-[#7d1d2a]/40 bg-white/30 px-8 py-4 text-sm text-[#7d1d2a] backdrop-blur-sm transition hover:bg-[#7d1d2a]/10"
            >
              تماس با ما
            </a>
          </div>

          <div className="mx-auto mt-14 grid max-w-lg grid-cols-3 gap-4 md:mt-20 md:gap-8">
            {[
              { num: "+۱۰۰۰", label: "مشتری راضی" },
              { num: "+۵۰", label: "مدل اختصاصی" },
              { num: "+۶", label: "سال تجربه" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-[#7d1d2a]/10 bg-white/25 p-4 shadow-[0_10px_30px_rgba(125,29,42,0.06)] backdrop-blur-sm">
                <p className="text-2xl font-bold text-[#7d1d2a] md:text-3xl">{s.num}</p>
                <p className="mt-1 text-[10px] text-[#7d1d2a]/70 md:text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 40" className="w-full fill-[#f7eee7]">
          <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" />
        </svg>
      </div>

      <FeaturedProducts />
    </main>
  );
}
