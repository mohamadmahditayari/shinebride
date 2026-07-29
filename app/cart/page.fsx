import Link from "next/link";

export default function CartPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-16">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold text-center text-pink-400 mb-12">
          سبد خرید
        </h1>

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <div className="flex justify-between items-center border-b pb-6">

            <div>
              <h2 className="text-2xl font-bold">
                اسپند دودکن
              </h2>

              <p className="text-gray-500 mt-2">
                تعداد: ۱
              </p>
            </div>

            <p className="text-2xl font-bold text-pink-500">
              ۲٬۱۰۰٬۰۰۰ تومان
            </p>

          </div>

          <div className="flex justify-between items-center mt-10">

            <h3 className="text-3xl font-bold">
              جمع کل
            </h3>

            <p className="text-3xl font-bold text-green-600">
              ۲٬۱۰۰٬۰۰۰ تومان
            </p>

          </div>

          <button className="w-full mt-10 bg-black text-white py-5 rounded-2xl text-xl hover:bg-pink-400 transition">
            ادامه فرایند خرید
          </button>

          <Link
            href="/products"
            className="block text-center mt-6 text-pink-500 hover:underline"
          >
            بازگشت به محصولات
          </Link>

        </div>

      </div>

    </main>
  );
}