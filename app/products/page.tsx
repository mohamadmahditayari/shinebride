import Link from "next/link";
import { normalizeImageSrc } from "@/lib/image";
import BackButton from "@/components/BackButton";
import { getCategories } from "@/lib/products";

export default async function ProductsPage() {
  const categories = await getCategories();

  const getCategoryImage = (cat: any) => normalizeImageSrc(cat.image || `/images/${cat.slug}/${cat.slug}.jpg`);

  const getCategoryName = (cat: any) => cat.name || "دستهبندی";

  return (
    <main className="yalda-page-shell min-h-screen">
      <div className="relative overflow-hidden px-6 py-16 text-center md:py-24">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[#7d1d2a]/10 blur-3xl" />
        <p className="mb-4 text-xs uppercase tracking-[5px] text-[#7d1d2a]">کالکشن ShineBride</p>
        <h1 className="text-4xl text-[#3d1c22] md:text-6xl">دسته بندی محصولات</h1>
        <div className="mt-5 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#7d1d2a]" />
          <span className="text-[#e5bb6d]">✦</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#7d1d2a]" />
        </div>
        <p className="mt-5 text-sm text-[#3d1c22]">دسته بندی مورد نظر خود را انتخاب کنید</p>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products/${String(cat.slug || cat.name || "").trim()}`}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl md:rounded-3xl"
            >
              <div className="relative aspect-square w-full overflow-hidden md:aspect-[3/4]">
                <img
                  src={getCategoryImage(cat)}
                  alt={cat.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] tracking-widest text-[#7d1d2a] backdrop-blur md:text-xs">
                  ویژه
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 md:hidden">
                  <h2 className="text-base font-semibold text-white">{getCategoryName(cat)}</h2>
                  <p className="mt-0.5 text-xs text-white/70">مشاهده مدلها ←</p>
                </div>
              </div>

              <div className="hidden border-t border-gray-50 p-5 text-center md:block">
                <h2 className="text-xl font-semibold text-[#3d1c22] transition group-hover:text-[#7d1d2a]">{getCategoryName(cat)}</h2>
                <p className="mt-1 text-sm text-[#3d1c22]">محصولات اختصاصی این دسته</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#7d1d2a]">
                  مشاهده مدلها <span className="transition group-hover:-translate-x-1">←</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <BackButton />
    </main>
  );
}