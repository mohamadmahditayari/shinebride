import ProductSlider from "@/components/ProductSlider";
import { getProductsByCategory, fallbackProductsByCategory } from "@/lib/products";

function getProductCover(product: any) {
  // If product has a valid cover from Supabase, use it
  if (product.cover && !product.cover.includes("logo.png")) {
    return product.cover;
  }
  
  // Use known product image paths based on slug
  const productCovers: Record<string, string> = {
    em: "/images/esfand/em/1.jpg",
    vip: "/images/esfand/vip/1.jpg",
    amjad: "/images/esfand/amjad/1.jpg",
    aroos: "/images/esfand/aroos/1.jpg",
    almas: "/images/esfand/almas/1.jpg",
    fm: "/images/esfand/fm/1.jpg",
    javaher: "/images/esfand/javaher/1.jpg",
    km: "/images/esfand/km/1.jpg",
    ros: "/images/esfand/ros/1.jpg",
    setk: "/images/esfand/setk/1.jpg",
    settalaii: "/images/esfand/settalaii/1.jpg",
  };
  
  const slug = String(product.slug || "").trim().toLowerCase();
  return productCovers[slug] || "/images/esfand/esfand.jpg";
}

export default async function EsfandSlider() {
  // Get products from Supabase with fallback
  let products = await getProductsByCategory("esfand");
  
  // If Supabase returns products, normalize their covers
  if (products.length > 0) {
    products = products.map(p => ({
      ...p,
      cover: getProductCover(p)
    }));
  }
  
  // If no products from Supabase, use fallback
  if (products.length === 0) {
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
