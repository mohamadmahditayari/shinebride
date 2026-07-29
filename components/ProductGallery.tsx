"use client";

import { useState } from "react";
import Image from "next/image";
import { normalizeImageSrc } from "@/lib/image";

type Props = {
  images: string[];
  alt: string;
};

export default function ProductGallery({ images, alt }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const normalizedImages = images.map((img) => normalizeImageSrc(img));

  return (
    <div>
      <Image
        src={normalizedImages[selectedImage]}
        alt={alt}
        width={700}
        height={700}
        className="rounded-3xl w-full"
      />

      {normalizedImages.length > 1 && (
        <div className="grid grid-cols-4 gap-4 mt-5">
          {normalizedImages.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(index)}
              className={`overflow-hidden rounded-2xl border-2 transition ${
                selectedImage === index
                  ? "border-[#D4AF37]"
                  : "border-transparent"
              }`}
            >
              <Image
                src={img}
                alt={`${alt}-${index}`}
                width={180}
                height={180}
                className="w-full h-auto"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}