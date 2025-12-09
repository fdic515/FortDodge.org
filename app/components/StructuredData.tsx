import Script from "next/script";
import {
  generateOrganizationSchema,
  generateWebsiteSchema,
  generatePlaceOfWorshipSchema,
} from "@/lib/seo";

export default function StructuredData() {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();
  const placeOfWorshipSchema = generatePlaceOfWorshipSchema();

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <Script
        id="place-of-worship-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(placeOfWorshipSchema),
        }}
      />
    </>
  );
}

