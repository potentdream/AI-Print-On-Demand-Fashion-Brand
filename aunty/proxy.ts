import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/auth/session";

/**
 * Optimistic auth guard (Next 16: proxy.ts, formerly middleware).
 * Pages still do their own session checks — this only handles redirects.
 */
export async function proxy(request: NextRequest) {
  const session = await verifySession(
    request.cookies.get(SESSION_COOKIE)?.value,
  );
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/home") && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (pathname.startsWith("/login") && session) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*", "/login/:path*", "/home", "/login"],
};
