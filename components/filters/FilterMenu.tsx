import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

const filters = ["All genres", "Action", "Drama", "Comedy", "Sci-Fi", "Thriller"];

export function FilterMenu() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((filter, index) => (
        <Button
          key={filter}
          variant={index === 0 ? "default" : "secondary"}
          size="sm"
          className={[
            "rounded-full px-3",
            index === 0 ? "bg-primary text-white" : "bg-muted text-foreground",
          ].join(" ")}
        >
          {filter}
        </Button>
      ))}
      <Button variant="outline" size="sm" className="rounded-full gap-2">
        <SlidersHorizontal className="h-3.5 w-3.5" />
        More filters
      </Button>
    </div>
  );
}
