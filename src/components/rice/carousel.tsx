"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "~/lib/utils";

interface CarouselProps {
  images: string[];
  alt: string;
  size?: "card" | "detail";
  priority?: boolean;
  className?: string;
}

const Carousel = ({ images, alt, size = "card", priority, className }: CarouselProps) => {
  const [index, setIndex] = useState(0);
  const total = images.length;

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

  const goTo = (event: React.MouseEvent, next: number) => {
    event.preventDefault();
    event.stopPropagation();
    setIndex(((next % total) + total) % total);
  };

  const sizes =
    size === "detail"
      ? "(max-width: 768px) 100vw, 800px"
      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

  return (
    <div className={cn("group relative size-full overflow-hidden", className)}>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          priority={priority && i === 0}
          loading={priority && i === 0 ? undefined : "lazy"}
          quality={85}
          sizes={sizes}
          className={cn(
            "size-full object-cover transition-opacity duration-200",
            i === index ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        />
      ))}

      {showChrome && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(event) => goTo(event, index - 1)}
            className="el-focus-styles absolute left-2 top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label="Next image"
            onClick={(event) => goTo(event, index + 1)}
            className="el-focus-styles absolute right-2 top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>

          <span className="absolute bottom-2 right-2 z-10 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">
            {index + 1} / {total}
          </span>
        </>
      )}
    </div>
  );
};

export default Carousel;
