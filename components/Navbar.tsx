"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [search, setSearch] = useState("");

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-pink-100 bg-white/85 shadow-lg backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        {/* Logo */}
        <Link
          href="/"
          className="bg-gradient-to-r from-pink-500 via-pink-400 to-rose-500 bg-clip-text text-4xl font-extrabold tracking-wide text-transparent transition duration-300 hover:scale-105"
        >
          ShineBride
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-8 text-[17px] font-medium">

          <Link
            href="/"
            className="transition duration-300 hover:-translate-y-1 hover:text-pink-500"
          >
            خانه
          </Link>

          <Link
            href="/products"
            className="transition duration-300 hover:-translate-y-1 hover:text-pink-500"
          >
            محصولات
          </Link>

          <button
            onClick={() => scrollToSection("about")}
            className="transition duration-300 hover:-translate-y-1 hover:text-pink-500"
          >
            درباره ما
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="transition duration-300 hover:-translate-y-1 hover:text-pink-500"
          >
            تماس با ما
          </button>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="جستجوی محصولات..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 rounded-full border border-pink-200 bg-white py-2 pr-10 pl-4 text-sm outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
            />

            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex h-12 w-12 items-center justify-center rounded-full bg-pink-50 shadow transition duration-300 hover:scale-110 hover:bg-pink-100"
          >
            <span className="text-2xl">🛒</span>

            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs font-bold text-white">
              0
            </span>
          </Link>

        </div>

      </div>
    </nav>
  );
}