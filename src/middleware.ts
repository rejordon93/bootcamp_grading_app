import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Middleware function to handle redirects based on authentication state
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths
  const isPublicPath = path === "/login" || path === "/signup";
  const isProtectedPath = path === "/profile" || path.startsWith("/profile");

  // Get the token from cookies
  const token = request.cookies.get("token")?.value || "";

  // If the user is authenticated and trying to access login or signup, redirect to the homepage
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // If the user is trying to access protected routes like profile without being logged in, redirect to login
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // If the user is trying to access logout without being logged in, redirect to login
  if (path === "/logout" && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // If none of the above conditions match, proceed normally (no redirection)
  return NextResponse.next();
}

// Matcher configuration for which routes the middleware should apply to
export const config = {
  matcher: ["/", "/profile/:path*", "/login", "/signup", "/logout"],
};
