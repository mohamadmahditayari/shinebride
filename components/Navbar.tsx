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
    <header className="sticky top-0 z-50 border-b border-[#7d1d2a]/15 bg-[#fffaf7]/80 shadow-[0_8px_24px_rgba(125,29,42,0.08)] backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-8">
        <Link href="/" className="shrink-0">
          <span dir="ltr" className="flex items-center gap-2">
            <span className="text-xl tracking-[4px] text-[#7d1d2a] md:text-2xl md:tracking-[6px]">SHINE</span>
            <span className="text-xl tracking-[4px] text-[#d8a65d] md:text-2xl md:tracking-[6px]">BRIDE</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-[#5d2a2a] lg:flex">
          {[{ label: "خانه", href: "/" }, { label: "محصولات", href: "/products" }].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative pb-0.5 transition hover:text-[#7d1d2a] after:absolute after:bottom-0 after:right-0 after:h-px after:w-0 after:bg-[#7d1d2a] after:transition-all hover:after:w-full ${pathname === item.href ? "text-[#7d1d2a] after:w-full" : ""}`}
            >
              {item.label}
            </Link>
          ))}
          <button onClick={() => scrollToSection("about")} className="relative pb-0.5 transition hover:text-[#7d1d2a] after:absolute after:bottom-0 after:right-0 after:h-px after:w-0 after:bg-[#7d1d2a] after:transition-all hover:after:w-full">درباره ما</button>
          <button onClick={() => scrollToSection("contact")} className="relative pb-0.5 transition hover:text-[#7d1d2a] after:absolute after:bottom-0 after:right-0 after:h-px after:w-0 after:bg-[#7d1d2a] after:transition-all hover:after:w-full">تماس با ما</button>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <SearchBar />
          <Link href="/cart" className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#7d1d2a]/20 bg-[#7d1d2a]/5 transition hover:bg-[#7d1d2a]/10">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7d1d2a" strokeWidth="1.8">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#7d1d2a] text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
          <Link
            href="/products"
            className="rounded-full bg-gradient-to-r from-[#7d1d2a] to-[#ad2e3f] px-5 py-2.5 text-sm text-white shadow-md shadow-[#7d1d2a]/20 transition hover:shadow-[#7d1d2a]/35"
          >
            سفارش دهید
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/cart" className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#7d1d2a]/20 bg-[#7d1d2a]/5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7d1d2a" strokeWidth="1.8">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#7d1d2a] text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#7d1d2a]/20 bg-[#7d1d2a]/5"
            aria-label="منو"
          >
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7d1d2a" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7d1d2a" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-1 border-t border-[#7d1d2a]/10 bg-[#fffaf7]/95 px-4 py-3 backdrop-blur-2xl lg:hidden">
          <Link href="/" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-right text-sm text-[#5d2a2a] transition hover:bg-[#7d1d2a]/5 hover:text-[#7d1d2a]">خانه</Link>
          <Link href="/products" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-right text-sm text-[#5d2a2a] transition hover:bg-[#7d1d2a]/5 hover:text-[#7d1d2a]">محصولات</Link>
          <button onClick={() => scrollToSection("about")} className="rounded-xl px-4 py-3 text-right text-sm text-[#5d2a2a] transition hover:bg-[#7d1d2a]/5 hover:text-[#7d1d2a]">درباره ما</button>
          <button onClick={() => scrollToSection("contact")} className="rounded-xl px-4 py-3 text-right text-sm text-[#5d2a2a] transition hover:bg-[#7d1d2a]/5 hover:text-[#7d1d2a]">تماس با ما</button>
          <a href="https://instagram.com/shine._bride" target="_blank" rel="noopener noreferrer" className="rounded-xl px-4 py-3 text-right text-sm text-[#7d1d2a] transition hover:bg-[#7d1d2a]/5">اینستاگرام ✦</a>
          <div className="px-4 pb-2 pt-1">
            <SearchBar />
          </div>
        </div>
      )}
    </header>
  );
}
