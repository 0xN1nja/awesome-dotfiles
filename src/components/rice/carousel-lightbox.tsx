"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

interface CarouselLightboxProps {
  images: string[];
  alt: string;
  index: number;
  onIndexChange: (index: number) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CarouselLightbox = ({
  images,
  alt,
  index,
  onIndexChange,
  open,
  onOpenChange,
}: CarouselLightboxProps) => {
  const total = images.length;
  const showChrome = total > 1;

  const goTo = (next: number) => {
    onIndexChange(((next % total) + total) % total);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <DialogPrimitive.Content className="fixed inset-0 z-50 flex items-center justify-center p-4 outline-none data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 sm:p-10">
          <VisuallyHidden>
            <DialogPrimitive.Title>{alt}</DialogPrimitive.Title>
          </VisuallyHidden>

          <DialogPrimitive.Close
            aria-label="Close fullscreen"
            className="el-focus-styles absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
          >
            <X className="size-5" aria-hidden="true" />
          </DialogPrimitive.Close>

          <div className="relative size-full">
            <Image
              src={images[index]}
              alt={alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {showChrome && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => goTo(index - 1)}
                className="el-focus-styles absolute left-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 sm:left-4"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                aria-label="Next image"
                onClick={() => goTo(index + 1)}
                className="el-focus-styles absolute right-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 sm:right-4"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>

              <span className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
                {index + 1} / {total}
              </span>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default CarouselLightbox;
