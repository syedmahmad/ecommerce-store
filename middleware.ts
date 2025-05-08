import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

// List of paths that require authentication
const protectedPaths = ["/dashboard", "/dashboard/products", "/dashboard/settings"]

// List of paths that are for authentication
const authPaths = ["/login", "/register", "/forgot-password", "/reset-password"]


export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some((prefix) => path.startsWith(prefix))

  // Check if the path is an auth path
  const isAuthPath = authPaths.some((prefix) => path.startsWith(prefix))

  // Get the token
  // const token = await getToken({
  //   req: request,
  //   secret: process.env.NEXTAUTH_SECRET || "your-development-secret-key",
  // })

  const token = await request.cookies.get("authToken")?.value

  // If the path is protected and there's no token, redirect to login
  if (isProtectedPath && !token) {
    const url = new URL(`/login`, request.url)
    url.searchParams.set("callbackUrl", encodeURI(request.url))
    return NextResponse.redirect(url)
  }

  // If the user is logged in and trying to access an auth page, redirect to dashboard
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }
  
 // ✅ If user is logged in and tries to visit an auth page, redirect to /dashboard
 if ((isAuthPath || path === "/") && token) {
  return NextResponse.redirect(new URL("/dashboard", request.url))
}

return NextResponse.next()
  
}



// Configure the paths that should invoke this middleware
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside /public)
     * 4. /examples (inside /public)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)",
  ],
}
