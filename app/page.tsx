import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf8f5]">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-6xl md:text-8xl font-bold tracking-wide text-pink-400">
          ShineBride
        </h1>

        <p className="mt-6 text-xl text-gray-700">
          اکسسوری لوکس عروس
        </p>

        <p className="mt-3 text-gray-500 max-w-xl">
          خاص‌ترین اکسسوری‌های عروس، ست بله‌برون، گیفت، پلکسی،
          آباژور و اسپند دودکن را با عشق انتخاب کنید.
        </p>

        <div className="mt-10 flex gap-4">
          <Link href="/products">
            <button className="bg-black text-white px-8 py-4 rounded-full hover:scale-105 transition">
              مشاهده محصولات
            </button>
          </Link>

          <button className="border border-black px-8 py-4 rounded-full hover:bg-black hover:text-white transition">
            درباره ما
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          دسته‌بندی محصولات
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

          <Link href="/products">
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 transition cursor-pointer">
              <Image
                src="/images/esfand.jpg"
                alt="اسپند دودکن"
                width={500}
                height={350}
                className="w-full h-48 object-cover"
              />
              <h3 className="p-5 text-xl font-semibold text-center">
                اسپند دودکن
              </h3>
            </div>
          </Link>

          <Link href="/products">
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 transition cursor-pointer">
              <Image
                src="/images/baleh.jpg"
                alt="ست بله برون"
                width={500}
                height={350}
                className="w-full h-48 object-cover"
              />
              <h3 className="p-5 text-xl font-semibold text-center">
                ست بله برون
              </h3>
            </div>
          </Link>

          <Link href="/products">
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 transition cursor-pointer">
              <Image
                src="/images/gift.jpg"
                alt="گیفت"
                width={500}
                height={350}
                className="w-full h-48 object-cover"
              />
              <h3 className="p-5 text-xl font-semibold text-center">
                گیفت
              </h3>
            </div>
          </Link>

          <Link href="/products">
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 transition cursor-pointer">
              <Image
                src="/images/car.jpg"
                alt="گیفت ماشین"
                width={500}
                height={350}
                className="w-full h-48 object-cover"
              />
              <h3 className="p-5 text-xl font-semibold text-center">
                گیفت ماشین
              </h3>
            </div>
          </Link>

          <Link href="/products">
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 transition cursor-pointer">
              <Image
                src="/images/plexi.jpg"
                alt="پلکسی"
                width={500}
                height={350}
                className="w-full h-48 object-cover"
              />
              <h3 className="p-5 text-xl font-semibold text-center">
                پلکسی
              </h3>
            </div>
          </Link>

          <Link href="/products">
            <div className="bg-white rounded-3xlshadow-lg overflow-hidden hover:-translate-y-2 transition cursor-pointer">
              <Image
                src="/images/abajour.jpg"
                alt="آباژور"
                width={500}
                height={350}
                className="w-full h-48 object-cover"
              />
              <h3 className="p-5 text-xl font-semibold text-center">
                آباژور
              </h3>
            </div>
          </Link>

        </div>
      </section>
    </main>
  );
}