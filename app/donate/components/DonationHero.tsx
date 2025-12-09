import Image from "next/image";
import { resolveStorageImageUrl } from "../../../lib/storage.service";

type DonationHeroProps = {
  data?: {
    "hero-image"?: string | null;
    heroImage?: string | null;
  } | null;
};

export default function DonationHero({ data }: DonationHeroProps) {
  // Use home page hero image - support both field name formats
  const imageValue = data?.["hero-image"] || data?.heroImage || "";

  const resolvedImage = resolveStorageImageUrl(imageValue, {
    bucket: "Public",
    folder: "Home",
  });

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
