"use client";

import Script from "next/script";
import { generateBreadcrumbSchema } from "@/lib/seo";

type BreadcrumbItem = {
  name: string;
  url: string;
};

type BreadcrumbStructuredDataProps = {
  items: BreadcrumbItem[];
};

/**
 * Component to add BreadcrumbList structured data to a page
 * Usage: <BreadcrumbStructuredData items={[{name: 'Home', url: '/'}, {name: 'About', url: '/about'}]} />
 */
export default function BreadcrumbStructuredData({
  items,
}: BreadcrumbStructuredDataProps) {
  if (!items || items.length === 0) return null;

  const breadcrumbSchema = generateBreadcrumbSchema(items);

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema),
      }}
    />
  );
}

