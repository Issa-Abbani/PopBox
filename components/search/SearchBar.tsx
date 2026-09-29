"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "../ui/button";

interface SearchBarProps {
  placeholder?: string;
  query: string;
}

export function SearchBar({
  placeholder = "Search movies, genres, actors...",
  query,
}: SearchBarProps) {
  const router = useRouter();
  const [value, setValue] = useState(query);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedQuery = value.trim();

    if (!trimmedQuery) {
      router.push("/search");
      return;
    }

    router.push(
      `/search?query=${encodeURIComponent(trimmedQuery)}`
    );
  }

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <div className="flex-1">
        <form
          onSubmit={handleSubmit}
          className="group flex w-full items-center gap-3 rounded-full border border-border bg-card px-3.5 py-2.5 shadow-sm transition-colors hover:border-primary/40 sm:px-4 sm:py-3"
        >
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />

          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="min-w-0 flex-1 border-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />

          <Button
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary text-primary-foreground shadow-[0_12px_30px_rgba(124,58,237,0.28)]"
            type="submit"
          >
            <Search className="h-4 w-4" />
            Search
          </Button>
        </form>
      </div>
    </div>
  );
}