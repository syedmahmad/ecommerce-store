import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

const protectedPaths = ["/dashboard", "/dashboard/products", "/dashboard/settings"]
const authPaths = ["/login", "/register", "/forgot-password", "/reset-password"]

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isProtectedPath = protectedPaths.some((prefix) => path.startsWith(prefix))
  const isAuthPath = authPaths.some((prefix) => path.startsWith(prefix))

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (isProtectedPath && !token) {
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  if ((isAuthPath || path === "/") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)"],
}
