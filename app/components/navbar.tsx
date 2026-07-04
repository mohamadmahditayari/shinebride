import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-pink-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">

        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-bold text-pink-400"
        >
          ShineBride
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-8 text-gray-700">

          <Link href="/" className="hover:text-pink-400 transition">
            خانه
          </Link>

          <Link href="/products" className="hover:text-pink-400 transition">
            محصولات
          </Link>

          <Link href="#" className="hover:text-pink-400 transition">
            درباره ما
          </Link>

          <Link href="#" className="hover:text-pink-400 transition">
            تماس با ما
          </Link>

          <Link
            href="/cart"
            className="relative text-2xl hover:scale-110 transition"
          >
            🛒
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
              0
            </span>
          </Link>

        </div>

      </div>
    </nav>
  );
}