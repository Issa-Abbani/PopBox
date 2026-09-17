import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function RootPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-4xl border border-border bg-card p-8 text-center shadow-[0_24px_80px_rgba(124,58,237,0.12)]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">PopBox</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.08em] text-foreground sm:text-6xl">Track your next favorite movie.</h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Discover, save, rate, and revisit cinematic favorites in a premium movie-tracking experience built for film lovers.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link href="/about">
            <Button variant="secondary" className="rounded-full">Learn more</Button>
          </Link>
          <Link href="/sign-up">
            <Button className="rounded-full bg-primary text-white">Get started</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
