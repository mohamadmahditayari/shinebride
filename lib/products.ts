import { supabase } from "./supabase";

// Fallback data for when Supabase is not available
export const fallbackCategories = [
  { id: 0, name: "اسپند دود کن", slug: "esfand", image: "/images/esfand/esfand.jpg" },
  { id: 1, name: "ست بله برون", slug: "baleh", image: "/images/baleh/baleh.jpg" },
  { id: 2, name: "گیفت", slug: "gift", image: "/images/gift/gift.jpg" },
  { id: 3, name: "گیفت ماشین", slug: "car", image: "/images/car/car.jpg" },
  { id: 4, name: "پلکسی", slug: "plexi", image: "/images/plexi/plexi.jpg" },
  { id: 5, name: "آباژور", slug: "abajour", image: "/images/abajour/abajour.jpg" },
];

const HIDDEN_CATEGORY_SLUGS = new Set([]);

export const fallbackProductsByCategory: Record<string, Array<any>> = {
  esfand: [
    { id: 1, name: "اسپند دود کن اقتصادی", price: "1.550", cover: "/images/esfand/esfand.jpg", slug: "em", description: "اسپند دود کن کلاسیک با طراحی شیک و مناسب برای هدیه", images: ["/images/esfand/em/1.jpg"] },
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
    
    if (data && data.length > 0) {
      return data.filter((category) => !HIDDEN_CATEGORY_SLUGS.has(String(category.slug || "").trim().toLowerCase()));
    }
    
    return fallbackCategories;
  } catch (error) {
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
    
    if (data && data.length > 0) {
      return data.map(normalizeProduct);
    }
    
    return fallbackProducts;
  } catch (error) {
    return fallbackProducts;
  }
}

// Helper function to get default cover for a product based on category and slug
function getDefaultProductCover(category: string, slug: string): string {
  const categoryCovers: Record<string, Record<string, string>> = {
    esfand: {
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
    },
    baleh: {
      dantel: "/images/baleh/dantel/1.jpg",
      darbay: "/images/baleh/darbay/1.jpg",
      eqtesadi: "/images/baleh/eqtesadi/1.jpg",
      harir: "/images/baleh/harir/1.jpg",
      javaher: "/images/baleh/javaher/1.jpg",
      orkideh: "/images/baleh/orkideh/1.jpg",
      otrishi: "/images/baleh/otrishi/1.jpg",
      papyon: "/images/baleh/papyon/1.jpg",
      par: "/images/baleh/par/1.jpg",
      parvane: "/images/baleh/parvane/1.jpg",
      pelise: "/images/baleh/pelise/1.jpg",
      pinky: "/images/baleh/pinky/1.jpg",
      qoo: "/images/baleh/qoo/1.jpg",
      roosi: "/images/baleh/roosi/1.jpg",
      ros: "/images/baleh/ros/1.jpg",
      ros2: "/images/baleh/ros2/1.jpg",
      "set-golbehi": "/images/baleh/set-golbehi/1.jpg",
    },
    gift: {
      alaleh: "/images/gift/alaleh/1.jpg",
      atr: "/images/gift/atr/1.jpg",
      bad: "/images/gift/bad/1.jpg",
      daste: "/images/gift/daste/1.jpeg",
      gharch: "/images/gift/gharch/1.jpg",
      kandel: "/images/gift/kandel/1.jpeg",
      mini: "/images/gift/mini/1.jpg",
      motor: "/images/gift/motor/1.jpeg",
      rubik: "/images/gift/rubik/1.jpg",
      sadaf: "/images/gift/sadaf/1.jpg",
      shakhe: "/images/gift/shakhe/1.jpeg",
    },
    car: {
      "car-gift": "/images/car/car.jpg",
    },
    plexi: {
      "plexi-lux": "/images/plexi/plexi.jpg",
    },
    abajour: {
      "abajour-lux": "/images/abajour/abajour.jpg",
    },
  };
  
  const categoryData = categoryCovers[category];
  if (categoryData && categoryData[slug]) {
    return categoryData[slug];
  }
  
  const categoryDefaults: Record<string, string> = {
    esfand: "/images/esfand/esfand.jpg",
    baleh: "/images/baleh/baleh.jpg",
    gift: "/images/gift/gift.jpg",
    car: "/images/car/car.jpg",
    plexi: "/images/plexi/plexi.jpg",
    abajour: "/images/abajour/abajour.jpg",
  };
  
  return categoryDefaults[category] || "/images/logo.png";
}

// Normalize product data to ensure valid cover and images
function normalizeProduct(product: any): any {
  const normalized = { ...product };
  
  if (!normalized.cover || normalized.cover.includes("logo.png") || !normalized.cover.trim()) {
    normalized.cover = getDefaultProductCover(product.category || "", product.slug || "");
  }
  
  if (!Array.isArray(normalized.images) || normalized.images.length === 0) {
    normalized.images = [normalized.cover];
  }
  
  return normalized;
}

// Fetch products by category from Supabase with fallback
export async function getProductsByCategory(category: string) {
  try {
    const cleanCategory = category.trim().toLowerCase();

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", cleanCategory)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Supabase products error:", error);
      throw error;
    }

    console.log("Products from Supabase:", data);

    if (data && data.length > 0) {
      return data.map((item) =>
        normalizeProduct({
          ...item,
          category: cleanCategory,
        })
      );
    }

    // FIX: make sure fallback items always carry the category field
    return (fallbackProductsByCategory[cleanCategory] || []).map((p) => ({
      ...p,
      category: cleanCategory,
    }));

  } catch (error) {
    console.log("Using fallback products:", error);

    const cleanCategory = category.trim().toLowerCase();
    // FIX: same here, for the catch branch
    return (fallbackProductsByCategory[cleanCategory] || []).map((p) => ({
      ...p,
      category: cleanCategory,
    }));
  }
}

export async function searchProducts(searchTerm: string) {
  const query = searchTerm.trim();

  if (!query) {
    return [];
  }

  const normalized = query.toLowerCase();

  try {
    const { data, error } = await supabase
      .from("products")
      .select("id, name, category, slug, cover, price, description")
      .or(`name.ilike.%${query}%,category.ilike.%${query}%`)
      .limit(12);

    if (error) throw error;

    if (data && data.length > 0) {
      return data.map(normalizeProduct);
    }
  } catch (error) {
    console.log("Search fallback triggered:", error);
  }

  return fallbackProducts.filter((product) => {
    if (HIDDEN_CATEGORY_SLUGS.has(String(product.category || "").trim().toLowerCase())) {
      return false;
    }

    const haystack = [
      product.name,
      product.category,
      product.slug,
      product.description || "",
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalized);
  });
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
    
    if (data) {
      return normalizeProduct(data);
    }
    
    return fallbackProducts.find(p => p.category === category && p.slug === slug) || null;
  } catch (error) {
    return fallbackProducts.find(p => p.category === category && p.slug === slug) || null;
  }
}