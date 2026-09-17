import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-[0_22px_70px_rgba(0,0,0,0.08)] sm:p-8">
        <div className="mb-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Create account</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">Sign up</h1>
        </div>

        <form className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
            <input id="name" type="text" defaultValue="Alicia Stone" className="h-11 w-full rounded-2xl border border-border bg-background px-3.5 text-foreground outline-none transition focus:border-primary" />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
            <input id="email" type="email" defaultValue="alicia@popbox.app" className="h-11 w-full rounded-2xl border border-border bg-background px-3.5 text-foreground outline-none transition focus:border-primary" />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
            <input id="password" type="password" defaultValue="••••••••" className="h-11 w-full rounded-2xl border border-border bg-background px-3.5 text-foreground outline-none transition focus:border-primary" />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirm-password" className="text-sm font-medium text-foreground">Confirm password</label>
            <input id="confirm-password" type="password" defaultValue="••••••••" className="h-11 w-full rounded-2xl border border-border bg-background px-3.5 text-foreground outline-none transition focus:border-primary" />
          </div>

          <Button type="submit" className="w-full rounded-full bg-primary text-primary-foreground">Sign up</Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account? <Link href="/sign-in" className="font-medium text-primary">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
