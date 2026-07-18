import { FaRedditAlien } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";
import type { RiceSource } from "~/lib/rice-shared";
import { cn } from "~/lib/utils";

const AuthorBadge = ({
  author,
  source,
  className,
}: {
  author: string;
  source: RiceSource;
  className?: string;
}) => {
  const isReddit = source === "reddit";
  const href = isReddit ? `https://reddit.com/user/${author}` : `https://github.com/${author}`;
  const label = isReddit ? `u/${author}` : author;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer external"
      aria-label={`View ${label} on ${isReddit ? "Reddit" : "GitHub"}`}
      className={cn(
        "el-focus-styles inline-flex items-center gap-1 rounded-sm hover:text-foreground",
        className,
      )}
    >
      {isReddit ? (
        <FaRedditAlien className="size-3" aria-hidden="true" />
      ) : (
        <FiGithub className="size-3" aria-hidden="true" />
      )}
      <span>{label}</span>
    </a>
  );
};

export default AuthorBadge;
