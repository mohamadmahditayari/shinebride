import AnimatedProductGrid from "@/components/AnimatedProductGrid";
import BackButton from "@/components/BackButton";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return ["esfand", "baleh", "gift", "car", "plexi", "abajour"].map((category) => ({ category }));
}

const localProductsByCategory: Record<string, Array<any>> = {
  esfand: [
    { id: 1, name: "اسپند دود کن اقتصادی", price: "1.550", cover: "/images/esfand/esfand.jpg", slug: "em", description: "اسپند دود کن کلاسیک با طراحی شیک و مناسب برای هدیه", images: ["/images/esfand/em/1.jpg"] },
    { id: 2, name: "ست وی‌ای‌پی ترک", price: "5.580", cover: "/images/esfand/vip/1.jpg", slug: "vip", description: "ست لوکس و خاص برای مراسم و انتخاب‌های ویژه", images: ["/images/esfand/vip/1.jpg", "/images/esfand/vip/2.jpg", "/images/esfand/vip/3.jpg"] },
    { id: 3, name: "ست استیل دو تکه", price: "1.980", cover: "/images/esfand/amjad/1.jpg", slug: "amjad", description: "طرح ساده و شیک برای استفاده روزمره", images: ["/images/esfand/amjad/1.jpg", "/images/esfand/amjad/2.jpg"] },
  ],
  baleh: [
    { id: 4, name: "ست بله برون کلاسیک", price: "3.200", cover: "/images/baleh/darbay/1.jpg", slug: "baleh-classic", description: "تکمیل کننده‌ی زیبایی و هویت خاص", images: ["/images/baleh/darbay/1.jpg"] },
  ],
  gift: [
    { id: 5, name: "گیفت دسته‌دار", price: "1.250", cover: "/images/gift/daste/1.jpeg", slug: "daste", description: "پک هدیه با طراحی خاص و مناسب برای مناسبت‌ها", images: ["/images/gift/daste/1.jpeg"] },
    { id: 6, name: "گیفت موتور", price: "2.100", cover: "/images/gift/motor/1.jpeg", slug: "motor", description: "هدیه ویژه با جزئیات ظریف", images: ["/images/gift/motor/1.jpeg"] },
    { id: 7, name: "گیفت شاخی", price: "1.800", cover: "/images/gift/shakhe/1.jpeg", slug: "shakhe", description: "تنوع بالا و طراحی امروزی", images: ["/images/gift/shakhe/1.jpeg"] },
    { id: 8, name: "گیفت مینی", price: "950", cover: "/images/gift/mini/1.jpg", slug: "mini", description: "نسخه‌ی فشرده و جذاب برای هدیه‌های کوچک", images: ["/images/gift/mini/1.jpg"] },
  ],
  car: [
    { id: 9, name: "گیفت ماشین", price: "1.500", cover: "/images/car/car.jpg", slug: "car-gift", description: "هدیه‌ی مناسب برای ماشین و سفر", images: ["/images/car/car.jpg"] },
  ],
  plexi: [
    { id: 10, name: "پلکسی لوکس", price: "2.700", cover: "/images/plexi/plexi.jpg", slug: "plexi-lux", description: "پارچه و طراحی شاخص برای دکور و مناسبت", images: ["/images/plexi/plexi.jpg"] },
  ],
  abajour: [
    { id: 11, name: "آباژور خاص", price: "3.600", cover: "/images/abajour/abajour.jpg", slug: "abajour-lux", description: "آباژور شیک و خاص برای فضاهای خاص", images: ["/images/abajour/abajour.jpg"] },
  ],
};

const categoryTitles: Record<string, string> = {
  esfand: "اسپند دود کن",
  baleh: "ست بله برون",
  gift: "گیفت",
  car: "گیفت ماشین",
  plexi: "پلکسی",
  abajour: "آباژور",
};

type Props = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const products = localProductsByCategory[category] || [];

  const title = categoryTitles[category] || category;

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(160deg,#fffdf9 0%,#faf6ee 100%)" }}>
      <div className="relative overflow-hidden py-16 md:py-20 text-center px-6">
        <p className="text-xs tracking-[5px] uppercase text-[#D4AF37] mb-3">کالکشن ShineBride</p>
        <h1 className="text-3xl md:text-5xl text-gray-800">{title}</h1>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="h-px w-10 bg-[#D4AF37]" />
          <span className="text-[#D4AF37]">✦</span>
          <div className="h-px w-10 bg-[#D4AF37]" />
        </div>
        <p className="mt-3 text-sm text-gray-400">{products?.length ?? 0} مدل اختصاصی</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        {!products || products.length === 0 ? (
          <div className="text-center py-24 text-gray-400">هیچ محصولی پیدا نشد.</div>
        ) : (
          <AnimatedProductGrid products={products} category={category} />
        )}
      </div>
      <BackButton />
    </main>
  );
}