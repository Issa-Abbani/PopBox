import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SortMenu() {
  return (
    <Button variant="outline" size="sm" className="gap-2 rounded-full">
      Sort: Popularity
      <ChevronDown className="h-4 w-4" />
    </Button>
  );
}
