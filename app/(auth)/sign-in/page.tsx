"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Loader from "@/components/layout/Loader";
import { hasEmptyValue } from "@/lib/helpers/isEmpty";
import { signInSchema } from "@/lib/auth/validations/auth";
import { signIn } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const data = {
        email: formData.get("email")?.toString() ?? "",
        password: formData.get("password")?.toString() ?? "",
      };

      if (hasEmptyValue(data)) {
        setError("Error: You cannot have any empty fields");
        return;
      }

      const validation = signInSchema.safeParse(data);

      if (!validation.success) {
        setError("Invalid email or password format");
        return;
      }

      const { error } = await signIn.email({
        email: validation.data.email,
        password: validation.data.password,
      });

      if (error) {
        setError(error.message || "Error: Please try again");
        return;
      }

      router.push("/home");
    } catch {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

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
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Welcome back
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            Sign in
          </h1>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.35 }}
          className="space-y-5"
          onSubmit={(e) => handleSubmit(e)}
        >
          {error.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.35 }}
              className="mb-7"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-error">
                {error}
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
            className="space-y-2"
          >
            <label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="yourEmail@gmail.com"
              className="h-11 w-full rounded-2xl border border-border bg-background px-3.5 text-foreground outline-none ring-0 transition focus:border-primary"
              disabled={isLoading}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.35 }}
            className="space-y-2"
          >
            <label
              htmlFor="password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              className="h-11 w-full rounded-2xl border border-border bg-background px-3.5 text-foreground outline-none transition focus:border-primary"
              disabled={isLoading}
            />
          </motion.div>

          {/* <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.35 }}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <label className="inline-flex items-center gap-2 text-muted-foreground">
              <input type="checkbox" className="h-4 w-4 rounded border-border bg-background" defaultChecked />
              Remember me
            </label>
            <Link href="/reset-password" className="text-primary">Forgot password?</Link>
          </motion.div> */}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.35 }}
          >
            <Button
              type="submit"
              className={`w-full rounded-full text-primary-foreground ${isLoading ? "bg-disabled" : "bg-primary cursor-pointer"}`}
              disabled={isLoading}
            >
              {isLoading ? <Loader /> : "Sign In"}
            </Button>
          </motion.div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.35 }}
          className={`mt-6 text-center text-sm text-muted-foreground ${isLoading ? "hidden" : ""}`}
        >
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="font-medium text-primary">
            Create one
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
