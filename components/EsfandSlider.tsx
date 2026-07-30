import { supabaseLite } from "@/lib/supabase-lite";
import ProductSlider from "@/components/ProductSlider";

export default async function EsfandSlider() {
  const products = await supabaseLite.selectAll("products", { category: "esfand" }, "created_at", false, 10);

  if (!products || products.length === 0) return null;

  return (
    <ProductSlider
      title="اسپند دود کن"
      products={products}
      categorySlug="esfand"
    />
  );
}
