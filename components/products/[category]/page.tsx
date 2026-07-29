import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { normalizeImageSrc } from "@/lib/image";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const { data: categoryData } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", category)
    .single();

  if (!categoryData) {
    notFound();
  }

  const categoryName =
    categoryData.slug === "esfand" ||
    String(categoryData.name || "").trim().startsWith("اسفند")
      ? "اسپند دود کن"
      : String(categoryData.name || "").trim();

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .order("name");

  if (error) {
    console.log(error);
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">

      <h1 className="text-5xl font-bold text-center text-[#D4AF37] mb-4">
        {categoryName}
      </h1>

      <p className="text-center text-gray-500 mb-14">
        تمامی محصولات این دسته
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        {products?.map((item) => (

          <Link
            key={item.id}
            href={`/products/${category}/${item.slug}`}
            className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 transition"
          >

            <div className="relative w-full overflow-hidden rounded-t-3xl aspect-[9/16]">
              <Image
                src={normalizeImageSrc(item.cover || "/images/logo.png")}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            <div className="p-6">

              <h2 className="text-2xl font-bold text-gray-800">
                {item.name}
              </h2>

              <p className="mt-3 text-[#D4AF37] font-bold text-xl">
                {item.price} تومان
              </p>

              <button className="mt-6 w-full rounded-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#C0C0C0] text-white">
                مشاهده محصول
              </button>

            </div>

          </Link>

        ))}

      </div>

    </main>
  );
}