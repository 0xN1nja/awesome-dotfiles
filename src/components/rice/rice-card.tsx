import Link from "next/link";
import { resolveRiceImages, type RiceCard as RiceCardType } from "~/lib/rice-shared";
import { formatDate } from "~/lib/utils";
import AuthorBadge from "./author-badge";
import BookmarkButton from "./bookmark-button";
import Carousel from "./carousel";
import Chips from "./chips";
import ToolsList from "./tools-list";

interface RiceCardProps {
  rice: RiceCardType;
  priority?: boolean;
  showImage?: boolean;
}

const RiceCard = ({ rice, priority = false, showImage = true }: RiceCardProps) => {
  const href = `/rices/${rice.id}`;
  const images = resolveRiceImages(rice);

  return (
    <li role="listitem">
      <article className="space-y-3">
        <div className="relative aspect-video overflow-hidden rounded-md bg-muted">
          <Link
            href={href}
            prefetch={false}
            aria-label={rice.title}
            tabIndex={-1}
            className="absolute inset-0"
          >
            {showImage && <Carousel images={images} alt={rice.title} priority={priority} />}
          </Link>
          <Chips wm={rice.wm} distro={rice.distro} colorscheme={rice.colorscheme} />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <Link
              href={href}
              prefetch={false}
              className="el-focus-styles group inline-block rounded-sm"
            >
              <h3 className="line-clamp-2 font-sans text-base leading-snug transition-colors group-hover:text-ring">
                {rice.title}
              </h3>
            </Link>

            <BookmarkButton
              riceId={rice.id}
              title={rice.title}
              className="flex size-7 shrink-0 items-center justify-center rounded-md border border-input text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            />
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-xs text-muted-foreground">
            <time dateTime={new Date(rice.created_utc * 1000).toISOString()}>
              {formatDate(rice.created_utc * 1000)}
            </time>
            <AuthorBadge author={rice.author} source={rice.source} />
          </div>

          <ToolsList tools={rice.utils_used} showLabel={false} />
        </div>
      </article>
    </li>
  );
};

export default RiceCard;
