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

export default function SearchBar({ compact = false }: { compact?: boolean }) {
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

  const searchGlyph = (
    <svg className={`${compact ? "h-5 w-5" : "h-4 w-4"} shrink-0 text-[#7d1d2a]`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <circle cx="11" cy="11" r="6.5" />
      <line x1="16.2" y1="16.2" x2="21" y2="21" />
    </svg>
  );

  if (compact) {
    return (
      <div ref={ref} className="relative">
        <button
          type="button"
          aria-label="جستجو"
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-[#f7d9a7]/80 bg-[radial-gradient(circle_at_top,#fffaf5_0%,#f9e6d0_32%,#f2cf9a_100%)] text-[#7d1d2a] shadow-[0_14px_30px_rgba(125,29,42,0.20)] transition hover:scale-105 hover:shadow-[0_18px_34px_rgba(125,29,42,0.28)]"
        >
          {searchGlyph}
        </button>

        {open && (
          <div className="absolute left-1/2 top-full z-50 mt-3 w-[min(90vw,360px)] -translate-x-1/2 rounded-[28px] border border-[#d8a65d]/40 bg-[#fffdfb] p-2 text-[#3d1c22] shadow-[0_24px_50px_rgba(61,28,34,0.18)] ring-1 ring-[#7d1d2a]/10">
            <div className="flex items-center gap-2 rounded-full border border-[#d8a65d]/60 bg-[linear-gradient(135deg,rgba(255,250,247,0.98),rgba(255,244,233,0.96))] px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
              {loading ? (
                <svg className="h-4 w-4 shrink-0 animate-spin text-[#7d1d2a]" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
              ) : (
                searchGlyph
              )}
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => results.length > 0 && setOpen(true)}
                placeholder="جستجوی محصول..."
                dir="rtl"
                autoFocus
                className="w-full bg-transparent text-sm font-medium text-[#3d1c22] placeholder:text-[#7d1d2a]/45 outline-none"
              />
              {query && (
                <button type="button" onClick={() => { setQuery(""); setResults([]); setOpen(false); }} className="rounded-full bg-[#7d1d2a]/5 p-1 text-[#7d1d2a]/60 transition hover:bg-[#7d1d2a]/10 hover:text-[#7d1d2a]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
            </div>

            {open && results.length > 0 && (
              <div className="mt-2 overflow-hidden rounded-2xl border border-[#d8a65d]/30 bg-[#fffdfb] text-[#3d1c22]">
                {results.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => go(item)}
                    className="flex w-full items-center gap-3 border-b border-[#f2d8b3]/80 bg-white/90 px-4 py-3 text-right text-[#3d1c22] transition hover:bg-[#fff9f4] last:border-0"
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
                <div className="border-t border-[#f2d8b3]/80 bg-[#fff5f3] px-4 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => { router.push(`/products?q=${query}`); setOpen(false); }}
                    className="text-xs font-medium text-[#7d1d2a] underline-offset-2 hover:underline"
                  >
                    مشاهده همه نتایج
                  </button>
                </div>
              </div>
            )}

            {open && results.length === 0 && query.trim() && !loading && (
              <div className="mt-2 rounded-2xl bg-white px-4 py-5 text-center text-sm font-medium text-[#6d3b42]">
                محصولی یافت نشد
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative w-full max-w-xs text-[#3d1c22]" style={{ position: "relative" }}>
      <div className="flex items-center gap-2 rounded-full border border-[#d8a65d]/60 bg-[linear-gradient(135deg,rgba(255,250,247,0.98),rgba(255,244,233,0.96))] px-4 py-2.5 shadow-[0_12px_28px_rgba(125,29,42,0.10),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-sm transition focus-within:border-[#7d1d2a]/70 focus-within:bg-white focus-within:shadow-[0_16px_34px_rgba(125,29,42,0.14),inset_0_1px_0_rgba(255,255,255,0.9)]">
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
          dir="rtl"
          className="w-full bg-transparent text-sm font-medium text-[#3d1c22] placeholder:text-[#7d1d2a]/45 outline-none"
        />
        {query && (
          <button type="button" onClick={() => { setQuery(""); setResults([]); setOpen(false); }} className="shrink-0 rounded-full bg-[#7d1d2a]/5 p-1 text-[#7d1d2a]/60 transition hover:bg-[#7d1d2a]/10 hover:text-[#7d1d2a]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
      </div>

      {open && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-visible rounded-2xl border border-[#d8a65d]/40 bg-[#fffdfb] text-[#3d1c22] shadow-[0_24px_50px_rgba(61,28,34,0.14)] ring-1 ring-[#7d1d2a]/10">
          {results.length > 0 ? (
            <>
              {results.map((item) => (
                <button
                  key={item.id}
                  onClick={() => go(item)}
                  className="flex w-full items-center gap-3 border-b border-[#f2d8b3]/80 bg-white/90 px-4 py-3 text-right text-[#3d1c22] transition hover:bg-[#fff9f4] last:border-0"
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
              <div className="border-t border-[#f2d8b3]/80 bg-[#fff5f3] px-4 py-2 text-center">
                <button
                  type="button"
                  onClick={() => { router.push(`/products?q=${query}`); setOpen(false); }}
                  className="text-xs font-medium text-[#7d1d2a] underline-offset-2 hover:underline"
                >
                  مشاهده همه نتایج
                </button>
              </div>
            </>
          ) : (
            <div className="px-4 py-6 text-center text-sm font-medium text-[#6d3b42] bg-white">
              محصولی یافت نشد
            </div>
          )}
        </div>
      )}
    </div>
  );
}
