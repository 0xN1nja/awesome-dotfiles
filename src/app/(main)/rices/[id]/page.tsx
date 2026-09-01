import { notFound } from "next/navigation";
import Link from "next/link";
import AuthorBadge from "~/components/rice/author-badge";
import BookmarkButton from "~/components/rice/bookmark-button";
import Carousel from "~/components/rice/carousel";
import RiceDetailShortcuts from "~/components/rice/rice-detail-shortcuts";
import ToolsList from "~/components/rice/tools-list";
import { buttonVariants } from "~/components/ui/button";
import { getAllCards, getRiceDetail, resolveRiceImages } from "~/lib/rice";
import { formatDate } from "~/lib/utils";
import { getSEOTags } from "~/lib/seo";

interface RiceDetailPageParams {
  params: Promise<{ id: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ id: string }[]> {
  return getAllCards().map((card) => ({ id: card.id }));
}

export async function generateMetadata({ params }: RiceDetailPageParams) {
  const { id } = await params;
  const rice = getRiceDetail(id);
  if (!rice) return getSEOTags();

  const images = resolveRiceImages(rice);
  const authorLabel = rice.source === "reddit" ? `u/${rice.author}` : rice.author;

  return getSEOTags({
    title: rice.title,
    description: `by ${authorLabel}`,
    canonicalUrlRelative: `/rices/${rice.id}`,
    images: images.slice(0, 1),
  });
}

export default async function RiceDetailPage({ params }: RiceDetailPageParams) {
  const { id } = await params;
  const rice = getRiceDetail(id);

  if (!rice) return notFound();

  const images = resolveRiceImages(rice);
  const redditUrl = rice.source === "reddit" ? rice.permalink : undefined;

  return (
    <article className="!mt-8 w-full pt-12">
      <RiceDetailShortcuts githubUrl={rice.github_url} redditUrl={redditUrl} />

      <div className="grid gap-8 md:grid-cols-[7fr_3fr] md:items-start">
        <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
          <Carousel images={images} alt={rice.title} size="detail" priority enableFullscreen />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="font-sans text-2xl">{rice.title}</h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <time dateTime={new Date(rice.created_utc * 1000).toISOString()}>
                {formatDate(rice.created_utc * 1000)}
              </time>
              <AuthorBadge author={rice.author} source={rice.source} />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <BookmarkButton
              riceId={rice.id}
              title={rice.title}
              className={buttonVariants({ variant: "outline", size: "icon" })}
            />

            <Link
              href={rice.github_url}
              target="_blank"
              rel="noopener noreferrer external"
              className={buttonVariants({ variant: "outline" })}
            >
              View dotfiles
              <kbd className="ml-1.5 hidden rounded border px-1 text-[10px] font-normal text-muted-foreground sm:inline">
                D
              </kbd>
            </Link>

            {redditUrl && (
              <Link
                href={redditUrl}
                target="_blank"
                rel="noopener noreferrer external"
                className={buttonVariants({ variant: "outline" })}
              >
                View Reddit post
                <kbd className="ml-1.5 hidden rounded border px-1 text-[10px] font-normal text-muted-foreground sm:inline">
                  R
                </kbd>
              </Link>
            )}
          </div>

          <div className="space-y-1">
            <hr className="!mb-4" />
            <ToolsList tools={rice.utils_used} />
          </div>
        </div>
      </div>
    </article>
  );
}
