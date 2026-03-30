import React from 'react'
import { cookies } from 'next/headers'
import ProfileClient from './ProfileClient'

type SessionUser = {
  id: string
  email: string
  name: string
  picture: string | null
  provider: string
} | null

async function getSessionUser(): Promise<SessionUser> {
  try {
    const cookieStore = await cookies()
    const raw = cookieStore.get('aegis_session')?.value
    if (!raw) return null
    const data = JSON.parse(raw)
    if (data.email && data.provider) return data
    return null
  } catch {
    return null
  }
}

export default async function ProfilePage() {
  const user = await getSessionUser()
  
  return <ProfileClient user={user} />
}
