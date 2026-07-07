import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-pink-100 bg-gradient-to-b from-pink-50 to-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-8 py-14 md:grid-cols-3">

        {/* Brand / About Us */}
        <div id="about">
          <h2 className="bg-gradient-to-r from-pink-500 via-pink-400 to-rose-500 bg-clip-text text-3xl font-bold text-transparent">
            ShineBride
          </h2>

          <h3 className="mt-6 mb-4 text-xl font-bold text-pink-500">
            درباره ما
          </h3>

          <div className="space-y-3 text-right leading-8 text-gray-700">
            <p>❤️ زیباترین‌ها را با عشق و هنر برایتان خلق می‌کنیم</p>

            <p>
              🎀 از سال
              <span className="font-bold text-[#D4AF37]"> ۱۳۹۸ </span>
              تاکنون با
              <span className="font-bold text-[#D4AF37]">
                {" "}
                +۱۰۰۰ رضایت مشتری
              </span>
            </p>

            <p>🏡 فروش و اجاره به‌صورت آنلاین و حضوری</p>

            <p>📦 ارسال از تهران به تمام شهرهای ایران</p>

            <p>
              📞 شماره تماس:
              <a
                href="tel:09011322245"
                className="mr-2 font-bold text-pink-500 hover:underline"
              >
                ۰۹۰۱۱۳۲۲۲۴۵
              </a>
            </p>

            <p>
              📷 اینستاگرام:
              <a
                href="https://instagram.com/shine._bride"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-2 font-bold text-pink-500 hover:underline"
              >
                @shine._bride
              </a>
            </p>
          </div>
        </div>

        {/* Menu */}
        <div>
          <h3 className="mb-5 text-xl font-bold">
            دسترسی سریع
          </h3>

          <div className="flex flex-col gap-3 text-gray-600">
            <Link href="/" className="transition hover:text-pink-500">
              خانه
            </Link>

            <Link href="/products" className="transition hover:text-pink-500">
              محصولات
            </Link>

            <Link href="/cart" className="transition hover:text-pink-500">
              سبد خرید
            </Link>

            <Link href="#about" className="transition hover:text-pink-500">
              درباره ما
            </Link>

            <Link href="#contact" className="transition hover:text-pink-500">
              تماس با ما
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div id="contact">
          <h3 className="mb-5 text-xl font-bold">
            ارتباط با ما
          </h3>

          <div className="space-y-3 text-gray-600">
            <p>
              📞
              <a
                href="tel:09011322245"
                className="mr-2 hover:text-pink-500"
              >
                ۰۹۰۱۱۳۲۲۲۴۵
              </a>
            </p>

            <p>
              📷
              <a
                href="https://instagram.com/shine._bride"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-2 hover:text-pink-500"
              >
                @shine._bride
              </a>
            </p>

            <p>📍 تهران، ایران</p>
          </div>
        </div>

      </div>

      <div className="border-t border-pink-100 py-6 text-center text-sm text-gray-500">
        © 2026 ShineBride | تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
}