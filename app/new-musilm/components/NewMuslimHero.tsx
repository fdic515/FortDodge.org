import Image from "next/image";
import { resolveStorageImageUrl } from "../../../lib/storage.service";

type NewMuslimHeroProps = {
  data?: {
    heroImage?: string | null;
  } | null;
};

export default function NewMuslimHero({ data }: NewMuslimHeroProps) {
  // Use home page hero image
  const heroImageValue = data?.heroImage || "/images/fortdoge-masjid.jpg";

  const resolvedImage =
    resolveStorageImageUrl(heroImageValue, {
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




