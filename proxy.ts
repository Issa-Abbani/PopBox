import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";

const publicRoutes = ["/", "/sign-in", "/sign-up", "/reset-password"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Don't interfere with Better Auth
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // Public routes
  if (publicRoutes.includes(pathname)) {
    if (session && pathname !== "/") {
      return NextResponse.redirect(new URL("/home", request.url));
    }

    return NextResponse.next();
  }

  // Protected routes
  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
