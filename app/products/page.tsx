import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    title: "اسپند دودکن",
    price: "۲٬۱۰۰٬۰۰۰ تومان",
    image: "/images/esfand.jpg",
    link: "/products/esfand",
  },
  {
    id: 2,
    title: "ست بله برون",
    price: "به زودی",
    image: "/images/baleh.jpg",
    link: "#",
  },
  {
    id: 3,
    title: "گیفت",
    price: "به زودی",
    image: "/images/gift.jpg",
    link: "#",
  },
  {
    id: 4,
    title: "گیفت ماشین",
    price: "به زودی",
    image: "/images/car.jpg",
    link: "#",
  },
  {
    id: 5,
    title: "پلکسی",
    price: "به زودی",
    image: "/images/plexi.jpg",
    link: "#",
  },
  {
    id: 6,
    title: "آباژور",
    price: "به زودی",
    image: "/images/abajour.jpg",
    link: "#",
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-16">

      <h1 className="text-5xl font-bold text-center text-pink-400 mb-4">
        محصولات ShineBride
      </h1>

      <p className="text-center text-gray-500 mb-12">
        مجموعه‌ای از خاص‌ترین اکسسوری‌های عروس
      </p>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {products.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300"
          >

            <Image
              src={item.image}
              alt={item.title}
              width={600}
              height={500}
              className="w-full h-72 object-cover"
            />

            <div className="p-6">

              <h2 className="text-2xl font-bold">
                {item.title}
              </h2>

              <p className="mt-3 text-pink-500 text-xl font-bold">
                {item.price}
              </p>

              <Link href={item.link}>
                <button className="mt-6 w-full bg-black text-white py-3 rounded-full hover:bg-pink-400 transition">
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