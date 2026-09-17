"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-[0_22px_70px_rgba(0,0,0,0.08)] sm:p-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.35 }}
          className="mb-7"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Recover access</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">Reset password</h1>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.35 }}
          className="space-y-5"
        >
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
            className="space-y-2"
          >
            <label htmlFor="reset-email" className="text-sm font-medium text-foreground">Email</label>
            <input id="reset-email" type="email" defaultValue="alicia@popbox.app" className="h-11 w-full rounded-2xl border border-border bg-background px-3.5 text-foreground outline-none transition focus:border-primary" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.35 }}
          >
            <Button type="submit" className="w-full rounded-full bg-primary text-primary-foreground">Reset password</Button>
          </motion.div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.35 }}
          className="mt-6 text-center text-sm text-muted-foreground"
        >
          Remembered it? <Link href="/sign-in" className="font-medium text-primary">Back to sign in</Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
