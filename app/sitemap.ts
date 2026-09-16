import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Routes included in the sitemap. Add new pages here. */
const ROUTES = ["", "/catalog", "/about", "/contact", "/disclaimer", "/terms", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${site.url}${route}`,
    lastModified,
    changeFrequency: route === "/catalog" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/catalog" ? 0.9 : 0.5,
  }));
}
