import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#2e1018] text-[#f5e6dd]">
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 50" className="w-full" style={{ fill: "#f7eee7" }}>
          <path d="M0,30 C480,60 960,0 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-14 pt-4 md:grid-cols-3 md:px-8">
        <div id="about">
          <div className="flex items-center gap-2" dir="ltr">
            <span className="text-2xl tracking-[6px] text-[#e5bb6d]">SHINE</span>
            <span className="text-2xl tracking-[6px] text-[#f3d8b5]">BRIDE</span>
          </div>
          <p className="mt-4 text-sm leading-8 text-[#f4d7d2]" id="about-text">
            با عشق و هنر، زیباترین لحظات زندگیتان را ماندگار میکنیم.
            اکسسوری لوکس عروس، طراحی اختصاصی و کیفیت بینظیر.
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href="https://instagram.com/shine._bride"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-[#e5bb6d]/30 px-4 py-2 text-xs text-[#f0d49a] transition hover:bg-[#e5bb6d]/10"
            >
              اینستاگرام
            </a>
            <a
              href="tel:09011322245"
              className="flex items-center gap-2 rounded-full border border-[#f4d7d2]/20 px-4 py-2 text-xs text-[#f5e6dd] transition hover:border-[#e5bb6d]/30 hover:text-[#e5bb6d]"
            >
              تماس مستقیم
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-6 text-sm uppercase tracking-[3px] text-[#e5bb6d]">دسترسی سریع</h3>
          <div className="flex flex-col gap-3 text-sm">
            {[
              { label: "خانه", href: "/" },
              { label: "محصولات", href: "/products" },
              { label: "سبد خرید", href: "/cart" },
              { label: "درباره ما", href: "#about" },
              { label: "تماس با ما", href: "#contact" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-2 text-[#f2d8d4] transition hover:text-[#e5bb6d]">
                <span className="text-[#e5bb6d]/70">✦</span> {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div id="contact">
          <h3 className="mb-6 text-sm uppercase tracking-[3px] text-[#e5bb6d]">ارتباط با ما</h3>
          <div className="space-y-4 text-sm text-[#f2d8d4]">
            <div className="flex items-center gap-3">
              <span className="text-[#e5bb6d]">📞</span>
              <a href="tel:09011322245" className="transition hover:text-[#e5bb6d]">۰۹۰۱۱۳۲۲۲۴۵</a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#e5bb6d]">📷</span>
              <a href="https://instagram.com/shine._bride" target="_blank" rel="noopener noreferrer" className="transition hover:text-[#e5bb6d]">@shine._bride</a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#e5bb6d]">📍</span>
              <span>تهران، ایران</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#e5bb6d]">📦</span>
              <span>ارسال به سراسر ایران</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#f5e6dd]/10 py-5 text-center text-xs text-[#f0d9cd]/70">
        © ۱۴۰۴ ShineBride &nbsp;|&nbsp; تمامی حقوق محفوظ است &nbsp;✦
      </div>
    </footer>
  );
}
