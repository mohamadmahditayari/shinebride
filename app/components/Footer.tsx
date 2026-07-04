export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        <div>
          <h2 className="text-2xl font-bold text-pink-400">
            ShineBride
          </h2>

          <p className="mt-4 text-gray-300 leading-7">
            اکسسوری‌های لوکس عروس، ست بله‌برون، گیفت،
            پلکسی و محصولات خاص برای زیباترین روز زندگی شما.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            دسترسی سریع
          </h3>

          <ul className="space-y-2 text-gray-300">
            <li>خانه</li>
            <li>محصولات</li>
            <li>درباره ما</li>
            <li>تماس با ما</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            تماس با ما
          </h3>

          <p className="text-gray-300">
            📞 09011322245
          </p>

          <p className="mt-3 text-gray-300">
            📍 ایران
          </p>
        </div>

      </div>

      <div className="border-t border-gray-700 text-center py-5 text-gray-400">
        © 2025 ShineBride - تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
}