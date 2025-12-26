import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://affinote.site";

  const staticRoutes = [
    "",
    "/templates",
    "/template/birthday-envelope-letter",
    "/template/flower-surprise",
    "/template/apology-for-gf",
    "/template/apology-for-bf-gf",
    "/template/memory-timeline",
    "/template/appreciation-for-friend",
  ];

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
