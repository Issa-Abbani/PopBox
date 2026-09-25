import { Film} from "lucide-react";
import { SidebarButton } from "./SidebarButton";


export function Sidebar() {
  return (
    <aside className="w-full h-full border-b border-border bg-background lg:w-72 lg:border-b-0 lg:border-r lg:fixed z-0">
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
          {/* {items.map(({ href, label, icon: Icon }) => (
            <SidebarButton key={href} href={href} label={label} Icon={Icon}/>
          ))} */}
          <SidebarButton/>
        </nav>

      </div>
    </aside>
  );
}
