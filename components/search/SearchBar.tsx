"use client";
import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
}

export function SearchBar({
  placeholder = "Search movies, genres, actors...",
  onSearch,
  query,
  setQuery,
  loading,
}: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (query.trim() === "") return;

    onSearch?.(query.trim());
  };

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <div className="flex-1">
        <form
          onSubmit={handleSubmit}
          className="group flex w-full items-center gap-3 rounded-full border border-border bg-card px-3.5 py-2.5 shadow-sm transition-colors hover:border-primary/40 sm:px-4 sm:py-3"
        >
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
            placeholder={placeholder}
            className="min-w-0 flex-1 border-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <Button className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground shadow-[0_12px_30px_rgba(124,58,237,0.28)] cursor-pointer" type="submit">
            <Search className="h-4 w-4" />
            Search
          </Button>
        </form>
      </div>
    </div>
  );
}
