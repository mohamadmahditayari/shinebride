"use client";

import { useState } from "react";
import { normalizeImageSrc } from "@/lib/image";
import OptimizedImage from "@/components/OptimizedImage";

type Props = {
  images: string[];
  alt: string;
};

export default function ProductGallery({ images, alt }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const normalizedImages = images.map((img) => normalizeImageSrc(img));

  return (
    <div>
      <OptimizedImage
        src={normalizedImages[selectedImage]}
        alt={alt}
        width={700}
        height={700}
        className="w-full rounded-3xl"
      />

      {normalizedImages.length > 1 && (
        <div className="mt-5 grid grid-cols-4 gap-4">
          {normalizedImages.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(index)}
              className={`overflow-hidden rounded-2xl border-2 transition ${
                selectedImage === index ? "border-[#7d1d2a]" : "border-transparent"
              }`}
            >
              <OptimizedImage
                src={img}
                alt={`${alt}-${index}`}
                width={180}
                height={180}
                className="h-auto w-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}