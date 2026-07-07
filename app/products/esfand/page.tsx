import Link from "next/link";
import Image from "next/image";

const esfand = [
  {
    id: "amjad",
    name: "اسپند دودکن فلزی دوتکه",
    price: "1.980",
    cover: "/images/esfand/amjad/1.jpg",
  },
  {
    id: "aroos",
    name: "عروس پری",
    price: "3.300",
    cover: "/images/esfand/aroos/1.jpg",
  },
  {
    id: "em",
    name: "اسپند دود کن اقتصادی",
    price: "1.550",
    cover: "/images/esfand/em/1.jpg",
  },
  {
    id: "fm",
    name: "اسپند دود کن فلزی",
    price: "1.850",
    cover: "/images/esfand/fm/1.jpg",
  },
  {
    id: "ros",
    name: "اسپند دود کن رز",
    price: "3.800",
    cover: "/images/esfand/ros/1.jpg",
  },
  {
    id: "setk",
    name: "ست اسپند دود کن",
    price: "3.950",
    cover: "/images/esfand/setk/1.jpg",
  },
  {
    id: "set-talaii",
    name: "اسپند دود کن ترک",
    price: "4.200",
    cover: "/images/esfand/set-talaii/1.jpg",
  },
  {
    id: "vip",
    name: "اسپند دود کن ترک vip",
    price: "5.550",
    cover: "/images/esfand/vip/1.jpg",
  },
  {
    id: "km",
    name: "اسپند دود کن کریستالی",
    price: "2.100",
    cover: "/images/esfand/km/1.jpg",
  },
];

export default function EsfandPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">

      <h1 className="text-5xl font-bold text-center text-[#D4AF37] mb-4">
        اسپند دودکن
      </h1>

      <p className="text-center text-gray-500 mb-14">
        تمامی مدل‌های اسپند دودکن ShineBride
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        {esfand.map((item) => (
          <Link
            key={item.id}
            href={`/products/esfand/${item.id}`}
            className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 transition"
          >

            <Image
              src={item.cover}
              alt={item.name}
              width={600}
              height={600}
              className="w-full h-80 object-cover group-hover:scale-105 transition duration-500"
            />

            <div className="p-6">

              <h2 className="text-2xl font-bold text-gray-800">
                {item.name}
              </h2>

              <p className="mt-3 text-[#D4AF37] font-bold text-xl">
                {item.price} میلیون تومان
              </p>

              <button className="mt-6 w-full rounded-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#C0C0C0] text-white">
                مشاهده محصول
              </button>

            </div>

          </Link>
        ))}

      </div>

    </main>
  );
}