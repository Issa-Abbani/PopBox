export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-6">
      <div className="flex items-center gap-3 rounded-full border border-border bg-card px-4 py-3 text-sm text-muted-foreground shadow-sm">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
        Loading PopBox...
      </div>
    </div>
  );
}
