import { Search } from "lucide-react";

export function SearchBar({ placeholder = "Search movies, genres, actors..." }: { placeholder?: string }) {
  return (
    <label className="group flex w-full items-center gap-3 rounded-full border border-border bg-card px-3.5 py-2.5 shadow-sm transition-colors hover:border-primary/40 sm:px-4 sm:py-3">
      <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
      <input
        placeholder={placeholder}
        className="min-w-0 flex-1 border-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
      />
    </label>
  );
}
