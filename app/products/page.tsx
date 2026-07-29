import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { normalizeImageSrc } from "@/lib/image";
import BackButton from "@/components/BackButton";

export default async function ProductsPage() {
  const { data: categories } = await supabase.from("categories").select("*").order("name");

  const getCategoryImage = (cat: any) => {
    if (cat.image) return normalizeImageSrc(cat.image);
    const slug = String(cat.slug || cat.link || cat.name || "").trim().toLowerCase();
    return slug ? normalizeImageSrc(`/images/${slug}/${slug}.jpg`) : "/images/logo.png";
  };

  const getCategoryName = (cat: any) => {
    const rawName = String(cat.name || "").replace(/\s+/g, " ").trim();
    if (String(cat.slug || cat.link || "").trim() === "esfand" || rawName.startsWith("اسفند")) return "اسپند دود کن";
    return rawName || "دستهبندی";
  };

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(160deg,#fffdf9 0%,#faf6ee 60%,#f5f0e8 100%)" }}>

      {/* Header */}
      <div className="relative overflow-hidden py-16 md:py-24 text-center px-6">
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[300px] w-[600px] rounded-full bg-[#D4AF37]/8 blur-3xl" />
        <p className="text-xs tracking-[5px] uppercase text-[#D4AF37] mb-4">کالکشن ShineBride</p>
        <h1 className="text-4xl md:text-6xl text-gray-800">دسته بندی محصولات</h1>
        <div className="flex items-center justify-center gap-3 mt-5">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="text-[#D4AF37]">✦</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>
        <p className="mt-5 text-sm text-gray-400">دسته بندی مورد نظر خود را انتخاب کنید</p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories?.map((cat) => (
            <Link
              key={cat.id}
              href={`/products/${String(cat.link || cat.slug || cat.name || "").trim()}`}
              className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="relative w-full aspect-square md:aspect-[3/4] overflow-hidden">
                <Image
                  src={getCategoryImage(cat)}
                  alt={cat.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                <div className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[10px] md:text-xs text-[#D4AF37] tracking-widest">
                  ویژه
                </div>

                {/* Mobile: name on image */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:hidden">
                  <h2 className="text-white text-base font-semibold">{getCategoryName(cat)}</h2>
                  <p className="text-white/60 text-xs mt-0.5">مشاهده مدلها ←</p>
                </div>
              </div>

              {/* Desktop card body */}
              <div className="hidden md:block p-5 text-center border-t border-gray-50">
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-[#D4AF37] transition">{getCategoryName(cat)}</h2>
                <p className="text-sm text-gray-400 mt-1">محصولات اختصاصی این دسته</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-[#D4AF37] font-medium">
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
