import RSS from "rss";
import config from "~/config";
import { getAllCards } from "~/lib/rice";
import { BasePath } from "~/lib/utils";

export async function GET() {
  const feed = new RSS({
    title: `${config.appName}`,
    generator: "RSS for awesome-dotfiles",
    feed_url: BasePath("/feed.xml"),
    site_url: BasePath("/"),
    managingEditor: `${config.social.email} (${config.appName})`,
    webMaster: `${config.social.email} (${config.appName})`,
    language: "en-US",
    pubDate: new Date().toUTCString(),
    ttl: 60,
  });

  const recentRices = [...getAllCards()].sort((a, b) => b.created_utc - a.created_utc).slice(0, 50);

  recentRices.forEach((rice) => {
    feed.item({
      title: rice.title,
      url: BasePath(`/rices/${rice.id}`),
      date: new Date(rice.created_utc * 1000),
      description: rice.title,
      author: rice.author,
    });
  });

  return new Response(feed.xml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
