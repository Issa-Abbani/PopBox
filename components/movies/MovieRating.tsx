import { Star } from "lucide-react";

export function MovieRating({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border border-border bg-card px-2.5 py-1.5 text-sm font-semibold text-foreground ${className}`}>
      <Star className="h-4 w-4 fill-accent text-accent" />
      {rating.toFixed(1)}
    </div>
  );
}
