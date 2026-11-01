"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="group fixed left-4 top-20 z-50 flex items-center gap-2 rounded-full border border-[#7d1d2a]/30 bg-[#fff6f3]/90 px-4 py-2.5 shadow-lg shadow-black/10 backdrop-blur transition-all duration-300 hover:border-[#7d1d2a] hover:bg-[#7d1d2a]"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-[#7d1d2a] transition-all duration-300 group-hover:translate-x-[-3px] group-hover:text-white"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
      <span className="text-sm text-[#2f171d] transition-all duration-300 group-hover:text-white">
        بازگشت
      </span>
    </button>
  );
}
