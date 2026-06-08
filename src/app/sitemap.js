const SITE_URL = "https://thecherryeffect.com";

export default function sitemap() {
  return [
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
}
