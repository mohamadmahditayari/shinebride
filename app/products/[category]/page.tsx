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
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const products = await getProductsByCategory(category);

  const title = categoryTitles[category] || category;

  return (
    <main className="yalda-page-shell min-h-screen">
      <div className="relative overflow-hidden px-6 py-16 text-center md:py-20">
        <p className="mb-3 text-xs uppercase tracking-[5px] text-[#7d1d2a]">کالکشن ShineBride</p>

        <h1 className="text-3xl text-[#3d1c22] md:text-5xl">{title}</h1>

        <div className="mt-4 flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-[#7d1d2a]" />
          <span className="text-[#e5bb6d]">✦</span>
          <div className="h-px w-10 bg-[#7d1d2a]" />
        </div>

        <p className="mt-3 text-sm text-[#3d1c22]">{products?.length ?? 0} مدل اختصاصی</p>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
        {!products || products.length === 0 ? (
          <div className="py-24 text-center text-[#6d3b42]">هیچ محصولی پیدا نشد.</div>
        ) : (
          <AnimatedProductGrid products={products} category={category} />
        )}
      </div>

      <BackButton />
    </main>
  );
}