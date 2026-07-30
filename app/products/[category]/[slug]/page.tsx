import { notFound } from "next/navigation";
import { supabaseLite } from "@/lib/supabase-lite";
import ProductGallery from "@/components/ProductGallery";
import { normalizeImageArray, normalizeImageSrc } from "@/lib/image";
import AddToCart from "@/components/AddToCart";
import BackButton from "@/components/BackButton";

// ISR: revalidate every hour
export const revalidate = 3600;

const knownCategories = ["esfand", "baleh", "gift", "car", "plexi", "abajour"];

export async function generateStaticParams() {
  const params: { category: string; slug: string }[] = [];

  for (const category of knownCategories) {
    const products = await supabaseLite.selectAll(
      "products",
      { category },
      "created_at",
      false
    );

    for (const p of products) {
      if (p.slug) {
        params.push({
          category,
          slug: String(p.slug),
        });
      }
    }
  }

  return params;
}

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { category, slug } = await params;

  const product = await supabaseLite.selectOne("products", {
    category,
    slug,
  });

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