import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-10">
      <div className="max-w-md rounded-[30px] border border-border bg-card p-8 text-center shadow-[0_18px_60px_rgba(0,0,0,0.06)]">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-2xl">🕵️</div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Not found</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-foreground">This screen isn’t in the archive</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">The page you were looking for is missing or has moved elsewhere in PopBox.</p>
        <Link href="/home">
          <Button className="mt-6 rounded-full bg-primary text-primary-foreground">Back to home</Button>
        </Link>
      </div>
    </div>
  );
}
