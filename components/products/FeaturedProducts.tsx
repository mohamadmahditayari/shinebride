import Link from "next/link";
import { normalizeImageSrc } from "@/lib/image";
import OptimizedImage from "@/components/OptimizedImage";
import { getCategories, fallbackCategories } from "@/lib/products";

function getFeaturedCategoryName(category: any) {
  const rawName = String(category.name || "").trim();
  if (category.slug === "esfand" || rawName === "اسفند" || rawName === "اسفند\n") return "اسپند دود کن";
  return rawName || category.slug || "دستهبندی";
}

function getCategoryImage(category: any) {
  if (category.image) return normalizeImageSrc(category.image);
  const slug = String(category.slug || category.link || category.name || "").trim().toLowerCase();
  if (!slug) return normalizeImageSrc("/images/logo.png");
  
  // Known category images - direct mapping for reliability
  const categoryImages: Record<string, string> = {
    esfand: "/images/esfand/esfand.jpg",
    baleh: "/images/baleh/baleh.jpg",
    gift: "/images/gift/gift.jpg",
    car: "/images/car/car.jpg",
    plexi: "/images/plexi/plexi.jpg",
    abajour: "/images/abajour/abajour.jpg",
  };
  
  // Return known image path or fallback
  return normalizeImageSrc(categoryImages[slug] || `/images/${slug}/${slug}.jpg`);
}

export default async function FeaturedProducts() {
  const featuredCategories = await getCategories();

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
              <OptimizedImage
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
