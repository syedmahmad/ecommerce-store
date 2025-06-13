import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/dashboard", "/dashboard/products", "/dashboard/settings"];
const authPaths = ["/login", "/register", "/forgot-password", "/reset-password"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const host = request.headers.get("host") || "";
  const url = request.nextUrl;

  // 🚨 Debug logs (remove after verification)
  console.log('\n--- Middleware Triggered ---');
  console.log('Host:', host);
  console.log('Path:', path);

  // 🚦 Skip middleware for static files and API routes
  if (
    path.startsWith('/_next/') || 
    path.startsWith('/api/') ||
    path.startsWith('/favicon.ico') ||
    path.match(/\.[a-z0-9]+$/i) // Skip files with extensions
  ) {
    return NextResponse.next();
  }

  // 🌐 Subdomain Detection
  const isLocalDev = process.env.NODE_ENV === 'development';
  const domainPattern = isLocalDev
    ? /^(store\d+)\.localhost(?::\d+)?$/ // Local: store1.localhost:3000
    : /^(store\d+)\.zylospace\.com$/;    // Prod: store1.zylospace.com

  const match = host.match(domainPattern);

  // Case 1: Store Subdomain Handling
  if (match?.[1]) {
    const storeId = match[1].replace('store', '');
    
    // 🛑 Prevent infinite rewrite loops
    if (path.startsWith(`/store/${storeId}`)) {
      console.log('Skipping rewrite (already rewritten)');
      return NextResponse.next();
    }

    // 🔄 Rewrite to internal path
    const newPath = `/store/${storeId}${path === '/' ? '' : path}`;
    console.log(`Rewriting ${host}${path} → ${newPath}`);
    
    url.pathname = newPath;
    return NextResponse.rewrite(url);
  }

  // Case 2: Root Domain Handling
  const isRootDomain = [
    'zylospace.com', 
    'www.zylospace.com', 
    'localhost'
  ].some(domain => host.includes(domain));

  if (isRootDomain) {
    return handleAuthLogic(request, path);
  }

  // Case 3: Unknown Subdomain → 404
  console.log('Unknown subdomain - returning 404');
  return new NextResponse(null, { status: 404 });
}

// 🔒 Auth Logic Helper
async function handleAuthLogic(request: NextRequest, path: string) {
  const isProtectedPath = protectedPaths.some(prefix => path.startsWith(prefix));
  const isAuthPath = authPaths.some(prefix => path.startsWith(prefix));
  const token = await request.cookies.get("authToken")?.value;

  // Debug
  console.log('Auth check - Protected:', isProtectedPath, 'Auth:', isAuthPath, 'Has Token:', !!token);

  if (isProtectedPath && !token) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(redirectUrl);
  }

  if ((isAuthPath || path === "/") && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)' // Skip static files
  ],
};