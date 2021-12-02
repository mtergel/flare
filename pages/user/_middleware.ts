import jwt from "@tsndr/cloudflare-worker-jwt";
import { NextRequest, NextResponse } from "next/server";

/**
 * Verifies the user's JWT token and returns the payload if
 * it's valid or a response if it's not.
 */
export async function middleware(request: NextRequest) {
  const token = request.cookies["sb:token"]; //'sb:token' is the default cookie name

  if (!token || !(await jwt.verify(token, process.env.SUPABASE_JWT_SECRET!))) {
    return NextResponse.redirect("/enter", 302); // If a user is not authenticated (either no token was send, or the token is invalid) redirect the user to the homepage where they will be presented with a log-in screen
  }

  return NextResponse.next(); // continue the middleware chain https://nextjs.org/docs/api-reference/next/server#nextresponse
}
