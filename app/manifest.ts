import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://arqum.org";

  return {
    name: "Fort Dodge Islamic Center",
    short_name: "FDIC",
    description:
      "Serving the Muslim community in Fort Dodge, Iowa with prayer services, educational programs, and community support.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#075985",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/images/fortlogos.png",
        sizes: "any",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    categories: ["religion", "community", "education"],
    lang: "en-US",
    dir: "ltr",
  };
}

