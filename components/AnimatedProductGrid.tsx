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
        className="group block overflow-hidden rounded-2xl md:rounded-3xl bg-white shadow-md hover:shadow-2xl transition-shadow duration-500"
      >
        {/* Image */}
        <div className="relative w-full aspect-[3/4] overflow-hidden">
          <OptimizedImage
            src={normalizeImageSrc(item.cover || "/images/logo.png")}
            alt={item.name}
            fill
            className="object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

          {/* Badge */}
          <div className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[10px] text-[#D4AF37] tracking-widest">
            ویژه
          </div>

          {/* Mobile: info on image */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:hidden">
            <h2 className="text-white font-semibold text-base">{item.name}</h2>
            <p className="text-[#D4AF37] text-sm font-bold mt-0.5">{item.price} تومان</p>
          </div>
        </div>

        {/* Desktop card body */}
        <div className="hidden md:block p-5">
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-[#D4AF37] transition">{item.name}</h2>
          <p className="text-[#D4AF37] font-bold mt-1">{item.price} تومان</p>
          {item.description && (
            <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-6">{item.description}</p>
          )}
          <div className="mt-4 flex items-center gap-1 text-sm text-[#D4AF37] font-medium">
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
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {products.map((item, i) => (
        <ProductCard key={item.id} item={{ ...item, category }} index={i} />
      ))}
    </div>
  );
}
