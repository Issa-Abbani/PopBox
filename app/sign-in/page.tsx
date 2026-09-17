import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function SignInPage() {
  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-[0_22px_70px_rgba(0,0,0,0.08)] sm:p-8">
        <div className="mb-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Welcome back</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">Sign in</h1>
        </div>

        <form className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
            <input id="email" type="email" defaultValue="alicia@popbox.app" className="h-11 w-full rounded-2xl border border-border bg-background px-3.5 text-foreground outline-none ring-0 transition focus:border-primary" />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
            <input id="password" type="password" defaultValue="••••••••" className="h-11 w-full rounded-2xl border border-border bg-background px-3.5 text-foreground outline-none transition focus:border-primary" />
          </div>

          <div className="flex items-center justify-between gap-3 text-sm">
            <label className="inline-flex items-center gap-2 text-muted-foreground">
              <input type="checkbox" className="h-4 w-4 rounded border-border bg-background" defaultChecked />
              Remember me
            </label>
            <Link href="/reset-password" className="text-primary">Forgot password?</Link>
          </div>

          <Button type="submit" className="w-full rounded-full bg-primary text-primary-foreground">Sign in</Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account? <Link href="/sign-up" className="font-medium text-primary">Create one</Link>
        </div>
      </div>
    </div>
  );
}
