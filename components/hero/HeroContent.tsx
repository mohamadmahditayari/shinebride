export default function HeroContent() {
  return (
    <div className="mt-10 rounded-3xl border border-[#D4AF37]/20 bg-white/60 backdrop-blur-xl p-6 shadow-xl">

      <div className="space-y-5 text-right">

        <div className="flex items-center gap-3">
          <span className="text-2xl">❤️</span>
          <p className="text-lg font-medium text-gray-700">
            زیباترین‌ها را با عشق و هنر برایتان خلق می‌کنیم
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-2xl">🎀</span>
          <p className="text-lg text-gray-700">
            از سال
            <span className="mx-1 font-bold text-[#D4AF37]">
              ۱۳۹۸
            </span>
            تاکنون با
            <span className="mx-1 font-bold text-[#D4AF37]">
              +۱۰۰۰ رضایت مشتری
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-2xl">🏡</span>
          <p className="text-lg text-gray-700">
            فروش و اجاره به‌صورت آنلاین و حضوری
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-2xl">📦</span>
          <p className="text-lg text-gray-700">
            ارسال از تهران به سراسر ایران
          </p>
        </div>

      </div>

    </div>
  );
}