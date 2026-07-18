import { notFound } from "next/navigation";
import Link from "next/link";
import AuthorBadge from "~/components/rice/author-badge";
import Carousel from "~/components/rice/carousel";
import ToolsList from "~/components/rice/tools-list";
import { buttonVariants } from "~/components/ui/button";
import { getAllCards, getRiceDetail, resolveRiceImages } from "~/lib/rice";
import { formatDate } from "~/lib/utils";
import { getSEOTags } from "~/lib/seo";

interface RiceDetailPageParams {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  return getAllCards().map((card) => ({ id: card.id }));
}

export async function generateMetadata({ params }: RiceDetailPageParams) {
  const { id } = await params;
  const rice = getRiceDetail(id);
  if (!rice) return getSEOTags();

  return getSEOTags({
    title: rice.title,
    description: `${rice.title} by ${rice.author}`,
    canonicalUrlRelative: `/rices/${rice.id}`,
  });
}

export default async function RiceDetailPage({ params }: RiceDetailPageParams) {
  const { id } = await params;
  const rice = getRiceDetail(id);

  if (!rice) return notFound();

  const images = resolveRiceImages(rice);

  return (
    <article className="!mt-8 w-full space-y-6">
      <div className="space-y-2">
        <h1 className="font-serif text-2xl">{rice.title}</h1>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={new Date(rice.created_utc * 1000).toISOString()}>
            {formatDate(rice.created_utc * 1000)}
          </time>
          <AuthorBadge author={rice.author} source={rice.source} />
        </div>
      </div>

      <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
        <Carousel images={images} alt={rice.title} size="detail" priority />
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href={rice.github_url}
          target="_blank"
          rel="noopener noreferrer external"
          className={buttonVariants({ variant: "outline" })}
        >
          View dotfiles
        </Link>

        {rice.source === "reddit" && rice.permalink && (
          <Link
            href={rice.permalink}
            target="_blank"
            rel="noopener noreferrer external"
            className={buttonVariants({ variant: "outline" })}
          >
            View Reddit post
          </Link>
        )}
      </div>

      <div className="space-y-1">
        <hr className="!mb-4" />
        <ToolsList tools={rice.utils_used} />
      </div>
    </article>
  );
}
