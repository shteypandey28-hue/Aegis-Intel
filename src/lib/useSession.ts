'use client'

import { useState, useEffect } from 'react'

type SessionUser = {
  id: string
  email: string
  name: string
  picture: string | null
  provider: string
} | null

export function useSession(): SessionUser {
  const [user, setUser] = useState<SessionUser>(null)

  useEffect(() => {
    try {
      // Read the aegis_session cookie (it's httpOnly=true so we can't read it directly)
      // Instead, we'll parse it from document.cookie if available
      const cookies = document.cookie.split(';').reduce((acc, c) => {
        const [key, ...val] = c.trim().split('=')
        acc[key] = decodeURIComponent(val.join('='))
        return acc
      }, {} as Record<string, string>)

      if (cookies['aegis_session']) {
        const data = JSON.parse(cookies['aegis_session'])
        if (data.email && data.provider) {
          setUser(data)
        }
      }
    } catch {}
  }, [])

  return user
}
