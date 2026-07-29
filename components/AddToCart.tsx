"use client";

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";

type Props = {
  product: {
    id: string | number;
    name: string;
    price: string;
    cover: string;
    category: string;
    slug: string;
  };
};

export default function AddToCart({ product }: Props) {
  const { addToCart, cart } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = cart.some((i) => i.id === product.id);

  const handle = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handle}
      className={`mt-8 w-full rounded-full py-4 text-base font-semibold shadow-lg transition-all duration-300 ${
        added
          ? "bg-green-500 shadow-green-200 text-white"
          : "bg-gradient-to-r from-[#D4AF37] to-[#c9a227] shadow-[#D4AF37]/30 text-white hover:shadow-[#D4AF37]/50 hover:-translate-y-0.5"
      }`}
    >
      {added ? "✓ به سبد اضافه شد" : inCart ? "افزودن مجدد به سبد" : "افزودن به سبد خرید"}
    </button>
  );
}
