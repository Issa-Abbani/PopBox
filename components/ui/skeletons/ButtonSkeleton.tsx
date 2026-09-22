import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = {
  default: "bg-primary/20",
  secondary: "bg-muted",
  outline: "border border-border bg-transparent",
  ghost: "bg-transparent",
  accent: "bg-accent/20",
};

const buttonSizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-6",
  icon: "h-10 w-10",
};

export type ButtonSkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  rounded?: "full" | "md";
};

export function ButtonSkeleton({
  className,
  variant = "default",
  size = "default",
  rounded = "full",
  ...props
}: ButtonSkeletonProps) {
  return (
    <div
      aria-label="Loading button"
      className={cn(
        "animate-pulse rounded-full bg-muted/80",
        buttonVariants[variant],
        buttonSizes[size],
        rounded === "md" ? "rounded-md" : "rounded-full",
        className,
      )}
      {...props}
    />
  );
}

export default ButtonSkeleton;
