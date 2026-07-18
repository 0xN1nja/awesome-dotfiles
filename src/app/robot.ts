import { MetadataRoute } from "next";
import config from "~/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `https://${config.domainName}/sitemap.xml`,
  };
}
