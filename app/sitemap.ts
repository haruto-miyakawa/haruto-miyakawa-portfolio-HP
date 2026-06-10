import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { works, publications } from "@/content/content.data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const top = ["", "/works", "/research", "/about"].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  const workPages = works
    .filter((w) => w.hasCaseStudy)
    .map((w) => ({
      url: `${SITE_URL}/works/${w.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  const researchPages = publications
    .filter((p) => p.hasDetail)
    .map((p) => ({
      url: `${SITE_URL}/research/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  return [...top, ...workPages, ...researchPages];
}
