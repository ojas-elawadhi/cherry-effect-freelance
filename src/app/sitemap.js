import { articles } from "@/content/articles";

const SITE_URL = "https://thecherryeffect.com";

export default function sitemap() {
  const staticRoutes = [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/article`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const articleRoutes = articles.map((article) => ({
    url: `${SITE_URL}${article.href}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}
