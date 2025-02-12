import { NextRequest, NextResponse } from "next/server";
import { decrypt, SessionPayload } from "@/app/auth/session";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
const protectedRoutes = ["/"];
const publicRoutes = ["/auth", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  const session = (await decrypt(cookie)) as SessionPayload;

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/auth", req.nextUrl));
  }

  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith("/")
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // if (
  //   session?.role !== "admin" &&
  //   (req.nextUrl.pathname.startsWith("/admins") ||
  //     req.nextUrl.pathname.startsWith("/equipment"))
  // ) {
  //   return NextResponse.redirect(new URL("/", req.nextUrl));
  // }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
