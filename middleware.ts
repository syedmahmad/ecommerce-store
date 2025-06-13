import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/dashboard", "/dashboard/products", "/dashboard/settings"];
const authPaths = ["/login", "/register", "/forgot-password", "/reset-password"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const host = request.headers.get("host") || "";
  const url = request.nextUrl;

  // 🚦 Skip middleware for API/internal paths
  if (path.startsWith('/_next/') || path.startsWith('/api/')) {
    return NextResponse.next();
  }

const isLocalDev = process.env.NODE_ENV === 'development';
const domainPattern = isLocalDev
  ? /^(store\d+)\.localhost(?::\d+)?$/
  : /^(store\d+)\.zylospace\.com$/;

const match = host.match(domainPattern);

if (match?.[1]) {
  const storeId = match[1].replace('store', '');
  const url = request.nextUrl;
  url.pathname = `/store/${storeId}${url.pathname === '/' ? '' : url.pathname}`;
  return NextResponse.rewrite(url);
}
  // const match = host.match(domainPattern);
  
  // Case 1: Store Subdomain (store2.zylospace.com → /store/2)
  if (match?.groups?.subdomain) {
    const storeId = match.groups.subdomain.replace('store', '');
    url.pathname = `/store/${storeId}${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // Case 2: Root Domain Handling
  const isRootDomain = ['zylospace.com', 'www.zylospace.com', 'localhost'].some(d => host.includes(d));
  if (isRootDomain) {
    return handleAuthLogic(request, path);
  }

  // Case 3: Unknown Subdomain → 404
  return new NextResponse(null, { status: 404 });
}

// 🔒 Existing Auth Logic (No changes needed)
async function handleAuthLogic(request: NextRequest, path: string) {
  const isProtectedPath = protectedPaths.some((prefix) => path.startsWith(prefix));
  const isAuthPath = authPaths.some((prefix) => path.startsWith(prefix));
  const token = await request.cookies.get("authToken")?.value;

  if (isProtectedPath && !token) {
    const url = new URL(`/login`, request.url);
    url.searchParams.set("callbackUrl", encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  if ((isAuthPath || path === "/") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)",
};