"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { useCart } from "@/app/context/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    if (pathname !== "/") { window.location.href = `/#${id}`; return; }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-[#D4AF37]/15 shadow-sm">
      <div className="max-w-7xl mx-auto h-16 md:h-20 flex items-center justify-between px-4 md:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span dir="ltr" className="flex items-center gap-2">
            <span className="text-xl md:text-2xl tracking-[4px] md:tracking-[6px]" style={{ color: "#D4AF37" }}>SHINE</span>
            <span className="text-xl md:text-2xl tracking-[4px] md:tracking-[6px] text-gray-400">BRIDE</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8 text-sm text-gray-600">
          {[{ label: "خانه", href: "/" }, { label: "محصولات", href: "/products" }].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative pb-0.5 transition hover:text-[#D4AF37] after:absolute after:bottom-0 after:right-0 after:h-px after:w-0 after:bg-[#D4AF37] after:transition-all hover:after:w-full ${pathname === item.href ? "text-[#D4AF37] after:w-full" : ""}`}
            >
              {item.label}
            </Link>
          ))}
          <button onClick={() => scrollToSection("about")} className="relative pb-0.5 transition hover:text-[#D4AF37] after:absolute after:bottom-0 after:right-0 after:h-px after:w-0 after:bg-[#D4AF37] after:transition-all hover:after:w-full">درباره ما</button>
          <button onClick={() => scrollToSection("contact")} className="relative pb-0.5 transition hover:text-[#D4AF37] after:absolute after:bottom-0 after:right-0 after:h-px after:w-0 after:bg-[#D4AF37] after:transition-all hover:after:w-full">تماس با ما</button>
        </nav>

        {/* Desktop Search + Cart + CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <SearchBar />
          <Link href="/cart" className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 transition">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#D4AF37] text-white text-[10px] flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
          <Link
            href="/products"
            className="rounded-full bg-gradient-to-r from-[#D4AF37] to-[#c9a227] px-5 py-2.5 text-sm text-white shadow-md shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 transition"
          >
            سفارش دهید
          </Link>
        </div>

        {/* Mobile: Cart + Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/cart" className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#D4AF37] text-white text-[10px] flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/5"
            aria-label="منو"
          >
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-[#D4AF37]/10 bg-white/95 backdrop-blur-2xl px-4 py-3 flex flex-col gap-1">
          <Link href="/" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-right text-sm hover:bg-[#D4AF37]/5 hover:text-[#D4AF37] transition">خانه</Link>
          <Link href="/products" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-right text-sm hover:bg-[#D4AF37]/5 hover:text-[#D4AF37] transition">محصولات</Link>
          <button onClick={() => scrollToSection("about")} className="rounded-xl px-4 py-3 text-right text-sm hover:bg-[#D4AF37]/5 hover:text-[#D4AF37] transition">درباره ما</button>
          <button onClick={() => scrollToSection("contact")} className="rounded-xl px-4 py-3 text-right text-sm hover:bg-[#D4AF37]/5 hover:text-[#D4AF37] transition">تماس با ما</button>
          <a href="https://instagram.com/shine._bride" target="_blank" rel="noopener noreferrer" className="rounded-xl px-4 py-3 text-right text-sm text-[#D4AF37] hover:bg-[#D4AF37]/5 transition">اینستاگرام ✦</a>
          <div className="px-4 pb-2 pt-1">
            <SearchBar />
          </div>
        </div>
      )}
    </header>
  );
}
