"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { normalizeImageSrc } from "@/lib/image";

type Product = {
  id: string | number;
  name: string;
  price: string;
  cover: string;
  slug: string;
  category: string;
};

type Props = {
  title: string;
  products: Product[];
  categorySlug: string;
};

export default function ProductSlider({ title, products, categorySlug }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <div className="py-8">
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-8 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 rounded-full bg-[#D4AF37]" />
          <h2 className="text-xl md:text-2xl text-gray-800">{title}</h2>
        </div>
        <div className="flex items-center gap-3">
          {/* Arrow buttons */}
          <button
            onClick={() => scroll("right")}
            className="h-9 w-9 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
          <button
            onClick={() => scroll("left")}
            className="h-9 w-9 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <Link href={`/products/${categorySlug}`} className="text-sm text-[#D4AF37] hover:underline">
            مشاهده همه ←
          </Link>
        </div>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-4 md:px-8 pb-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((item) => (
          <Link
            key={item.id}
            href={`/products/${item.category}/${item.slug}`}
            className="group shrink-0 w-44 md:w-56 overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <Image
                src={normalizeImageSrc(item.cover || "/images/logo.png")}
                alt={item.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-800 truncate group-hover:text-[#D4AF37] transition">{item.name}</h3>
              <p className="text-xs text-[#D4AF37] font-bold mt-1">{item.price} تومان</p>
            </div>
          </Link>
        ))}

        {/* See all card */}
        <Link
          href={`/products/${categorySlug}`}
          className="shrink-0 w-44 md:w-56 rounded-2xl border-2 border-dashed border-[#D4AF37]/30 flex flex-col items-center justify-center gap-3 text-[#D4AF37] hover:bg-[#D4AF37]/5 transition p-6 text-center"
        >
          <span className="text-3xl">✦</span>
          <span className="text-sm">مشاهده همه محصولات</span>
        </Link>
      </div>
    </div>
  );
}
