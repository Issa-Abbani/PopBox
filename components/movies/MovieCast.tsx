export function MovieCast({ actors }: { actors: string }) {
  const cast = actors && actors !== "N/A" ? actors.split(",").map((member) => member.trim()).filter(Boolean) : [];

  if (cast.length === 0) {
    return <p className="text-sm text-muted-foreground">Cast information is not available for this title.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cast.map((member) => (
        <div key={member} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {member
              .split(" ")
              .slice(0, 2)
              .map((part) => part[0])
              .join("")
              .toUpperCase()}
          </div>
          <div>
            <div className="font-medium text-foreground">{member}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
