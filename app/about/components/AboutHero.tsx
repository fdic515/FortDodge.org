import Image from "next/image";
import { resolveStorageImageUrl } from "../../../lib/storage.service";

type AboutHeroProps = {
  data?: {
    heroImage?: string | null;
    "hero-image"?: string | null;
  } | null;
};

export default function AboutHero({ data }: AboutHeroProps) {
  // Use home page hero image
  const imagePath =
    data?.["hero-image"] || data?.heroImage || "/images/fortdoge-masjid.jpg";
  
  const resolvedImage =
    resolveStorageImageUrl(imagePath, {
      bucket: "Public",
      folder: "Home",
    }) ?? null;

  return (
    <section className="w-full bg-white">
      {resolvedImage && (
        <Image
          src={resolvedImage}
          alt="Fort Dodge Islamic Center exterior"
          width={1920}
          height={960}
          className="w-full max-h-[750px] object-cover"
          priority
        />
      )}
    </section>
  );
}

