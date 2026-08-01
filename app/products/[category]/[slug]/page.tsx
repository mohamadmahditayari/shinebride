import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import { normalizeImageArray, normalizeImageSrc } from "@/lib/image";
import AddToCart from "@/components/AddToCart";
import BackButton from "@/components/BackButton";

export const dynamic = "force-static";
export const dynamicParams = false;

const localProducts: Array<any> = [
  { id: 1, name: "اسپند دود کن اقتصادی", price: "1.550", cover: "/images/esfand/esfand.jpg", slug: "em", category: "esfand", description: "اسپند دود کن کلاسیک با طراحی شیک و مناسب برای هدیه" },
  { id: 2, name: "ست وی‌ای‌پی ترک", price: "5.580", cover: "/images/esfand/esfand.jpg", slug: "vip", category: "esfand", description: "ست لوکس و خاص برای مراسم و انتخاب‌های ویژه" },
  { id: 3, name: "ست استیل دو تکه", price: "1.980", cover: "/images/esfand/esfand.jpg", slug: "amjad", category: "esfand", description: "طرح ساده و شیک برای استفاده روزمره" },
  { id: 4, name: "ست بله برون کلاسیک", price: "3.200", cover: "/images/baleh/baleh.jpg", slug: "baleh-classic", category: "baleh", description: "تکمیل کننده‌ی زیبایی و هویت خاص" },
  { id: 5, name: "گیفت دسته‌دار", price: "1.250", cover: "/images/gift/gift.jpg", slug: "daste", category: "gift", description: "پک هدیه با طراحی خاص و مناسب برای مناسبت‌ها" },
  { id: 6, name: "گیفت موتور", price: "2.100", cover: "/images/gift/gift.jpg", slug: "motor", category: "gift", description: "هدیه ویژه با جزئیات ظریف" },
  { id: 7, name: "گیفت شاخی", price: "1.800", cover: "/images/gift/gift.jpg", slug: "shakhe", category: "gift", description: "تنوع بالا و طراحی امروزی" },
  { id: 8, name: "گیفت مینی", price: "950", cover: "/images/gift/gift.jpg", slug: "mini", category: "gift", description: "نسخه‌ی فشرده و جذاب برای هدیه‌های کوچک" },
  { id: 9, name: "گیفت ماشین", price: "1.500", cover: "/images/car/car.jpg", slug: "car-gift", category: "car", description: "هدیه‌ی مناسب برای ماشین و سفر" },
  { id: 10, name: "پلکسی لوکس", price: "2.700", cover: "/images/plexi/plexi.jpg", slug: "plexi-lux", category: "plexi", description: "پارچه و طراحی شاخص برای دکور و مناسبت" },
  { id: 11, name: "آباژور خاص", price: "3.600", cover: "/images/abajour/abajour.jpg", slug: "abajour-lux", category: "abajour", description: "آباژور شیک و خاص برای فضاهای خاص" },
];

export async function generateStaticParams() {
  return localProducts.map((product) => ({
    category: product.category,
    slug: product.slug,
  }));
}

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { category, slug } = await params;

  const product = localProducts.find((item) => item.category === category && item.slug === slug) || null;

  if (!product) notFound();

  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? normalizeImageArray(product.images)
      : product.cover
      ? [normalizeImageSrc(product.cover)]
      : ["/images/logo.png"];

  return (
    <main
      className="min-h-screen"
      style={{
        background: "linear-gradient(160deg,#fffdf9 0%,#faf6ee 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <ProductGallery images={images} alt={product.name} />

          <div className="flex flex-col justify-center">
            <p className="text-xs tracking-[3px] uppercase text-[#D4AF37] mb-4">
              {product.category}
            </p>

            <h1 className="text-3xl md:text-4xl text-gray-800">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-5">
              <div className="h-px w-8 bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs">✦</span>
            </div>

            <p className="text-2xl md:text-3xl text-[#D4AF37] font-bold mt-5">
              {product.price}
              <span className="text-base font-normal text-gray-400">
                {" "}تومان
              </span>
            </p>

            {product.description && (
              <p className="mt-6 leading-9 text-gray-500 text-sm whitespace-pre-line border-t border-gray-100 pt-6">
                {product.description}
              </p>
            )}

            <AddToCart
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                cover: images[0],
                category: product.category,
                slug: product.slug,
              }}
            />

            <div className="flex flex-col sm:flex-row gap-3 mt-3">
              <a
                href="https://instagram.com/shine._bride"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-full border border-[#D4AF37]/30 py-3.5 text-center text-sm text-[#D4AF37] hover:bg-[#D4AF37]/5 transition"
              >
                سفارش از اینستاگرام
              </a>

              <a
                href="https://wa.me/989011322245"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-full border border-emerald-500/30 py-3.5 text-center text-sm text-emerald-600 hover:bg-emerald-50 transition"
              >
                سفارش از واتساپ
              </a>
            </div>
          </div>
        </div>
      </div>

      <BackButton />
    </main>
  );
}