import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/how-it-works",
    "/plants",
    "/panel",
    "/commands",
    "/faq",
    "/get-started",
    "/profile",
    "/settings",
  ];

  return routes.map((route) => ({
    url: `https://daisyflower.app${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
