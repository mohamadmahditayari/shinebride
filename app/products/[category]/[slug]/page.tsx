import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import { normalizeImageArray, normalizeImageSrc } from "@/lib/image";
import AddToCart from "@/components/AddToCart";
import BackButton from "@/components/BackButton";
import { getProductBySlug, fallbackProducts } from "@/lib/products";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const { supabase } = await import("@/lib/supabase");

    const { data: products } = await supabase
      .from("products")
      .select("category, slug")
      .order("created_at");

    if (products && products.length > 0) {
      return products.map((product) => ({
        category: product.category,
        slug: product.slug,
      }));
    }
  } catch (error) {
    console.log("Supabase params error:", error);
  }

  return fallbackProducts.map((product) => ({
    category: product.category,
    slug: product.slug,
  }));
}

type Props = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { category, slug } = await params;

  const product = await getProductBySlug(category, slug);

  if (!product) {
    notFound();
  }

  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? normalizeImageArray(product.images)
      : product.cover
      ? [normalizeImageSrc(product.cover)]
      : ["/images/logo.png"];

  return (
    <main className="yalda-page-shell min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <ProductGallery images={images} alt={product.name} />

          <div className="flex flex-col justify-center">
            <p className="mb-4 text-xs uppercase tracking-[3px] text-[#7d1d2a]">{product.category}</p>

            <h1 className="text-3xl font-black text-[#0d0d0d] md:text-4xl">{product.name}</h1>

            <div className="mt-5 flex items-center gap-3">
              <div className="h-px w-8 bg-[#7d1d2a]" />
              <span className="text-xs text-[#e5bb6d]">✦</span>
            </div>

            <p className="mt-5 text-2xl font-bold text-[#7d1d2a] md:text-3xl">
              {product.price}
              <span className="text-base font-normal text-[#6d3b42]"> تومان</span>
            </p>

            {product.description && (
              <p className="mt-6 whitespace-pre-line border-t border-[#7d1d2a]/15 pt-6 text-sm font-extrabold leading-9 text-[#0a0a0a]">
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

            <div className="mt-3 flex justify-center">
              <a
                href="https://wa.me/989011322245"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-full border border-emerald-500/30 py-3.5 text-center text-sm text-emerald-600 transition hover:bg-emerald-50"
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