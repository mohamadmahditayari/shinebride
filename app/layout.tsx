import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "./context/CartContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://shinebride.ir"),

  title: {
    default: "ShineBride | اکسسوری لوکس عروس",
    template: "%s | ShineBride",
  },

  description:
    "فروش و اجاره اکسسوری لوکس عروس، اسپند دود کن، آباژور پلکسی، شمعدان، سینی عقد و محصولات خاص ShineBride.",

  keywords: [
    "اکسسوری عروس",
    "اسپند دود کن",
    "آباژور پلکسی",
    "سینی عقد",
    "شمعدان",
    "ShineBride",
  ],

  authors: [
    {
      name: "ShineBride",
    },
  ],

  openGraph: {
    title: "ShineBride",
    description:
      "فروش و اجاره اکسسوری لوکس عروس و محصولات خاص ShineBride",
    type: "website",
    locale: "fa_IR",
    siteName: "ShineBride",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className="bg-white text-gray-900 antialiased"
      >
        <CartProvider>
          <Navbar />

          <main className="min-h-screen">
            {children}
          </main>

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}