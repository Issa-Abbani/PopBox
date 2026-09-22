import { betterAuth } from "better-auth";
import { pool } from "../db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const auth = betterAuth({
  database: pool,

  emailAndPassword: {
    enabled: true,
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
});

//Session authentication checks


//This one simply checks and returns the session (Mainly useful for components that change visaully because of the auth state like the navbar component)
export const getSession = async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
};

//This one is responsible for redirecting users to the sign in page if not authenticated and also returns the session if authenticated
export const requireSession = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return session;
};
