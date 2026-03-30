'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

// Helper to set a session cookie (used by both mock login and Google OAuth)
async function setSessionCookie(data: { email: string; name?: string; provider: string }) {
  const cookieStore = await cookies()
  cookieStore.set('aegis_session', JSON.stringify({
    id: `mock_${Date.now()}`,
    email: data.email,
    name: data.name || data.email.split('@')[0],
    picture: null,
    provider: data.provider,
    loginAt: new Date().toISOString(),
  }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const isMockMode =
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://mock.supabase.co'

  if (!isMockMode) {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      return { error: error.message }
    }
  }

  // Always set our session cookie (works for both mock and real mode)
  await setSessionCookie({ email, provider: isMockMode ? 'mock' : 'email' })

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const isMockMode =
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://mock.supabase.co'

  if (!isMockMode) {
    const supabase = await createClient()
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      return { error: error.message }
    }
  }

  await setSessionCookie({ email, provider: isMockMode ? 'mock' : 'email' })

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function logout() {
  const isMockMode =
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://mock.supabase.co'

  if (!isMockMode) {
    const supabase = await createClient()
    await supabase.auth.signOut()
  }

  // Clear session cookie
  const cookieStore = await cookies()
  cookieStore.delete('aegis_session')

  revalidatePath('/')
  redirect('/')
}
