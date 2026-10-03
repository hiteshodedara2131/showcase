import { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/data/blogs";
import { getAllSeoSlugs } from "@/data/seoPages";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://showcase-3d.com";
  const now = new Date();

  // Core Pages
  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/editor`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // 10 SEO Tool & Solution Pages
  const toolRoutes: MetadataRoute.Sitemap = getAllSeoSlugs().map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 10 Blog Detail Pages
  const blogRoutes: MetadataRoute.Sitemap = getAllBlogSlugs().map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...coreRoutes, ...toolRoutes, ...blogRoutes];
}
