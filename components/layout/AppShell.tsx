import type { ReactNode } from "react";

import { Sidebar } from "@/components/layout/Sidebar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-73px)] w-full flex-col bg-background lg:flex-row">
      <Sidebar />
      <main className="flex-1 lg:ml-72 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.08),transparent_28%)]">{children}</main>
    </div>
  );
}
