import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">

      {/* Top wave */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 50" className="w-full" style={{ fill: "#faf6ee" }}>
          <path d="M0,30 C480,60 960,0 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-4 pb-14 grid gap-12 md:grid-cols-3">

        {/* Brand */}
        <div id="about">
          <div className="flex items-center gap-2" dir="ltr">
            <span className="text-2xl tracking-[6px]" style={{ color: "#D4AF37" }}>SHINE</span>
            <span className="text-2xl tracking-[6px] text-gray-500">BRIDE</span>
          </div>
          <p className="text-sm leading-8 text-gray-400" id="about-text">
            با عشق و هنر، زیباترین لحظات زندگیتان را ماندگار میکنیم.
            اکسسوری لوکس عروس، طراحی اختصاصی و کیفیت بینظیر.
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href="https://instagram.com/shine._bride"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-[#D4AF37]/30 px-4 py-2 text-xs text-[#D4AF37] hover:bg-[#D4AF37]/10 transition"
            >
              اینستاگرام
            </a>
            <a
              href="tel:09011322245"
              className="flex items-center gap-2 rounded-full border border-gray-700 px-4 py-2 text-xs text-gray-400 hover:border-[#D4AF37]/30 hover:text-[#D4AF37] transition"
            >
              تماس مستقیم
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="mb-6 text-sm tracking-[3px] uppercase text-[#D4AF37]">دسترسی سریع</h3>
          <div className="flex flex-col gap-3 text-sm">
            {[
              { label: "خانه", href: "/" },
              { label: "محصولات", href: "/products" },
              { label: "سبد خرید", href: "/cart" },
              { label: "درباره ما", href: "#about" },
              { label: "تماس با ما", href: "#contact" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="text-gray-400 hover:text-[#D4AF37] transition flex items-center gap-2">
                <span className="text-[#D4AF37]/40">✦</span> {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div id="contact">
          <h3 className="mb-6 text-sm tracking-[3px] uppercase text-[#D4AF37]">ارتباط با ما</h3>
          <div className="space-y-4 text-sm text-gray-400">
            <div className="flex items-center gap-3">
              <span className="text-[#D4AF37]">📞</span>
              <a href="tel:09011322245" className="hover:text-[#D4AF37] transition">۰۹۰۱۱۳۲۲۲۴۵</a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#D4AF37]">📷</span>
              <a href="https://instagram.com/shine._bride" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition">@shine._bride</a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#D4AF37]">📍</span>
              <span>تهران، ایران</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#D4AF37]">📦</span>
              <span>ارسال به سراسر ایران</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-5 text-center text-xs text-gray-600">
        © ۱۴۰۴ ShineBride &nbsp;|&nbsp; تمامی حقوق محفوظ است &nbsp;✦
      </div>
    </footer>
  );
}
