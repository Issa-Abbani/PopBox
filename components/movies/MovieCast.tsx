import { MediaImage } from "@/components/ui/media-image";
import type { MovieCastMember } from "@/lib/mock-data";

export function MovieCast({ cast }: { cast: MovieCastMember[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cast.map((member) => (
        <div key={member.name} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
          <div className="relative h-14 w-14 overflow-hidden rounded-full">
            <MediaImage src={member.avatar} alt={member.name} fill className="object-cover" sizes="56px" fallbackClassName="h-full w-full" />
          </div>
          <div>
            <div className="font-medium text-foreground">{member.name}</div>
            <div className="text-sm text-muted-foreground">{member.character}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
