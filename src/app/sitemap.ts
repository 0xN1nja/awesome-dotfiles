import { MetadataRoute } from "next";
import { getAllCards } from "~/lib/rice";
import { BasePath } from "~/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const riceUrls = getAllCards().map((card) => ({
    url: BasePath(`/rices/${card.id}`),
    lastModified: new Date(card.created_utc * 1000),
  }));

  return [
    { url: BasePath(""), lastModified: new Date() },
    { url: BasePath("/rices"), lastModified: new Date() },
    { url: BasePath("/about"), lastModified: new Date() },
    ...riceUrls,
  ];
}
