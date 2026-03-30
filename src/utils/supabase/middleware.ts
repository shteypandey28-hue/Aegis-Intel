import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({ request })
  const pathname = request.nextUrl.pathname

  // ── Skip middleware for API auth routes (Google OAuth flow) ──
  if (pathname.startsWith('/api/auth')) {
    return supabaseResponse
  }

  // ── Check for session cookie (set by login action) ──
  const aegisSession = request.cookies.get('aegis_session')?.value
  let isAuthenticated = false
  if (aegisSession) {
    try {
      const data = JSON.parse(aegisSession)
      isAuthenticated = !!(data.email && data.provider)
    } catch {}
  }

  // ── Route classification ──
  const isAuthRoute = pathname === '/login'
  const isProtectedRoute =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/alerts') ||
    pathname.startsWith('/settings') ||
    pathname.startsWith('/analytics') ||
    pathname.startsWith('/species') ||
    pathname.startsWith('/profile')

  // ── Redirect logic ──
  if (isProtectedRoute && !isAuthenticated) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (isAuthRoute && isAuthenticated) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
