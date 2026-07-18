"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoveLeft } from "lucide-react";

const BackToPosts = () => {
  const pathname = usePathname();
  const isRiceDetail = pathname.startsWith("/rices/") && pathname !== "/rices";

  if (!isRiceDetail) return null;

  return (
    <Link
      href="/rices"
      aria-label="Back to rices"
      className="el-focus-styles flex items-center gap-2 rounded-sm text-lg font-medium text-foreground sm:text-base"
    >
      <MoveLeft className="size-4" aria-hidden="true" />
      Back to rices
    </Link>
  );
};

export default BackToPosts;
