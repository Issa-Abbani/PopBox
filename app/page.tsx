"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookmarkCheck,
  Clapperboard,
  Heart,
  ListTodo,
  Play,
  Sparkles,
  Star,
  Tickets,
} from "lucide-react";

const points = [
  {
    icon: Clapperboard,
    title: "Discover films",
    description:
      "Find standout releases, fresh classics, and hidden gems without endless scrolling.",
  },
  {
    icon: ListTodo,
    title: "Keep a clean library",
    description:
      "Organize the titles you care about in one elegant, easy-to-scan space.",
  },
  {
    icon: Heart,
    title: "Save what you love",
    description:
      "Collect the films that resonate and revisit them whenever your mood shifts.",
  },
  {
    icon: Star,
    title: "Rate and rewind",
    description:
      "Capture the movies worth returning to and build a personal taste profile over time.",
  },
];

const steps = [
  {
    number: "01",
    title: "Browse by mood",
    text: "Explore curated picks for late-night thrillers, comfort comedies, epic adventures, and everything in between.",
  },
  {
    number: "02",
    title: "Keep only the best",
    text: "Save standout films and instantly keep your watchlist focused on the movies you actually want to see.",
  },
  {
    number: "03",
    title: "Build a cinematic rhythm",
    text: "Rate and revisit the titles that matter most so your movie life evolves with every viewing.",
  },
];

const moods = [
  "Late-night thrillers",
  "Feel-good favorites",
  "Mind-bending sci-fi",
  "Award-season picks",
  "Cinematic classics",
  "Weekend marathons",
];

const stats = [
  { value: "12k+", label: "movie picks" },
  { value: "4.9/5", label: "curation score" },
  { value: "48h", label: "average discovery time" },
  { value: "100%", label: "cinema-first design" },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55 },
};

export default function RootPage() {
  return (
    <main className="min-h-screen px-3 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:gap-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-4xl border border-border/80 bg-card/80 p-5 shadow-[0_24px_80px_rgba(124,58,237,0.12)] backdrop-blur-sm sm:p-8 lg:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="flex flex-col justify-center">

              <h1 className="mt-5 max-w-xl text-4xl font-semibold tracking-[-0.08em] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                Your next favorite movie starts here.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                A cinematic destination for discovering the right film, organizing what matters,
                and making every movie night feel curated rather than chaotic.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/sign-in">
                  <Button variant="secondary" className="w-full rounded-full px-5 sm:w-auto cursor-pointer">
                    Sign in
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="w-full rounded-full bg-primary px-5 text-white shadow-[0_12px_30px_rgba(124,58,237,0.35)] sm:w-auto">
                    Get started
                  </Button>
                </Link>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
              className="rounded-[28px] border border-border bg-card-elevated p-3 sm:p-4"
            >
              <div className="relative overflow-hidden rounded-3xl border border-border bg-linear-to-br from-primary/18 via-card to-accent/12 p-4 sm:p-5 flex justify-center gap-2 items-center lg:text-5xl text-lg font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                <Sparkles className="lg:h-20 lg:w-20 text-primary" />
                Popbox
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          {...reveal}
          className="rounded-[28px] border border-border bg-card/80 p-5 backdrop-blur-sm sm:p-6 lg:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="rounded-[20px] border border-border bg-muted/60 p-4 text-center">
                <p className="text-3xl font-semibold tracking-[-0.06em] text-foreground sm:text-4xl">
                  {value}
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section id="features" {...reveal} className="rounded-[28px] border border-border bg-card/80 p-5 backdrop-blur-sm sm:p-6 lg:p-8">
          <div className="mb-6 flex flex-col gap-2 sm:mb-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Why PopBox
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.06em] text-foreground sm:text-4xl">
              A cleaner way to keep your movie life organized.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {points.map(({ icon: Icon, title, description }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className="rounded-3xl border border-border bg-card p-5 shadow-[0_18px_50px_rgba(15,23,42,0.04)]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold tracking-tighter text-foreground">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section {...reveal} className="rounded-[28px] border border-border bg-card/80 p-5 sm:p-6 lg:p-8">
          <div className="mb-6 flex flex-col gap-2 sm:mb-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              How it works
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.06em] text-foreground sm:text-4xl">
              Discover, save, and revisit without the clutter.
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {steps.map(({ number, title, text }) => (
              <motion.article
                key={number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl border border-border bg-linear-to-br from-card to-muted/60 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">{number}</p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tighter text-foreground">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section {...reveal} className="rounded-[1.75rem] border border-border bg-linear-to-br from-primary/10 via-card to-accent/8 p-5 sm:p-6 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Pick your mood
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-foreground sm:text-4xl">
                The right film for every kind of evening.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                From sharp thrillers to warm classics, PopBox helps you move from “what should I watch?”
                to “this is exactly the right movie for tonight.”
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {moods.map((mood, index) => (
                <motion.div
                  key={mood}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="flex items-center gap-3 rounded-[18px] border border-border bg-card p-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {index % 2 === 0 ? <Play className="h-4 w-4 fill-current" /> : <Tickets className="h-4 w-4" />}
                  </div>
                  <span className="text-sm font-medium text-foreground">{mood}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section {...reveal} className="rounded-[28px] border border-border bg-card/80 p-5 sm:p-6 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Built for film lovers
              </p>
              <h2 className="text-3xl font-semibold tracking-[-0.06em] text-foreground sm:text-4xl">
                Thoughtful tools, quiet luxury, and a better way to watch.
              </h2>
              <p className="text-base leading-7 text-muted-foreground">
                PopBox is designed for people who love the ritual of discovering a great film, keeping a
                sharp eye on what they want to watch next, and celebrating the movies that become part of their life.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-linear-to-br from-muted to-card p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Tonight&apos;s queue</p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">7 titles</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <BookmarkCheck className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  ["Neon Skyline", "4.8"],
                  ["Glass Harbor", "4.7"],
                  ["Midnight Echoes", "4.9"],
                ].map(([name, score]) => (
                  <div key={name} className="flex items-center justify-between rounded-2xl border border-border bg-card px-3 py-2.5">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-linear-to-br from-primary/30 to-accent/50" />
                      <span className="text-sm font-medium text-foreground">{name}</span>
                    </div>
                    <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                      {score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section {...reveal} className="rounded-[1.75rem] border border-border bg-linear-to-r from-primary/12 via-accent/8 to-transparent p-5 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Ready when you are
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-foreground sm:text-4xl">
                Build a movie life that feels personal, elegant, and easy to revisit.
              </h2>
            </div>
            <Link href="/sign-up">
              <Button className="w-full rounded-full bg-primary px-5 text-white sm:w-auto">
                Create account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
