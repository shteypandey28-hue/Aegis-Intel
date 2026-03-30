import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  // User denied access on Google consent screen
  if (error) {
    return NextResponse.redirect(new URL('/login?error=google_denied', request.url))
  }

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=no_code', request.url))
  }

  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const redirectUri = process.env.GOOGLE_REDIRECT_URI

  if (!clientId || !clientSecret || !redirectUri) {
    console.error('Google OAuth not configured. Missing env vars.')
    return NextResponse.redirect(new URL('/login?error=not_configured', request.url))
  }

  try {
    // 1. Exchange authorization code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    })

    if (!tokenRes.ok) {
      const errText = await tokenRes.text()
      console.error('Google token exchange failed:', errText)
      return NextResponse.redirect(new URL('/login?error=token_exchange', request.url))
    }

    const tokens = await tokenRes.json()

    if (!tokens.access_token) {
      console.error('No access_token in Google response:', tokens)
      return NextResponse.redirect(new URL('/login?error=no_token', request.url))
    }

    // 2. Fetch user profile from Google
    const profileRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    })

    if (!profileRes.ok) {
      console.error('Google profile fetch failed:', await profileRes.text())
      return NextResponse.redirect(new URL('/login?error=profile_fetch', request.url))
    }

    const profile = await profileRes.json()

    // 3. Build session data
    const sessionData = JSON.stringify({
      id: profile.id,
      email: profile.email,
      name: profile.name,
      picture: profile.picture,
      provider: 'google',
      loginAt: new Date().toISOString(),
    })

    // 4. Create redirect response and set cookie on the response itself
    //    (Using cookies() API in a redirect doesn't persist — must set on the Response)
    const redirectUrl = new URL('/dashboard', request.url)
    const response = NextResponse.redirect(redirectUrl)

    response.cookies.set('aegis_session', sessionData, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return response
  } catch (err) {
    console.error('Google OAuth callback error:', err)
    return NextResponse.redirect(new URL('/login?error=server_error', request.url))
  }
}
