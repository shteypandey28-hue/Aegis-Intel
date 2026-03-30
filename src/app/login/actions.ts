'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

// Helper to set a session cookie
async function setSessionCookie(data: { email: string; name?: string; provider: string }) {
  const cookieStore = await cookies()
  cookieStore.set('aegis_session', JSON.stringify({
    id: `user_${Date.now()}`,
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

  await setSessionCookie({ email, provider: 'email' })

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  await setSessionCookie({ email, provider: 'email' })

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('aegis_session')

  revalidatePath('/')
  redirect('/')
}
