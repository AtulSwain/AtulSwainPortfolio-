import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl.replace(/\/$/, "");
  return [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/work/`, priority: 0.9 },
    ...projects.map((p) => ({ url: `${base}/work/${p.slug}/`, priority: 0.7 })),
  ];
}
