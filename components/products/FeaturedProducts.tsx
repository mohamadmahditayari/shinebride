import Link from "next/link";
import { normalizeImageSrc } from "@/lib/image";
import OptimizedImage from "@/components/OptimizedImage";
import { getCategories } from "@/lib/products";

function getCategoryImage(category: any) {
  const slug = String(category.slug || category.link || category.name || "").trim().toLowerCase();

  const categoryImages: Record<string, string> = {
    esfand: "/images/esfand/esfand.jpg",
    baleh: "/images/baleh/baleh.jpg",
    gift: "/images/gift/gift.jpg",
    car: "/images/car/car.jpg",
    plexi: "/images/plexi/plexi.jpg",
    abajour: "/images/abajour/abajour.jpg",
  };

  if (category.image) {
    const normalized = normalizeImageSrc(category.image);
    if (normalized && !normalized.includes("logo.png")) {
      return normalized;
    }
  }

  return normalizeImageSrc(categoryImages[slug] || `/images/${slug}/${slug}.jpg`);
}

export default async function FeaturedProducts() {
  const featuredCategories = await getCategories();

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8 md:pb-32">
      <div className="mb-12 text-center md:mb-20">
        <p className="mb-3 text-xs uppercase tracking-[4px] text-[#7d1d2a]">کالکشن ما</p>
        <h2 className="text-3xl text-[#3d1c22] md:text-5xl">محصولات ویژه</h2>
        <div className="mt-5 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#7d1d2a]" />
          <span className="text-[#e5bb6d]">✦</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#7d1d2a]" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
        {featuredCategories.map((item) => (
          <Link
            key={item.slug}
            href={`/products/${item.slug}`}
            className="group relative overflow-hidden rounded-2xl bg-[#fffaf7]/90 shadow-[0_12px_28px_rgba(35,10,17,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl md:rounded-3xl"
          >
            <div className="relative aspect-square w-full overflow-hidden md:aspect-[3/4]">
              <OptimizedImage
                src={getCategoryImage(item)}
                alt={item.name}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] tracking-widest text-[#7d1d2a] backdrop-blur md:text-xs">
                ویژه
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 md:hidden">
                <h3 className="text-base font-semibold text-white">{item.name}</h3>
                <p className="mt-0.5 text-xs text-white/70">مشاهده مدلها ←</p>
              </div>
            </div>

            <div className="hidden border-t border-gray-50 p-5 text-center md:block">
              <h3 className="text-xl font-semibold text-[#3d1c22] transition group-hover:text-[#7d1d2a]">{item.name}</h3>
              <p className="mt-1 text-sm text-[#3d1c22]">جدیدترین مدلهای اختصاصی</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#7d1d2a]">
                مشاهده مدلها <span className="transition group-hover:translate-x-[-4px]">←</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
