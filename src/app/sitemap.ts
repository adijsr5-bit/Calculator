import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blogData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://valuepilot.app";

  const highCpcShortUrls = [
    { route: "/mortgage-calculator", priority: 1.0 },
    { route: "/debt-payoff-calculator", priority: 1.0 },
    { route: "/car-loan-calculator", priority: 0.95 },
    { route: "/budget-planner", priority: 0.95 },
    { route: "/refinance-calculator", priority: 0.9 },
    { route: "/retirement-calculator", priority: 0.9 },
    { route: "/401k-calculator", priority: 0.9 },
    { route: "/ira-calculator", priority: 0.9 },
    { route: "/tax-refund-calculator", priority: 0.9 },
    { route: "/net-worth-calculator", priority: 0.9 },
    { route: "/credit-score-guide", priority: 0.85 },
  ];

  const standardRoutes = [
    "",
    "/calculators/mortgage",
    "/calculators/refinance",
    "/calculators/car-loan",
    "/calculators/debt-payoff",
    "/calculators/budget",
    "/calculators/tax-refund",
    "/calculators/retirement",
    "/calculators/401k",
    "/calculators/ira",
    "/calculators/net-worth",
    "/guides/credit-score",
    "/blog",
    "/glossary",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/disclaimer",
  ];

  const blogArticleRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const sitemapEntries: MetadataRoute.Sitemap = [
    ...highCpcShortUrls.map((item) => ({
      url: `${baseUrl}${item.route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: item.priority,
    })),
    ...standardRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1.0 : 0.8,
    })),
    ...blogArticleRoutes,
  ];

  return sitemapEntries;
}
