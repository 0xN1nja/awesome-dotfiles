"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const SkipContent = () => {
  const pathname = usePathname();
  const isTagsPage = pathname.includes("tag");
  const skipLinkRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (skipLinkRef.current) {
      skipLinkRef.current.focus();
    }
  }, [pathname]);

  return (
    <>
      <span className="sr-only" ref={skipLinkRef} tabIndex={0}></span>
      <a
        aria-label={`Skip to ${isTagsPage ? "navigation" : "main content"}`}
        role="link"
        href={isTagsPage ? "#main-nav" : "#main-content"}
        className="el-focus-styles container pointer-events-none fixed inset-x-0 top-1 z-50 rounded-sm border bg-background p-3 text-center text-ring opacity-0 transition-opacity duration-500 ease-in-out focus-visible:pointer-events-auto focus-visible:opacity-100"
      >
        Skip to {isTagsPage ? "navigation" : "main content"}
      </a>
    </>
  );
};

export default SkipContent;
