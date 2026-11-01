"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { normalizeImageSrc } from "@/lib/image";
import OptimizedImage from "@/components/OptimizedImage";

export default function CartPage() {
  const { cart, removeFromCart, updateQty, clearCart, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <main className="yalda-page-shell flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <div className="mb-6 text-7xl">🛒</div>
          <h1 className="mb-3 text-2xl text-[#3d1c22]">سبد خرید خالی است</h1>
          <p className="mb-8 text-sm text-[#3d1c22]">هنوز محصولی اضافه نکردید</p>
          <Link
            href="/products"
            className="inline-flex rounded-full bg-gradient-to-r from-[#7d1d2a] to-[#ad2e3f] px-8 py-3 text-sm text-white shadow-lg shadow-[#7d1d2a]/30 transition hover:-translate-y-0.5"
          >
            مشاهده محصولات
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="yalda-page-shell min-h-screen px-4 py-12 md:px-8 md:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="mb-1 text-xs uppercase tracking-[4px] text-[#7d1d2a]">سبد خرید</p>
            <h1 className="text-3xl text-[#3d1c22]">{totalItems} محصول</h1>
          </div>
          <button onClick={clearCart} className="rounded-full border border-gray-200 px-4 py-2 text-xs text-gray-400 transition hover:text-red-400">
            پاک کردن همه
          </button>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4 md:col-span-2">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 rounded-2xl border border-gray-50 bg-white p-4 shadow-sm">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                  <OptimizedImage
                    src={normalizeImageSrc(item.cover || "/images/logo.png")}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-[#3d1c22]">{item.name}</p>
                  <p className="mt-0.5 text-xs text-[#3d1c22]">{item.category}</p>
                  <p className="mt-1 text-sm font-bold text-[#7d1d2a]">{item.price} تومان</p>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-sm text-gray-500 transition hover:border-[#7d1d2a] hover:text-[#7d1d2a]"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-sm text-gray-500 transition hover:border-[#7d1d2a] hover:text-[#7d1d2a]"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button onClick={() => removeFromCart(item.id)} className="self-start p-1 text-gray-300 transition hover:text-red-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="sticky top-24 h-fit rounded-2xl border border-gray-50 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg text-[#3d1c22]">خلاصه سفارش</h2>

            <div className="mb-4 space-y-3 border-b border-gray-100 pb-4 text-sm text-[#3d1c22]">
              <div className="flex justify-between">
                <span>تعداد محصولات</span>
                <span className="text-[#3d1c22]">{totalItems} عدد</span>
              </div>
              <div className="flex justify-between">
                <span>هزینه ارسال</span>
                <span className="text-[#3d1c22]">پس کرایه</span>
              </div>
            </div>

            <div className="mb-6 flex justify-between font-bold text-[#3d1c22]">
              <span>جمع کل</span>
              <input
                type="text"
                placeholder="وارد کنید..."
                className="w-32 border-b border-[#7d1d2a] bg-transparent text-center text-sm font-bold text-[#7d1d2a] outline-none placeholder-gray-300"
              />
            </div>

            <a
              href="https://wa.me/989011322245"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 block w-full rounded-full bg-gradient-to-r from-emerald-600 to-green-500 py-3.5 text-center text-sm text-white shadow-lg shadow-green-500/20 transition hover:-translate-y-0.5"
            >
              ثبت سفارش از واتساپ
            </a>

            <Link
              href="/products"
              className="mt-3 block w-full rounded-full border border-[#7d1d2a]/30 py-3.5 text-center text-sm text-[#7d1d2a] transition hover:bg-[#7d1d2a]/5"
            >
              ادامه خرید
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
