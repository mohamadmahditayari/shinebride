"use client";

import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage";
import { useEffect, useRef, useState } from "react";
import { normalizeImageSrc } from "@/lib/image";

type Product = {
  id: string | number;
  name: string;
  price: string;
  cover: string;
  slug: string;
  category: string;
  description?: string;
};

function ProductCard({ item, index }: { item: Product; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${(index % 3) * 100}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <Link
        href={`/products/${item.category}/${item.slug}`}
        className="group block overflow-hidden rounded-2xl bg-[#fffaf7]/90 shadow-[0_12px_28px_rgba(35,10,17,0.08)] transition-shadow duration-500 hover:shadow-2xl md:rounded-3xl"
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <OptimizedImage
            src={normalizeImageSrc(item.cover || "/images/logo.png")}
            alt={item.name}
            fill
            className="object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

          <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] tracking-widest text-[#7d1d2a] backdrop-blur">
            ویژه
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 md:hidden">
            <h2 className="text-base font-semibold text-white">{item.name}</h2>
            <p className="mt-0.5 text-sm font-bold text-[#e5bb6d]">{item.price} تومان</p>
          </div>
        </div>

        <div className="hidden p-5 md:block">
          <h2 className="text-lg font-semibold text-[#3d1c22] transition group-hover:text-[#7d1d2a]">{item.name}</h2>
          <p className="mt-1 font-bold text-[#7d1d2a]">{item.price} تومان</p>
          {item.description && (
            <p className="mt-2 line-clamp-2 text-xs leading-6 text-[#3d1c22]">{item.description}</p>
          )}
          <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[#7d1d2a]">
            مشاهده محصول
            <span className="transition group-hover:-translate-x-1">←</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function AnimatedProductGrid({ products, category }: { products: Product[]; category: string }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {products.map((item, i) => (
        <ProductCard key={item.id} item={{ ...item, category }} index={i} />
      ))}
    </div>
  );
}
