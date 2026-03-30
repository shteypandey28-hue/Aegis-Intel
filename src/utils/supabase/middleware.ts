import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })
  const pathname = request.nextUrl.pathname

  // ── Skip middleware for API auth routes (Google OAuth flow) ──
  if (pathname.startsWith('/api/auth')) {
    return supabaseResponse
  }

  // ── Check for Google OAuth session (our own cookie) ──
  const aegisSession = request.cookies.get('aegis_session')?.value
  let hasGoogleSession = false
  if (aegisSession) {
    try {
      const data = JSON.parse(aegisSession)
      hasGoogleSession = !!(data.email && data.provider)
    } catch {}
  }

  // ── Check Supabase session (if not in mock mode) ──
  const isMockMode =
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://mock.supabase.co'

  let hasSupabaseUser = false

  if (!isMockMode) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({ request })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    hasSupabaseUser = !!user
  }

  // ── Combined auth check: user is authenticated via ANY method ──
  const isAuthenticated = hasGoogleSession || hasSupabaseUser || isMockMode

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
  // Not logged in → trying to access protected page → send to login
  if (isProtectedRoute && !isAuthenticated) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Already logged in → trying to access login page → send to dashboard
  if (isAuthRoute && isAuthenticated && !isMockMode) {
    // Only redirect away from login if actually authenticated (not just mock mode)
    if (hasGoogleSession || hasSupabaseUser) {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
