"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { resolveStorageImageUrl } from "../../lib/storage.service";

// Shape of the hero section data coming from Supabase.
// All fields are optional so the component can handle partial JSON safely.
export type HeroSectionData = {
  title?: string;
  subtitle?: string;
  heroImage?: string;
  heroImageAlt?: string;
};

export type HeroSectionProps = {
  data?: HeroSectionData | null;
};

export default function HeroSection({ data }: HeroSectionProps) {
  const [imageError, setImageError] = useState(false);
  const [imagePath, setImagePath] = useState<string | null>(null);

  useEffect(() => {
    if (data?.heroImage) {
      const resolved = resolveStorageImageUrl(data.heroImage, {
        bucket: "Public",
        folder: "Home",
      });
      setImagePath(resolved);
      setImageError(false);
    } else {
      setImagePath(null);
    }
  }, [data?.heroImage]);

  const handleImageError = async () => {
    console.warn("[HeroSection] Image failed to load, removing from database:", data?.heroImage);
    setImageError(true);
    setImagePath(null);

    // If image path exists in database but failed to load, remove it
    if (data?.heroImage && !data.heroImage.startsWith("http") && !data.heroImage.startsWith("blob:")) {
      try {
        // Call API to remove invalid image path from database
        await fetch("/api/cleanup-invalid-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            table: "Home",
            section: "heroSection",
            field: "heroImage",
            path: data.heroImage,
          }),
        });
      } catch (error) {
        console.error("[HeroSection] Failed to cleanup invalid image:", error);
      }
    }
  };

  const imageAlt =
    data?.heroImageAlt ?? "Fort Dodge Islamic Center exterior";

  return (
    <section className="w-full bg-white">
      {imagePath && !imageError && (
        <Image
          src={imagePath}
          alt={imageAlt}
          width={1920}
          height={960}
          className="w-full max-h-[750px] object-cover"
          priority
          onError={handleImageError}
        />
      )}
      {(data?.title || data?.subtitle) && (
        <div className="mx-auto max-w-5xl px-4 py-6 text-center text-slate-900">
          {data?.title && (
            <h1 className="text-3xl font-semibold sm:text-4xl">
              {data.title}
            </h1>
          )}
          {data?.subtitle && (
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              {data.subtitle}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
