import { Suspense } from "react";
import SearchPageContent from "@/components/search/SearchPageContent";
import Loader from "@/components/layout/Loader";

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader />
        </div>
      }
    >
      <SearchPageContent searchParams={searchParams} />
    </Suspense>
  );
}
