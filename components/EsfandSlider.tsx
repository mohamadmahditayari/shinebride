import { supabase } from "@/lib/supabase";
import ProductSlider from "@/components/ProductSlider";

export default async function EsfandSlider() {
  const { data: products } = await supabase
    .from("products")
    .select("id, name, price, cover, slug, category")
    .eq("category", "esfand")
    .order("created_at", { ascending: false })
    .limit(10);

  if (!products || products.length === 0) return null;

  return (
    <ProductSlider
      title="اسپند دود کن"
      products={products}
      categorySlug="esfand"
    />
  );
}
