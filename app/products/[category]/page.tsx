import { redirect } from "next/navigation";
import AnimatedProductGrid from "@/components/AnimatedProductGrid";
import BackButton from "@/components/BackButton";
import { getProductsByCategory } from "@/lib/products";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const categoryTitles: Record<string, string> = {
  esfand: "اسپند دود کن",
  baleh: "ست بله برون",
  gift: "گیفت",
  car: "گیفت ماشین",
  plexi: "پلکسی",
  abajour: "آباژور",
};

type Props = {
  params: Promise<{
    category: string;
  }>;
  searchParams?: Promise<{
    q?: string;
  }>;
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;

  const q = (await searchParams)?.q?.trim() || "";

  const products = await getProductsByCategory(category);
  const filteredProducts = q
    ? products.filter((product) => {
        const haystack = [product.name, product.description || "", product.category || ""].join(" ").toLowerCase();
        return haystack.includes(q.toLowerCase());
      })
    : products;

  const title = categoryTitles[category] || category;

  return (
    <main className="yalda-page-shell min-h-screen">
      <div className="relative overflow-hidden px-6 py-16 text-center md:py-20">
        <p className="mb-3 text-xs uppercase tracking-[5px] text-[#7d1d2a]">کالکشن ShineBride</p>

        <h1 className="text-3xl font-black text-[#0d0d0d] md:text-5xl">
          {q ? `نتایج جستجو در ${title}` : title}
        </h1>

        <div className="mt-4 flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-[#7d1d2a]" />
          <span className="text-[#e5bb6d]">✦</span>
          <div className="h-px w-10 bg-[#7d1d2a]" />
        </div>

        <p className="mt-3 text-sm font-bold text-[#0d0d0d]">{filteredProducts?.length ?? 0} مدل اختصاصی</p>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
        {!filteredProducts || filteredProducts.length === 0 ? (
          <div className="py-24 text-center text-[#1a1a1a]">هیچ محصولی پیدا نشد.</div>
        ) : (
          <AnimatedProductGrid products={filteredProducts} category={category} />
        )}
      </div>

      <BackButton />
    </main>
  );
}