import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#e9e2d0] shadow-sm">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        {/* MENU */}
        <div className="flex gap-8 text-sm tracking-widest">

          <Link
            href="/"
            className="hover:text-[#D4AF37] transition duration-300"
          >
            خانه
          </Link>

          <Link
            href="/products"
            className="hover:text-[#D4AF37] transition duration-300"
          >
            محصولات
          </Link>

          <Link
            href="#"
            className="hover:text-[#D4AF37] transition duration-300"
          >
            درباره ما
          </Link>

          <Link
            href="#"
            className="hover:text-[#D4AF37] transition duration-300"
          >
            تماس
          </Link>

        </div>

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-4"
        >

          <div className="text-right">

            <div
              className="text-2xl tracking-[10px]"
              style={{
                color: "#D4AF37",
                fontFamily: "Doran",
              }}
            >
              SHINE
            </div>

            <div
              className="text-2xl tracking-[10px]"
              style={{
                color: "#B8B8B8",
                fontFamily: "Doran",
              }}
            >
              BRIDE
            </div>

          </div>

          <Image
            src="/images/logo.png"
            alt="ShineBride"
            width={60}
            height={60}
            className="rounded-full"
          />

        </Link>

        {/* CART */}
        <Link
          href="/cart"
          className="relative"
        >

          <div className="w-11 h-11 rounded-full border border-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition text-xl">
            🛒
          </div>

          <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            0
          </span>

        </Link>

      </div>

    </nav>
  );
}