"use client";

import { ChevronLeft, ChevronRight, Maximize } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";
import CarouselLightbox from "./carousel-lightbox";

interface CarouselProps {
  images: string[];
  alt: string;
  size?: "card" | "detail";
  priority?: boolean;
  className?: string;
  enableFullscreen?: boolean;
}

const Carousel = ({
  images,
  alt,
  size = "card",
  priority,
  className,
  enableFullscreen = false,
}: CarouselProps) => {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState<number[]>([0]);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const total = images.length;

  useEffect(() => {
    if (!enableFullscreen || total === 0) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) return;

      if (event.key === "f") {
        event.preventDefault();
        setFullscreenOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enableFullscreen, total]);

  if (total === 0) {
    return (
      <div
        className={cn(
          "flex size-full items-center justify-center bg-muted text-xs text-muted-foreground",
          className,
        )}
      >
        No image
      </div>
    );
  }

  const showChrome = total > 1;

  const reveal = (...targets: number[]) => {
    setRevealed((prev) => {
      const next = [...prev];
      targets.forEach((target) => {
        const normalized = ((target % total) + total) % total;
        if (!next.includes(normalized)) next.push(normalized);
      });
      return next.length === prev.length ? prev : next;
    });
  };

  const goTo = (event: React.MouseEvent, next: number) => {
    event.preventDefault();
    event.stopPropagation();
    const target = ((next % total) + total) % total;
    setIndex(target);
    reveal(target, target - 1, target + 1);
  };

  const sizes =
    size === "detail"
      ? "(max-width: 768px) 100vw, 800px"
      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

  return (
    <div
      className={cn("group relative size-full overflow-hidden", className)}
      onPointerEnter={showChrome ? () => reveal(index - 1, index + 1) : undefined}
    >
      {images.map((src, i) =>
        revealed.includes(i) ? (
          <Image
            key={src}
            src={src}
            alt={alt}
            fill
            priority={priority && i === 0}
            loading={priority && i === 0 ? undefined : "lazy"}
            sizes={sizes}
            className={cn(
              "size-full object-cover transition-opacity duration-200",
              i === index ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          />
        ) : null,
      )}

      {showChrome && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(event) => goTo(event, index - 1)}
            className="el-focus-styles absolute left-2 top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label="Next image"
            onClick={(event) => goTo(event, index + 1)}
            className="el-focus-styles absolute right-2 top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>

          <span className="absolute bottom-2 right-2 z-10 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">
            {index + 1} / {total}
          </span>
        </>
      )}

      {enableFullscreen && (
        <button
          type="button"
          aria-label="View fullscreen (F)"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setFullscreenOpen(true);
          }}
          className="el-focus-styles absolute right-2 top-2 z-10 flex size-8 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
        >
          <Maximize className="size-4" aria-hidden="true" />
        </button>
      )}

      {enableFullscreen && (
        <CarouselLightbox
          images={images}
          alt={alt}
          index={index}
          onIndexChange={setIndex}
          open={fullscreenOpen}
          onOpenChange={setFullscreenOpen}
        />
      )}
    </div>
  );
};

export default Carousel;
