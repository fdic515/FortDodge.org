import Image from "next/image";
import { resolveStorageImageUrl } from "../../../lib/storage.service";

type ResourcesHeroProps = {
  data?: {
    "hero-image"?: string;
    heroImage?: string;
  } | null;
  folder?: string;
};

export default function ResourcesHero({ data, folder = "resources" }: ResourcesHeroProps) {
  // Use home page hero image
  const heroImage =
    data?.["hero-image"] ||
    data?.heroImage ||
    "/images/fortdoge-masjid.jpg";

  const resolvedImage = resolveStorageImageUrl(heroImage, {
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
