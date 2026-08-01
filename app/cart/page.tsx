"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { normalizeImageSrc } from "@/lib/image";
import OptimizedImage from "@/components/OptimizedImage";

export default function CartPage() {
  const { cart, removeFromCart, updateQty, clearCart, totalItems, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6" style={{ background: "linear-gradient(160deg,#fffdf9,#faf6ee)" }}>
        <div className="text-center">
          <div className="text-7xl mb-6">🛒</div>
          <h1 className="text-2xl text-gray-700 mb-3">سبد خرید خالی است</h1>
          <p className="text-gray-400 text-sm mb-8">هنوز محصولی اضافه نکردید</p>
          <Link
            href="/products"
            className="inline-flex rounded-full bg-gradient-to-r from-[#D4AF37] to-[#c9a227] px-8 py-3 text-sm text-white shadow-lg shadow-[#D4AF37]/30 hover:-translate-y-0.5 transition"
          >
            مشاهده محصولات
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 md:px-8 py-12 md:py-20" style={{ background: "linear-gradient(160deg,#fffdf9,#faf6ee)" }}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs tracking-[4px] uppercase text-[#D4AF37] mb-1">سبد خرید</p>
            <h1 className="text-3xl text-gray-800">{totalItems} محصول</h1>
          </div>
          <button onClick={clearCart} className="text-xs text-gray-400 hover:text-red-400 transition border border-gray-200 rounded-full px-4 py-2">
            پاک کردن همه
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Items */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
                <div className="relative h-20 w-20 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                  <OptimizedImage
                    src={normalizeImageSrc(item.cover || "/images/logo.png")}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">{item.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>
                  <p className="text-[#D4AF37] font-bold mt-1 text-sm">{item.price} تومان</p>

                  {/* Qty controls */}
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      className="h-7 w-7 rounded-full border border-gray-200 text-gray-500 hover:border-[#D4AF37] hover:text-[#D4AF37] transition text-sm flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="text-sm w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="h-7 w-7 rounded-full border border-gray-200 text-gray-500 hover:border-[#D4AF37] hover:text-[#D4AF37] transition text-sm flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="self-start text-gray-300 hover:text-red-400 transition p-1"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 h-fit sticky top-24">
            <h2 className="text-lg text-gray-800 mb-6">خلاصه سفارش</h2>

            <div className="space-y-3 text-sm text-gray-500 border-b border-gray-100 pb-4 mb-4">
              <div className="flex justify-between">
                <span>تعداد محصولات</span>
                <span className="text-gray-700">{totalItems} عدد</span>
              </div>
              <div className="flex justify-between">
                <span>هزینه ارسال</span>
                <span className="text-gray-700">پس کرایه</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-gray-800 mb-6">
              <span>جمع کل</span>
              <input
                type="text"
                placeholder="وارد کنید..."
                className="border-b border-[#D4AF37] bg-transparent text-left text-[#D4AF37] font-bold outline-none placeholder-gray-300 w-32 text-sm text-center"
              />
            </div>

            <p className="text-xs text-gray-500 font-bold leading-6 mb-4 border border-[#D4AF37]/20 rounded-xl p-3 bg-[#D4AF37]/5">
              <span className="text-red-500 font-bold">⚠️ توجه توجه</span><br/>
              مشتری عزیز لطفاً طبق ایتم های مد نظرتون جمع کل حساب را محاسبه کنید و در فیلد جمع کل بنویسید یا در دایرکت ثبت کنید
            </p>
            <a
              href="https://instagram.com/shine._bride"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#c9a227] py-3.5 text-center text-sm text-white shadow-lg shadow-[#D4AF37]/30 hover:-translate-y-0.5 transition"
            >
              ثبت سفارش از اینستاگرام
            </a>

            <a
              href="https://wa.me/989011322245"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 block w-full rounded-full bg-gradient-to-r from-emerald-600 to-green-500 py-3.5 text-center text-sm text-white shadow-lg shadow-green-500/20 hover:-translate-y-0.5 transition"
            >
              ثبت سفارش از واتساپ
            </a>

            <Link
              href="/products"
              className="mt-3 block w-full rounded-full border border-[#D4AF37]/30 py-3.5 text-center text-sm text-[#D4AF37] hover:bg-[#D4AF37]/5 transition"
            >
              ادامه خرید
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
