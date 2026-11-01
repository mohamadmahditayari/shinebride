"use client";

import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage";
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
      <div className="mb-5 flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3">
          <div className="h-6 w-1 rounded-full bg-[#7d1d2a]" />
          <h2 className="text-xl text-[#3d1c22] md:text-2xl">{title}</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => scroll("right")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#7d1d2a]/30 text-[#7d1d2a] transition hover:bg-[#7d1d2a]/10"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
          <button
            onClick={() => scroll("left")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#7d1d2a]/30 text-[#7d1d2a] transition hover:bg-[#7d1d2a]/10"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <Link href={`/products/${categorySlug}`} className="text-sm text-[#7d1d2a] hover:underline">
            مشاهده همه ←
          </Link>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-4 pb-4 md:px-8"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((item) => (
          <Link
            key={item.id}
            href={`/products/${item.category}/${item.slug}`}
            className="group shrink-0 w-44 overflow-hidden rounded-2xl bg-[#fffaf7]/90 shadow-[0_12px_28px_rgba(35,10,17,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:w-56"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <OptimizedImage
                src={normalizeImageSrc(item.cover || "/images/logo.png")}
                alt={item.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
            <div className="p-3">
              <h3 className="truncate text-sm font-semibold text-[#3d1c22] transition group-hover:text-[#7d1d2a]">{item.name}</h3>
              <p className="mt-1 text-xs font-bold text-[#7d1d2a]">{item.price} تومان</p>
            </div>
          </Link>
        ))}

        <Link
          href={`/products/${categorySlug}`}
          className="flex w-44 shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#7d1d2a]/30 p-6 text-center text-[#7d1d2a] transition hover:bg-[#7d1d2a]/5 md:w-56"
        >
          <span className="text-3xl">✦</span>
          <span className="text-sm">مشاهده همه محصولات</span>
        </Link>
      </div>
    </div>
  );
}
