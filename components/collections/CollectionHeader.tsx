export function CollectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Your library</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.06em] text-foreground sm:text-3xl md:text-4xl">{title}</h1>
        </div>
        <p className="w-fit rounded-full text-sm">{subtitle}</p>
      </div>
    </div>
  );
}
