"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { normalizeImageSrc } from "@/lib/image";
import Image from "next/image";

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
    if (!query.trim()) { setResults([]); setOpen(false); return; }
    const timer = setTimeout(async () => {
      setLoading(true);
      const { data } = await supabase
        .from("products")
        .select("id, name, category, slug, cover, price")
        .ilike("name", `%${query}%`)
        .limit(6);
      setResults(data || []);
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
    <div ref={ref} className="relative w-full max-w-xs">
      <div className="flex items-center gap-2 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/5 px-4 py-2 focus-within:border-[#D4AF37]/60 focus-within:bg-white transition">
        {loading ? (
          <svg className="animate-spin h-4 w-4 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
        ) : (
          <svg className="h-4 w-4 text-[#D4AF37]/60 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="جستجوی محصول..."
          className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
        />
        {query && (
          <button onClick={() => { setQuery(""); setResults([]); setOpen(false); }} className="text-gray-300 hover:text-gray-500 transition shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full mt-2 left-0 right-0 z-50 rounded-2xl border border-[#D4AF37]/15 bg-white shadow-2xl shadow-black/10 overflow-hidden">
          {results.length > 0 ? (
            <>
              {results.map((item) => (
                <button
                  key={item.id}
                  onClick={() => go(item)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#D4AF37]/5 transition text-right border-b border-gray-50 last:border-0"
                >
                  <div className="relative h-10 w-10 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                    <Image
                      src={normalizeImageSrc(item.cover || "/images/logo.png")}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.price} تومان</p>
                  </div>
                  <span className="text-[#D4AF37]/50 text-xs shrink-0">←</span>
                </button>
              ))}
              <div className="px-4 py-2 bg-gray-50 text-center">
                <button
                  onClick={() => { router.push(`/products?q=${query}`); setOpen(false); }}
                  className="text-xs text-[#D4AF37] hover:underline"
                >
                  مشاهده همه نتایج
                </button>
              </div>
            </>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-gray-400">
              محصولی یافت نشد
            </div>
          )}
        </div>
      )}
    </div>
  );
}
