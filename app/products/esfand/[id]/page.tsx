export const runtime = "edge";

import Image from "next/image";
import { notFound } from "next/navigation";
import { esfandProducts } from "@/data/esfand";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const product = esfandProducts.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={700}
            height={700}
            className="rounded-3xl w-full"
          />

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4 mt-5">
              {product.images.slice(1).map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="rounded-2xl w-full"
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold">{product.name}</h1>

          <p className="text-2xl text-[#D4AF37] font-bold mt-4">
            {product.price} میلیون تومان
          </p>

          <p className="mt-8 leading-9 whitespace-pre-line text-gray-700">
            {product.description}
          </p>
        </div>
      </div>
    </main>
  );
}
