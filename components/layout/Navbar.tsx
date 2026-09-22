"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Film,
  LogOut,
  Menu,
  Settings,
  UserCircle2,
  // Users,
} from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";

import { signOut, useSession } from "@/lib/auth/auth-client";
import NavbarSkeleton from "../ui/skeletons/NavbarSkeleton";
import { useRouter } from "next/navigation";

// const navItems = [
//   { label: "Home", href: "/home" },
//   { label: "Watchlist", href: "/watchlist" },
//   { label: "Favorites", href: "/favorites" },
//   { label: "Watched", href: "/watched" },
// ];

export function Navbar() {
  const { data: session, isPending } = useSession();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const logOut = async () => {
    try {
      const { error } = await signOut();

      if (error) {
        throw new Error(error.message);
      }

      router.push("/sign-in");
    } catch {
      alert("Error in logging out. Try again later.")
    } finally {
      setIsUserMenuOpen(false);
    }
  };

  useEffect(() => {
    if (!isUserMenuOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isUserMenuOpen]);

  const userMenuItems = [
    { label: "Profile", href: "/home", icon: UserCircle2 },
    // { label: "Friends", href: "/home", icon: Users },
    { label: "Settings", href: "/home", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-accent-foreground/70 backdrop-blur-2xl">
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-2 px-3 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            className={` h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm lg:hidden ${!session ? "hidden" : "inline-flex"}`}
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>

          <Link
            href={session ? "/home" : "/"}
            className="flex min-w-0 items-center gap-2"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary to-accent shadow-[0_12px_30px_rgba(124,58,237,0.35)]">
              <Film className="h-4 w-4 text-white" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-base font-semibold tracking-[-0.06em] text-white sm:text-xl">
                PopBox
              </div>
            </div>
          </Link>
        </div>

        {/* <nav className="hidden items-center gap-2 md:flex">
          {(isAuthenticatedRoute ? navItems : [{ label: "About", href: "/about" }, { label: "Discover", href: "/home" }]).map((item) => (
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
          ))}
        </nav> */}

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          {isPending ? (
            <NavbarSkeleton />
          ) : !session ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  className="h-9 rounded-full px-3 text-white text-xs sm:text-sm"
                >
                  Sign in
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="h-9 rounded-full px-3 text-white text-xs sm:text-sm">
                  Sign up
                </Button>
              </Link>
            </div>
          ) : (
            <div ref={userMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen((open) => !open)}
                aria-expanded={isUserMenuOpen}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-full border border-border bg-transparent px-1.5 py-1.5 shadow-sm transition-all duration-200 hover:bg-card md:gap-3 md:border md:bg-card md:px-2"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary to-accent text-sm font-semibold text-white">
                  {session.user.name[0].toString().toUpperCase()}
                </div>
                <div className="hidden pr-1 text-left md:block">
                  <div className="text-sm font-medium text-foreground">
                    {session.user.name.toString()}
                  </div>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isUserMenuOpen ? "rotate-180" : "rotate-0"}`}
                />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 top-[calc(100%+0.6rem)] z-50 w-[calc(100vw-1.5rem)] rounded-2xl border border-border bg-card p-1.5 shadow-[0_20px_45px_rgba(15,23,42,0.18)] sm:w-60">
                  <div className="flex items-center gap-3 border-b border-border px-3 py-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary to-accent text-sm font-semibold text-white">
                      {session.user.name[0].toString().toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {session.user.name.toString()}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </div>

                  <div className="mt-1 space-y-1">
                    {userMenuItems.map(({ label, href, icon: Icon }) => (
                      <Link
                        key={label}
                        href={href}
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
                      >
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <span>{label}</span>
                      </Link>
                    ))}

                    <div className="my-1 h-px bg-border" />

                    <button
                      type="button"
                      onClick={logOut}
                      className="cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-red-500 transition-colors hover:bg-red-500/10"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
