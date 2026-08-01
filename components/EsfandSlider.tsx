import ProductSlider from "@/components/ProductSlider";

const fallbackProducts = [
  { id: 1, name: "اسپند دود کن اقتصادی", price: "1.550", cover: "/images/esfand/esfand.jpg", slug: "em", category: "esfand" },
  { id: 2, name: "ست وی‌ای‌پی ترک", price: "5.580", cover: "/images/esfand/esfand.jpg", slug: "vip", category: "esfand" },
  { id: 3, name: "ست استیل دو تکه", price: "1.980", cover: "/images/esfand/esfand.jpg", slug: "amjad", category: "esfand" },
];

export default async function EsfandSlider() {
  return (
    <ProductSlider
      title="اسپند دود کن"
      products={fallbackProducts}
      categorySlug="esfand"
    />
  );
}
