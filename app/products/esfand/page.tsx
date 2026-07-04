import Image from "next/image";
import Link from "next/link";

export default function EsfandPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5]">

      <div className="max-w-6xl mx-auto px-6 py-16">

        <Link
          href="/products"
          className="text-pink-500 hover:underline"
        >
          ← بازگشت به محصولات
        </Link>

        <div className="grid md:grid-cols-2 gap-12 mt-8">

          <Image
            src="/images/esfand.jpg"
            alt="اسپند دودکن"
            width={700}
            height={700}
            className="rounded-3xl shadow-xl w-full"
          />

          <div className="flex flex-col justify-center">

            <h1 className="text-5xl font-bold mb-6">
              اسپند دودکن
            </h1>

            <p className="text-2xl text-pink-500 font-bold mb-6">
              قیمت: تماس بگیرید
            </p>

            <p className="text-gray-600 leading-8">
              اسپند دودکن‌های ShineBride با طراحی اختصاصی،
              مناسب مراسم عقد، عروسی، بله‌برون و جهیزیه هستند.
              امکان سفارش در رنگ‌های مختلف نیز وجود دارد.
            </p>

            <button className="mt-10 bg-green-600 text-white px-8 py-4 rounded-full text-lg hover:bg-green-700 transition">
              سفارش در واتساپ
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}