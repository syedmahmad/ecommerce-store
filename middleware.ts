import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = [
  "/dashboard",
  "/dashboard/products",
  "/dashboard/settings",
];
const authPaths = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const host = request.headers.get("host") || "";
  const url = request.nextUrl;

  // Skip middleware for static files and API routes
  if (
    path.startsWith("/_next/") ||
    path.startsWith("/api/") ||
    path.startsWith("/favicon.ico") ||
    path.match(/\.[a-z0-9]+$/i)
  ) {
    return NextResponse.next();
  }

  // Detect environment
  const isLocalDev = process.env.NODE_ENV === "development";
  const domainPattern = isLocalDev
    ? /^([a-zA-Z0-9-]+)\.localhost(?::\d+)?$/ // Local: myawesomestore.localhost:3000
    : /^([a-zA-Z0-9-]+)\.zylospace\.com$/; // Prod: mystore.zylospace.com

  const match = host.match(domainPattern);
  const subdomain = match ? match[1] : undefined;

  // ✅ Root domain → normal Next.js routing (app/page.tsx)
  const isRootDomain =
    host === "localhost" ||
    host.startsWith("localhost:") || // allow localhost with any port
    host === "zylospace.com" ||
    host === "www.zylospace.com";

  if (isRootDomain) {
    return handleAuthLogic(request, path);
  }

  // ✅ Subdomain handling
  if (subdomain) {
    // Don’t rewrite if it’s already under /store/
    if (path.startsWith(`/store/`)) {
      return NextResponse.next();
    }

    let storeId = subdomain;
    if (!subdomain.startsWith("store")) {
      try {
        // Resolve subdomain to storeId
        const response = await fetch(
          `${request.nextUrl.origin}/api/resolve-store?subdomain=${subdomain}`
        );
        const data = await response.json();
        storeId = data.storeId || subdomain;
      } catch (error) {
        console.error("Failed to resolve store:", error);
      }
    }

    // Rewrite only for subdomains
    const newPath = `/store/${storeId}${path === "/" ? "" : path}`;
    url.pathname = newPath;
    return NextResponse.rewrite(url);
  }

  // Unknown subdomain → 404
  return new NextResponse(null, { status: 404 });
}

// 🔒 Auth logic
async function handleAuthLogic(request: NextRequest, path: string) {
  const isProtectedPath = protectedPaths.some((prefix) =>
    path.startsWith(prefix)
  );
  const isAuthPath = authPaths.some((prefix) => path.startsWith(prefix));
  const token = request.cookies.get("authToken")?.value;

  if (isProtectedPath && !token) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("callbackUrl", encodeURI(request.url));
    return NextResponse.redirect(redirectUrl);
  }

  if ((isAuthPath || path === "/") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
