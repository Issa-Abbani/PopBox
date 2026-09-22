export default function NavbarSkeleton() {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <div className="h-10 w-10 animate-pulse rounded-full border border-border bg-card" />

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1.5 shadow-sm md:gap-3 md:px-2 md:py-1.5">
          <div className="flex h-8 w-8 shrink-0 animate-pulse items-center justify-center rounded-full bg-muted" />
          <div className="hidden h-4 w-24 animate-pulse rounded-full bg-muted md:block" />
        </div>
      </div>
    </div>
  );
}
