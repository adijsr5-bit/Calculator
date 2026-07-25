import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blogData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://valuepilot.vercel.app";
  const now = new Date();

  const primaryRoutes = [
    { route: "", priority: 1.0, changeFreq: "daily" as const },
    { route: "/calculators/mortgage", priority: 1.0, changeFreq: "daily" as const },
    { route: "/calculators/debt-payoff", priority: 1.0, changeFreq: "daily" as const },
    { route: "/calculators/car-loan", priority: 0.95, changeFreq: "daily" as const },
    { route: "/calculators/budget", priority: 0.95, changeFreq: "daily" as const },
    { route: "/calculators/refinance", priority: 0.9, changeFreq: "daily" as const },
    { route: "/calculators/retirement", priority: 0.9, changeFreq: "daily" as const },
    { route: "/calculators/401k", priority: 0.9, changeFreq: "daily" as const },
    { route: "/calculators/ira", priority: 0.9, changeFreq: "daily" as const },
    { route: "/calculators/tax-refund", priority: 0.9, changeFreq: "daily" as const },
    { route: "/calculators/net-worth", priority: 0.9, changeFreq: "daily" as const },
    { route: "/guides/credit-score", priority: 0.85, changeFreq: "weekly" as const },
    { route: "/blog", priority: 0.85, changeFreq: "daily" as const },
    { route: "/glossary", priority: 0.8, changeFreq: "weekly" as const },
    { route: "/about", priority: 0.7, changeFreq: "monthly" as const },
    { route: "/contact", priority: 0.7, changeFreq: "monthly" as const },
    { route: "/privacy", priority: 0.5, changeFreq: "monthly" as const },
    { route: "/terms", priority: 0.5, changeFreq: "monthly" as const },
    { route: "/disclaimer", priority: 0.5, changeFreq: "monthly" as const },
  ];

  const blogArticleRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const mainEntries: MetadataRoute.Sitemap = primaryRoutes.map((item) => ({
    url: `${baseUrl}${item.route}`,
    lastModified: now,
    changeFrequency: item.changeFreq,
    priority: item.priority,
  }));

  return [...mainEntries, ...blogArticleRoutes];
}
