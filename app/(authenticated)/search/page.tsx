import { Suspense } from "react";
import SearchPageContent from "@/components/search/SearchPageContent";

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SearchPageContent searchParams={searchParams} />
    </Suspense>
  );
}
