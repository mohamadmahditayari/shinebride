import Image from "next/image";
import Link from "next/link";
const products = [
  {
    id: 1,
    title: "اسپند دودکن",
    image: "/images/esfand.jpg",
    link: "/products/esfand",
  },
  {
    id: 2,
    title: "ست بله برون",
    image: "/images/baleh.jpg",
    link: "#",
  },
  {
    id: 3,
    title: "گیفت",
    image: "/images/gift.jpg",
    link: "#",
  },
  {
    id: 4,
    title: "گیفت ماشین",
    image: "/images/car.jpg",
    link: "#",
  },
  {
    id: 5,
    title: "پلکسی",
    image: "/images/plexi.jpg",
    link: "#",
  },
  {
    id: 6,
    title: "آباژور",
    image: "/images/abajour.jpg",
    link: "#",
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-16">
      <h1 className="mb-4 text-center text-5xl font-bold text-pink-400">
        محصولات ShineBride
      </h1>

      <p className="mb-12 text-center text-gray-500">
        مجموعه‌ای از خاص‌ترین اکسسوری‌های عروس
      </p>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={1200}
              height={1200}
              className="aspect-square w-full object-cover"
            />

            <div className="p-6">
              <h2 className="text-center text-2xl font-bold text-gray-800">
                {item.title}
              </h2>

              <Link href={item.link}>
                <button className="mt-6 w-full rounded-full bg-black py-3 text-white transition hover:bg-pink-400">
                  مشاهده محصول
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}