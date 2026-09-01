"use client";

import { Heart } from "lucide-react";
import { toggleBookmark, useIsBookmarked } from "~/lib/bookmarks";
import { cn } from "~/lib/utils";

interface BookmarkButtonProps {
  riceId: string;
  title: string;
  className?: string;
}

const BookmarkButton = ({ riceId, title, className }: BookmarkButtonProps) => {
  const bookmarked = useIsBookmarked(riceId);

  return (
    <button
      type="button"
      aria-label={bookmarked ? `Remove ${title} from saved` : `Save ${title}`}
      aria-pressed={bookmarked}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleBookmark(riceId);
      }}
      className={cn("el-focus-styles transition-colors", className)}
    >
      <Heart className={cn("size-4", bookmarked && "fill-current")} aria-hidden="true" />
    </button>
  );
};

export default BookmarkButton;
