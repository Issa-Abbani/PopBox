import Link from "next/link";
import { Film, Heart, House, ListVideo, Sparkles, Tv } from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  { href: "/home", label: "Home", icon: House },
  { href: "/watchlist", label: "Watchlist", icon: ListVideo },
  { href: "/favorites", label: "Favorites", icon: Heart },
  { href: "/watched", label: "Watched", icon: Tv },
];

export function Sidebar() {
  return (
    <aside className="w-full border-b border-border bg-background lg:w-72 lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col gap-4 p-3 sm:p-4 lg:gap-8 lg:p-5">
        <div className="rounded-2xl border border-border bg-linear-to-br from-card to-muted p-3 lg:p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Quick stats</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Film className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xl font-semibold text-foreground">128</div>
              <div className="text-xs text-muted-foreground">movies tracked</div>
            </div>
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:space-y-2">
          {items.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all",
                "text-muted-foreground hover:bg-muted hover:text-foreground",
                href === "/home" && "bg-muted text-foreground shadow-inner shadow-white/5",
              )}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground group-hover:bg-card lg:h-9 lg:w-9">
                <Icon className="h-4 w-4" />
              </span>
              <span className="truncate">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto rounded-2xl border border-border bg-card p-3 lg:p-4">
          <div className="mb-3 flex items-center gap-2 text-foreground">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium">This week</span>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-between gap-3">
              <span className="truncate">New picks</span>
              <span className="font-medium text-foreground">12</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="truncate">Upcoming</span>
              <span className="font-medium text-foreground">4</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
