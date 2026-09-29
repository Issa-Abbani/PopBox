import { MovieGrid } from "@/components/movies/MovieGrid";
import { SectionHeading } from "@/components/ui/section-heading";
import { getLatestMoviesHome } from "@/lib/movies/getLatestMovies";
import { ArrowRight } from "lucide-react";
import HomePage from "@/components/animated/HomePage";

import type {
  OmdbSearchResult,
  OmdbSearchResponse
} from "@/types/movies/movieTypes";

import Link from "next/link";

export default async function Home() {

  const response: OmdbSearchResponse = await getLatestMoviesHome();

  if(response.Response === "False") throw new Error("Couldn't fetch movies")
  
  const movies: OmdbSearchResult[] = response.Search ?? [];

  const moviesToRender = movies.slice(0,6)


  return (
    <div
      className={`space-y-8 p-6`}
    >
      <HomePage movies={movies}/>
     
          {/*latest movies*/}
          <section className="space-y-5">

            <div className="flex items-center justify-between">
              <SectionHeading eyebrow="Discover" title="Most Popular" />
                <Link href="/search" className="hidden gap-2 rounded-full md:inline-flex">
                  Search
                  <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
            <MovieGrid movies={moviesToRender} />
          </section>
    </div>
  );
}
