import { supabase } from "./supabase";

// Fallback data for when Supabase is not available
export const fallbackCategories = [
  { id: 1, name: "اسپند دود کن", slug: "esfand", image: "/images/esfand/esfand.jpg" },
  { id: 2, name: "ست بله برون", slug: "baleh", image: "/images/baleh/baleh.jpg" },
  { id: 3, name: "گیفت", slug: "gift", image: "/images/gift/gift.jpg" },
  { id: 4, name: "گیفت ماشین", slug: "car", image: "/images/car/car.jpg" },
  { id: 5, name: "پلکسی", slug: "plexi", image: "/images/plexi/plexi.jpg" },
  { id: 6, name: "آباژور", slug: "abajour", image: "/images/abajour/abajour.jpg" },
];

export const fallbackProductsByCategory: Record<string, Array<any>> = {
  esfand: [
    { id: 1, name: "اسپند دود کن اقتصادی", price: "1.550", cover: "/images/esfand/esfand.jpg", slug: "em", description: "اسپند دود کن کلاسیک با طراحی شیک و مناسب برای هدیه", images: ["/images/esfand/em/1.jpg"] },
    { id: 2, name: "ست وی‌ای‌پی ترک", price: "5.580", cover: "/images/esfand/vip/1.jpg", slug: "vip", description: "ست لوکس و خاص برای مراسم و انتخاب‌های ویژه", images: ["/images/esfand/vip/1.jpg", "/images/esfand/vip/2.jpg", "/images/esfand/vip/3.jpg"] },
    { id: 3, name: "ست استیل دو تکه", price: "1.980", cover: "/images/esfand/amjad/1.jpg", slug: "amjad", description: "طرح ساده و شیک برای استفاده روزمره", images: ["/images/esfand/amjad/1.jpg", "/images/esfand/amjad/2.jpg"] },
  ],
  baleh: [
    { id: 4, name: "ست بله برون کلاسیک", price: "3.200", cover: "/images/baleh/darbay/1.jpg", slug: "baleh-classic", description: "تکمیل کننده‌ی زیبایی و هویت خاص", images: ["/images/baleh/darbay/1.jpg"] },
  ],
  gift: [
    { id: 5, name: "گیفت دسته‌دار", price: "1.250", cover: "/images/gift/daste/1.jpeg", slug: "daste", description: "پک هدیه با طراحی خاص و مناسب برای مناسبت‌ها", images: ["/images/gift/daste/1.jpeg"] },
    { id: 6, name: "گیفت موتور", price: "2.100", cover: "/images/gift/motor/1.jpeg", slug: "motor", description: "هدیه ویژه با جزئیات ظریف", images: ["/images/gift/motor/1.jpeg"] },
    { id: 7, name: "گیفت شاخی", price: "1.800", cover: "/images/gift/shakhe/1.jpeg", slug: "shakhe", description: "تنوع بالا و طراحی امروزی", images: ["/images/gift/shakhe/1.jpeg"] },
    { id: 8, name: "گیفت مینی", price: "950", cover: "/images/gift/mini/1.jpg", slug: "mini", description: "نسخه‌ی فشرده و جذاب برای هدیه‌های کوچک", images: ["/images/gift/mini/1.jpg"] },
  ],
  car: [
    { id: 9, name: "گیفت ماشین", price: "1.500", cover: "/images/car/car.jpg", slug: "car-gift", description: "هدیه‌ی مناسب برای ماشین و سفر", images: ["/images/car/car.jpg"] },
  ],
  plexi: [
    { id: 10, name: "پلکسی لوکس", price: "2.700", cover: "/images/plexi/plexi.jpg", slug: "plexi-lux", description: "پارچه و طراحی شاخص برای دکور و مناسبت", images: ["/images/plexi/plexi.jpg"] },
  ],
  abajour: [
    { id: 11, name: "آباژور خاص", price: "3.600", cover: "/images/abajour/abajour.jpg", slug: "abajour-lux", description: "آباژور شیک و خاص برای فضاهای خاص", images: ["/images/abajour/abajour.jpg"] },
  ],
};

// All products in a flat array for individual product pages
export const fallbackProducts: Array<any> = [
  ...fallbackProductsByCategory.esfand.map(p => ({ ...p, category: "esfand" })),
  ...fallbackProductsByCategory.baleh.map(p => ({ ...p, category: "baleh" })),
  ...fallbackProductsByCategory.gift.map(p => ({ ...p, category: "gift" })),
  ...fallbackProductsByCategory.car.map(p => ({ ...p, category: "car" })),
  ...fallbackProductsByCategory.plexi.map(p => ({ ...p, category: "plexi" })),
  ...fallbackProductsByCategory.abajour.map(p => ({ ...p, category: "abajour" })),
];

// Fetch categories from Supabase with fallback
export async function getCategories() {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (error) throw error;
    
    // If Supabase returns data, use it
    if (data && data.length > 0) {
      return data;
    }
    
    // Otherwise use fallback
    return fallbackCategories;
  } catch (error) {
    // Silently fallback to local data if Supabase fails
    return fallbackCategories;
  }
}

// Fetch all products from Supabase with fallback
export async function getAllProducts() {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    
    // If Supabase returns data, use it
    if (data && data.length > 0) {
      return data;
    }
    
    // Otherwise use fallback
    return fallbackProducts;
  } catch (error) {
    // Silently fallback to local data if Supabase fails
    return fallbackProducts;
  }
}

// Fetch products by category from Supabase with fallback
export async function getProductsByCategory(category: string) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: false });

    if (error) throw error;
    
    // If Supabase returns data, use it
    if (data && data.length > 0) {
      return data;
    }
    
    // Otherwise use fallback
    return fallbackProductsByCategory[category] || [];
  } catch (error) {
    // Silently fallback to local data if Supabase fails
    return fallbackProductsByCategory[category] || [];
  }
}

// Get a single product by slug and category
export async function getProductBySlug(category: string, slug: string) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .eq("slug", slug)
      .single();

    if (error) throw error;
    
    // If Supabase returns data, use it
    if (data) {
      return data;
    }
    
    // Otherwise use fallback - find in all fallback products
    return fallbackProducts.find(p => p.category === category && p.slug === slug) || null;
  } catch (error) {
    // Silently fallback to local data if Supabase fails
    return fallbackProducts.find(p => p.category === category && p.slug === slug) || null;
  }
}
