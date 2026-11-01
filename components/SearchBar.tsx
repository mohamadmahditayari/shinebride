"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { normalizeImageSrc } from "@/lib/image";
import OptimizedImage from "@/components/OptimizedImage";
import { searchProducts } from "@/lib/products";

type Result = {
  id: string | number;
  name: string;
  category: string;
  slug: string;
  cover: string;
  price: string;
};

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      const data = await searchProducts(query);
      setResults(data.slice(0, 6));
      setOpen(true);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const go = (item: Result) => {
    setOpen(false);
    setQuery("");
    router.push(`/products/${item.category}/${item.slug}`);
  };

  return (
    <div ref={ref} className="relative w-full max-w-xs text-[#3d1c22]">
      <div className="flex items-center gap-2 rounded-full border border-[#7d1d2a]/25 bg-[#7d1d2a]/5 px-4 py-2 transition focus-within:border-[#7d1d2a]/60 focus-within:bg-white">
        {loading ? (
          <svg className="h-4 w-4 shrink-0 animate-spin text-[#7d1d2a]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
        ) : (
          <svg className="h-4 w-4 shrink-0 text-[#7d1d2a]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="جستجوی محصول..."
          className="w-full bg-transparent text-sm text-[#3d1c22] placeholder:text-[#7d1d2a]/45 outline-none"
        />
        {query && (
          <button onClick={() => { setQuery(""); setResults([]); setOpen(false); }} className="shrink-0 text-gray-300 transition hover:text-gray-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full z-[60] mt-2 overflow-hidden rounded-2xl border border-[#7d1d2a]/20 bg-[#fffaf7] text-[#3d1c22] shadow-[0_20px_40px_rgba(61,28,34,0.18)] ring-1 ring-[#7d1d2a]/5">
          {results.length > 0 ? (
            <>
              {results.map((item) => (
                <button
                  key={item.id}
                  onClick={() => go(item)}
                  className="flex w-full items-center gap-3 border-b border-[#7d1d2a]/10 bg-white/60 px-4 py-3 text-right text-[#3d1c22] transition hover:bg-[#7d1d2a]/5 last:border-0"
                >
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    <OptimizedImage
                      src={normalizeImageSrc(item.cover || "/images/logo.png")}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-[#3d1c22]">{item.name}</p>
                    <p className="mt-0.5 text-xs font-medium text-[#7d1d2a]">{item.price} تومان</p>
                  </div>
                  <span className="shrink-0 text-sm text-[#7d1d2a]">←</span>
                </button>
              ))}
              <div className="border-t border-[#7d1d2a]/10 bg-[#fff5f3] px-4 py-2 text-center">
                <button
                  onClick={() => { router.push(`/products?q=${query}`); setOpen(false); }}
                  className="text-xs font-medium text-[#7d1d2a] underline-offset-2 hover:underline"
                >
                  مشاهده همه نتایج
                </button>
              </div>
            </>
          ) : (
            <div className="px-4 py-6 text-center text-sm font-medium text-[#6d3b42]">
              محصولی یافت نشد
            </div>
          )}
        </div>
      )}
    </div>
  );
}
