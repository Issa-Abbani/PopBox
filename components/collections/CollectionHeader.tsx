import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search/SearchBar";
import { SortMenu } from "@/components/filters/SortMenu";
import { FilterMenu } from "@/components/filters/FilterMenu";

export function CollectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Your library</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.06em] text-foreground sm:text-3xl md:text-4xl">{title}</h1>
        </div>
        <Button variant="secondary" className="w-fit rounded-full px-3 text-sm sm:px-4">{subtitle}</Button>
      </div>

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="w-full xl:max-w-xl">
          <SearchBar placeholder="Search in your collection..." />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <FilterMenu />
          <SortMenu />
        </div>
      </div>
    </div>
  );
}
