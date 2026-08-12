import AnimatedProductGrid from "@/components/AnimatedProductGrid";
import BackButton from "@/components/BackButton";
import { getProductsByCategory, fallbackProductsByCategory } from "@/lib/products";

export const dynamic = "force-static";
export const dynamicParams = false;

// Generate static params from fallback data (for static site generation)
export async function generateStaticParams() {
  // Get categories from Supabase first
  try {
    const { supabase } = await import("@/lib/supabase");
    const { data: categories } = await supabase
      .from("categories")
      .select("slug")
      .order("name");
    
    if (categories && categories.length > 0) {
      return categories.map((cat) => ({ category: cat.slug }));
    }
  } catch (error) {
    // Fall back to static categories
  }
  
  // Fallback static categories
  return ["esfand", "baleh", "gift", "car", "plexi", "abajour"].map((category) => ({ category }));
}

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

  const products = await getProductsByCategory(category);

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