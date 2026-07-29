"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="group fixed top-20 left-4 z-50 flex items-center gap-2 rounded-full bg-white/90 backdrop-blur border border-[#D4AF37]/30 px-4 py-2.5 shadow-lg shadow-black/10 hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-[#D4AF37] group-hover:text-white transition-all duration-300 group-hover:translate-x-[-3px]"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
      <span className="text-sm text-gray-600 group-hover:text-white transition-all duration-300">
        بازگشت
      </span>
    </button>
  );
}
