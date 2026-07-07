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

export default function Home() {
  return (
    <main
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg,#ffffff,#faf8f5)",
        fontFamily: "Doran",
      }}
    >
      {/* HERO */}

      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">

        <div className="text-center">

          <Image
            src="/images/logo.png"
            alt="ShineBride"
            width={120}
            height={120}
            className="mx-auto rounded-full shadow-xl"
          />

          <h1
            className="mt-8 text-7xl tracking-[16px]"
            style={{
              color: "#D4AF37",
              fontWeight: 300,
            }}
          >
            SHINE
          </h1>

          <h2
            className="text-7xl tracking-[16px]"
            style={{
              color: "#BFC2C7",
              fontWeight: 300,
            }}
          >
            BRIDE
          </h2>

          <div className="w-40 h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#C0C0C0] mx-auto mt-8 rounded-full" />

          <p className="mt-8 text-gray-500 tracking-[4px] uppercase">
            Luxury Wedding Accessories
          </p>

          <div className="max-w-2xl mx-auto mt-8 space-y-4 text-right text-lg leading-9 text-gray-700">


</div>

          <Link href="/products">
            <button
              className="mt-12 px-10 py-4 rounded-full text-white transition hover:scale-105"
              style={{
                background:
                  "linear-gradient(90deg,#D4AF37,#E8D18A,#C0C0C0)",
              }}
            >
              مشاهده محصولات
            </button>
          </Link>

        </div>

      </section>

      {/* PRODUCTS */}

      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="text-center mb-16">

          <h2
            className="text-5xl"
            style={{
              color: "#D4AF37",
            }}
          >
            محصولات ویژه
          </h2>
<div className="mt-6 space-y-3 text-center text-lg leading-9 text-gray-700">

</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {products.map((item) => (

            <div
              key={item.id}
              className="group rounded-3xl overflow-hidden bg-white transition-all duration-500 hover:-translate-y-3"
              style={{
                border: "1px solid rgba(212,175,55,.15)",
                boxShadow: "0 15px 40px rgba(0,0,0,.08)",
              }}
            >

              <div className="overflow-hidden">

                <Image
                  src={item.image}
                  alt={item.title}
                  width={700}
                  height={500}
                  className="w-full h-80 object-cover transition duration-700 group-hover:scale-110"
                />

              </div>

              <div className="p-7 text-center">

                <h3 className="text-2xl font-semibold text-gray-800">
                  {item.title}
                </h3>

                

                <Link href={item.link}>

                  <button
                    className="w-full mt-7 py-3 rounded-full text-white transition hover:scale-[1.03]"
                    style={{
                      background:
                        "linear-gradient(90deg,#D4AF37,#C0C0C0)",
                    }}
                  >
                    مشاهده محصول
                  </button>

                </Link>

              </div>

            </div>

          ))}

        </div>

      </section>

    </main>
  );
}