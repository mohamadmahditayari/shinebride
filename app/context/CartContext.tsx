"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CartItem = {
  id: string | number;
  name: string;
  price: string;
  cover: string;
  category: string;
  slug: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string | number) => void;
  updateQty: (id: string | number, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("shinebride_cart");
      if (saved) setCart(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("shinebride_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string | number) => setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id: string | number, qty: number) => {
    if (qty < 1) { removeFromCart(id); return; }
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, quantity: qty } : i));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = cart.reduce((s, i) => s + (parseFloat(i.price.replace(/[^0-9.]/g, "")) || 0) * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
