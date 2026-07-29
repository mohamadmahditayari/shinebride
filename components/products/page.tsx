import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function ProductsPage() {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("id");

  if (error) {
    console.log(error);
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">

      <h1 className="text-5xl font-bold text-center text-[#D4AF37] mb-4">
        محصولات ShineBride
      </h1>

      <p className="text-center text-gray-500 mb-14">
        دسته‌بندی محصولات
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {categories?.map((category) => (

          <Link
            key={category.id}
            href={`/products/${category.slug}`}
            className="group rounded-3xl border border-gray-200 bg-white p-10 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition duration-300"
          >

            <div className="flex flex-col items-center">

              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-[#D4AF37] to-pink-400 flex items-center justify-center text-white text-4xl shadow-lg">
                ✨
              </div>

              <h2 className="mt-8 text-3xl font-bold text-gray-800">
                {category.name}
              </h2>

              <p className="mt-4 text-gray-500">
                مشاهده محصولات
              </p>

            </div>

          </Link>

        ))}

      </div>

    </main>
  );
}