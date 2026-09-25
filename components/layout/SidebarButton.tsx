"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Heart, House, ListVideo, Tv, SearchIcon } from "lucide-react";

const items = [
  { href: "/home", label: "Home", icon: House },
  { href: "/search", label: "Search", icon: SearchIcon },
  { href: "/watchlist", label: "Watchlist", icon: ListVideo },
  { href: "/favorites", label: "Favorites", icon: Heart },
  { href: "/watched", label: "Watched", icon: Tv },
];

export function SidebarButton() {
  const pathname = usePathname();

  return (
    <>
      {items.map(({ href, label, icon: Icon }) => {
        const isActive =
          pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all",
              "text-muted-foreground hover:bg-muted hover:text-foreground",
              isActive &&
                "bg-muted text-foreground shadow-inner shadow-white/5",
            )}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground group-hover:bg-card lg:h-9 lg:w-9">
              <Icon className="h-4 w-4" />
            </span>

            <span className="truncate">{label}</span>
          </Link>
        );
      })}
    </>
  );
}
