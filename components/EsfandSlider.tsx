import ProductSlider from "@/components/ProductSlider";
import { getProductsByCategory, fallbackProductsByCategory } from "@/lib/products";

export default async function EsfandSlider() {
  // Get products from Supabase with fallback
  let products = await getProductsByCategory("esfand");
  
  // If Supabase returns products but they don't have proper cover images,
  // use fallback data with correct image paths
  const hasValidImages = products.length > 0 && products.every(p => p.cover && !p.cover.includes('logo.png'));
  
  if (!hasValidImages || products.length === 0) {
    // Use fallback data with correct image paths
    products = fallbackProductsByCategory["esfand"].slice(0, 3);
  }
  
  // Filter to show only 3 products
  const featuredProducts = products.slice(0, 3);
  
  return (
    <ProductSlider
      title="اسپند دود کن"
      products={featuredProducts}
      categorySlug="esfand"
    />
  );
}
