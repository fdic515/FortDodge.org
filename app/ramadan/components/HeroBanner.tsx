import Image from "next/image";
import Link from "next/link";
import { resolveStorageImageUrl } from "../../../lib/storage.service";

type HeroBannerProps = {
  data?: {
    heroImage?: string | null;
    announcementText?: string | null;
    eidText?: string | null;
  } | null;
};

export default function HeroBanner({ data }: HeroBannerProps) {
  // Use home page hero image
  const imageValue = data?.heroImage || "/images/ramadan-aq.png";

  return (
    <header className="w-full bg-white">
      <div className="relative w-full overflow-hidden">
        <div className="relative aspect-[1925/700] w-full">
          {resolveStorageImageUrl(imageValue, {
            bucket: "Public",
            folder: "Home",
          }) && (
            <Image
              src={
                resolveStorageImageUrl(imageValue, {
                  bucket: "Public",
                  folder: "Home",
                }) as string
              }
              alt="Ramadan Kareem banner"
              fill
              className="object-cover"
              priority
            />
          )}
        </div>
      </div>
      <div className="space-y-3 border-t border-gray-100 bg-gray-50 px-4 py-4 text-center text-gray-800 sm:space-y-4 sm:px-6 sm:py-6">
        {data?.announcementText ? (
          <p
            className="text-xs leading-relaxed sm:text-sm"
            dangerouslySetInnerHTML={{ __html: data.announcementText }}
          />
        ) : (
          <p className="text-xs leading-relaxed sm:text-sm">
            ISNA and the Fiqh Council of North America have{" "}
            <Link
              href="https://www.fiqhcouncil.org"
              className="font-medium text-blue-700 underline"
              target="_blank"
            >
              announced
            </Link>{" "}
            the first day of Ramadan will be on{" "}
            <span className="font-semibold text-red-600">Saturday, March 1st</span>
            . Taraweeh will begin on Friday, February 28th.
          </p>
        )}
        {data?.eidText ? (
          <p
            className="text-sm font-semibold text-gray-900 sm:text-base"
            dangerouslySetInnerHTML={{ __html: data.eidText }}
          />
        ) : (
          <p className="text-sm font-semibold text-gray-900 sm:text-base">Eid is Sunday, March 30th.</p>
        )}
      </div>
    </header>
  );
}


