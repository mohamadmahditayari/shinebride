"use client";

export default function CartPage() {
  return (
    <main className="min-h-screen bg-pink-50 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-10 text-center">

        <h1 className="text-4xl font-bold text-pink-500 mb-6">
          🛒 سبد خرید
        </h1>

        <p className="text-gray-600 text-lg">
          هنوز محصولی به سبد خرید اضافه نشده است.
        </p>

      </div>
    </main>
  );
}