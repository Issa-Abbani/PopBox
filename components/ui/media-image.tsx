"use client";

import Image from "next/image";
import { Film } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

type MediaImageProps = Omit<React.ComponentProps<typeof Image>, "src"> & {
  src?: string | null;
  fallbackClassName?: string;
  fallbackLabel?: string;
};

export function MediaImage({
  src,
  alt,
  className,
  fallbackClassName,
  fallbackLabel = "Image unavailable",
  ...props
}: MediaImageProps) {
  const [hasError, setHasError] = React.useState(false);

  if (!src || hasError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.45),rgba(15,23,42,0.96))] text-white",
          fallbackClassName,
          className,
        )}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-sm">
            <Film className="h-5 w-5 text-white/90" />
          </div>
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/80">{fallbackLabel}</span>
        </div>
      </div>
    );
  }

  return <Image src={src} alt={alt} className={cn("object-cover", className)} onError={() => setHasError(true)} {...props} />;
}
