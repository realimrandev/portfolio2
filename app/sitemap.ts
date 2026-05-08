import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { blogPosts } from "@/lib/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = siteConfig.nav.map((n) => ({
    url: `${siteConfig.url}${n.href}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: n.href === "/" ? 1 : 0.7,
  }));

  const posts = blogPosts.map((p) => ({
    url: `${siteConfig.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...posts];
}
