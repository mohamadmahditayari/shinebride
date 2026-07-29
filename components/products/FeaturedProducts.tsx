import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { normalizeImageSrc } from "@/lib/image";

const fallbackCategories = [
  { name: "اسپند دود کن", image: "/images/esfand/esfand.jpg", slug: "esfand" },
  { name: "ست بله برون", image: "/images/baleh/baleh.jpg", slug: "baleh" },
  { name: "گیفت", image: "/images/gift/gift.jpg", slug: "gift" },
  { name: "گیفت ماشین", image: "/images/car/car.jpg", slug: "car" },
  { name: "پلکسی", image: "/images/plexi/plexi.jpg", slug: "plexi" },
  { name: "آباژور", image: "/images/abajour/abajour.jpg", slug: "abajour" },
];

function getFeaturedCategoryName(category: any) {
  const rawName = String(category.name || "").trim();
  if (category.slug === "esfand" || rawName === "اسفند" || rawName === "اسفند\n") return "اسپند دود کن";
  return rawName || category.slug || "دستهبندی";
}

function getCategoryImage(category: any) {
  if (category.image) return normalizeImageSrc(category.image);
  const slug = String(category.slug || category.link || category.name || "").trim().toLowerCase();
  if (!slug) return normalizeImageSrc("/images/logo.png");
  return normalizeImageSrc(`/images/${slug}/${slug}.jpg`);
}

export default async function FeaturedProducts() {
  const { data: categories } = await supabase.from("categories").select("*").order("name");

  const featuredCategories =
    categories && categories.length > 0
      ? categories.map((c) => ({
          name: getFeaturedCategoryName(c),
          image: getCategoryImage(c),
          slug: String(c.slug || c.link || c.name || "").trim(),
        }))
      : fallbackCategories;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20 md:pb-32">

      {/* Section header */}
      <div className="text-center mb-12 md:mb-20">
        <p className="text-xs tracking-[4px] uppercase text-[#D4AF37] mb-3">کالکشن ما</p>
        <h2 className="text-3xl md:text-5xl text-gray-800">محصولات ویژه</h2>
        <div className="flex items-center justify-center gap-3 mt-5">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="text-[#D4AF37]">✦</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {featuredCategories.map((item) => (
          <Link
            key={item.slug}
            href={`/products/${item.slug}`}
            className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
          >
            {/* Image */}
            <div className="relative w-full aspect-square md:aspect-[3/4] overflow-hidden">
              <Image
                src={normalizeImageSrc(item.image || "/images/logo.png")}
                alt={item.name}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Badge */}
              <div className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[10px] md:text-xs text-[#D4AF37] tracking-widest">
                ویژه
              </div>

              {/* Name on image (mobile) */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:hidden">
                <h3 className="text-white text-base font-semibold">{item.name}</h3>
                <p className="text-white/70 text-xs mt-0.5">مشاهده مدلها ←</p>
              </div>
            </div>

            {/* Card body (desktop) */}
            <div className="hidden md:block p-5 text-center border-t border-gray-50">
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#D4AF37] transition">{item.name}</h3>
              <p className="text-sm text-gray-400 mt-1">جدیدترین مدلهای اختصاصی</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-[#D4AF37] font-medium">
                مشاهده مدلها <span className="transition group-hover:translate-x-[-4px]">←</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
