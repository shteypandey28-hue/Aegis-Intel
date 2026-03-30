import React from 'react'
import ProfileClient from './ProfileClient'

export const dynamic = 'force-static'
export const revalidate = false

export default function ProfilePage() {
  // User session is read client-side in ProfileClient
  return <ProfileClient user={null} />
}
