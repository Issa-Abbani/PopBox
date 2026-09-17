"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles } from "lucide-react";

import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";

// const navItems = [
//   { label: "Home", href: "/home" },
//   { label: "Watchlist", href: "/watchlist" },
//   { label: "Favorites", href: "/favorites" },
//   { label: "Watched", href: "/watched" },
// ];

export function Navbar() {
  const pathname = usePathname();
  const isAuthenticatedRoute = pathname.startsWith("/home") || pathname.startsWith("/watchlist") || pathname.startsWith("/favorites") || pathname.startsWith("/watched") || pathname.startsWith("/movies");
  const isAuthRoute = pathname.startsWith("/sign") || pathname.startsWith("/reset") || pathname === "/";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-accent-foreground/70 backdrop-blur-2xl">
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-2 px-3 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>

          <Link href={isAuthenticatedRoute ? "/home" : "/"} className="flex min-w-0 items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary to-accent shadow-[0_12px_30px_rgba(124,58,237,0.35)]">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-base font-semibold tracking-[-0.06em] text-white sm:text-xl">PopBox</div>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          {/* {(isAuthenticatedRoute ? navItems : [{ label: "About", href: "/about" }, { label: "Discover", href: "/home" }]).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "rounded-full px-3 py-2 text-sm font-medium transition-all",
                pathname === item.href || (item.href === "/home" && pathname === "/")
                  ? "bg-primary/15 text-foreground shadow-[inset_0_0_0_1px_rgba(124,58,237,0.08)]"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))} */}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">

          <ThemeToggle />

          {isAuthRoute ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link href="/sign-in">
                <Button variant="ghost" className="h-9 rounded-full px-3 text-xs sm:text-sm">Sign in</Button>
              </Link>
              <Link href="/sign-up">
                <Button className="h-9 rounded-full px-3 text-xs sm:text-sm">Sign up</Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="items-center md:gap-3 rounded-full md:border md:border-border bg-transparent md:bg-card md:px-2 md:py-1.5 shadow-sm flex cursor-pointer">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary to-accent text-sm font-semibold text-white">
                  I
                </div>
                <div className="pr-1 text-left">
                  <div className="text-sm font-medium text-foreground hidden md:block">Issa Abbani</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
