import Link from "next/link";
import { ArrowRight, BookmarkCheck, Heart, ListTodo, Star } from "lucide-react";

import { Button } from "@/components/ui/button";

const points = [
  {
    icon: ListTodo,
    title: "Track what you watch",
    description: "Log movies you have seen, revisit your favorites, and build a library that reflects your taste.",
  },
  {
    icon: BookmarkCheck,
    title: "Build a watchlist",
    description: "Save titles you want to see, keep them organized, and revisit them when the mood strikes.",
  },
  {
    icon: Heart,
    title: "Favorite what moves you",
    description: "Collect the films that resonate, whether they are comfort watches or cinematic surprises.",
  },
  {
    icon: Star,
    title: "Rate and remember",
    description: "Capture personal ratings and notes so your movie history has real context and personality.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-4xl border border-border bg-card p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">About PopBox</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.08em] text-foreground md:text-6xl">Your cinema life, in one beautiful place.</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
              PopBox is a cinematic dashboard for tracking what you have watched, what you want to watch, and what deserves a permanent place in your favorites.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/sign-up">
                <Button className="rounded-full bg-primary text-white">Join PopBox</Button>
              </Link>
              <Link href="/sign-in">
                <Button variant="outline" className="rounded-full">Sign in</Button>
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] border border-border bg-linear-to-br from-muted to-card p-5">
            <div className="grid gap-3">
              {[
                ["16", "Movies this month"],
                ["4", "Upcoming picks"],
                ["128", "Tracked titles"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-border bg-card p-4">
                  <div className="text-3xl font-semibold tracking-[-0.08em] text-foreground">{value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {points.map(({ icon: Icon, title, description }) => (
          <article key={title} className="rounded-[28px] border border-border bg-card p-5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold tracking-tighter text-foreground">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-4xl border border-border bg-linear-to-r from-primary/15 via-accent/10 to-transparent p-6 sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Ready to begin?</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-foreground">Keep a closer watch on every movie.</h2>
          </div>
          <Link href="/sign-up">
            <Button className="rounded-full bg-primary text-white">
              Create account
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
