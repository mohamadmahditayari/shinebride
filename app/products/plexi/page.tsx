import { supabase } from "@/lib/supabase";
import AnimatedProductGrid from "@/components/AnimatedProductGrid";
import BackButton from "@/components/BackButton";

export const runtime = "edge";

export default async function PlexiPage() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category", "plexi")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(160deg,#fffdf9 0%,#faf6ee 100%)" }}>
      <div className="relative overflow-hidden py-16 md:py-20 text-center px-6">
        <p className="text-xs tracking-[5px] uppercase text-[#D4AF37] mb-3">کالکشن ShineBride</p>
        <h1 className="text-3xl md:text-5xl text-gray-800">پلکسی</h1>
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
          <AnimatedProductGrid products={products} category="plexi" />
        )}
      </div>
      <BackButton />
    </main>
  );
}
