import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;

  // If it's the root path, just render it
  if (path === "/") {
    return NextResponse.next();
  }

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session && path === "/admin/home") {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  } else if (
    session &&
    (path === "/admin/login" || path === "/admin/register")
  ) {
    return NextResponse.redirect(new URL("/admin/home", req.url));
  }

  if (!session && path === "/user/home") {
    return NextResponse.redirect(new URL("/user/login", req.url));
  } else if (session && (path === "/user/login" || path === "/user/register")) {
    return NextResponse.redirect(new URL("/user/home", req.url));
  }
  return NextResponse.next();
}
