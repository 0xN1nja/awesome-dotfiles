"use client";

import { useEffect } from "react";

interface RiceDetailShortcutsProps {
  githubUrl: string;
  redditUrl?: string | null;
}

const RiceDetailShortcuts = ({ githubUrl, redditUrl }: RiceDetailShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) return;

      // Don't hijack d/r while the fullscreen gallery is open.
      if (document.querySelector('[role="dialog"]')) return;

      if (event.key === "d") {
        event.preventDefault();
        window.open(githubUrl, "_blank", "noopener,noreferrer");
      } else if (event.key === "r" && redditUrl) {
        event.preventDefault();
        window.open(redditUrl, "_blank", "noopener,noreferrer");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [githubUrl, redditUrl]);

  return null;
};

export default RiceDetailShortcuts;
