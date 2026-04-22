import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("auth_token")?.value;

    if (!token) {
      // Redirect to login if no token
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const secret = process.env.JWT_SECRET || "super-secret-key-corc-admin-2024-development";
      await jwtVerify(token, new TextEncoder().encode(secret));
      return NextResponse.next();
    } catch (error) {
      // Redirect to login if token is invalid or expired
      const loginUrl = new URL("/login", request.url);
      // Optional: Clear invalid cookie
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("auth_token");
      return response;
    }
  }

  // Redirect /login to /admin if already authenticated
  if (pathname === "/login") {
    const token = request.cookies.get("auth_token")?.value;
    if (token) {
      try {
        const secret = process.env.JWT_SECRET || "super-secret-key-corc-admin-2024-development";
        await jwtVerify(token, new TextEncoder().encode(secret));
        return NextResponse.redirect(new URL("/admin", request.url));
      } catch (error) {
        // Token invalid, allow them to stay on /login
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
