'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  User, Mail, Phone, ShieldCheck, Edit3, Save, X,
  BadgeCheck, Lock, Fingerprint, Activity, ChevronDown
} from 'lucide-react'
import { useSession } from '@/lib/useSession'

type SessionUser = {
  id: string
  email: string
  name: string
  picture: string | null
  provider: string
  loginAt?: string
} | null

const DEPARTMENTS = [
  'Wildlife Intelligence Division',
  'Field Operations Unit',
  'Cyber Surveillance Division',
  'Marine Conservation Unit',
  'Forest & Habitat Division',
  'Legal & Compliance',
  'International Liaison Office',
  'Data Analytics Wing',
]

function ProfileField({
  icon: Icon,
  label,
  value,
  editable,
  onChange,
  inputType = 'text',
  placeholder,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  editable: boolean
  onChange?: (v: string) => void
  inputType?: string
  placeholder?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
        <Icon className="w-3.5 h-3.5 text-primary" />
        {label}
      </label>
      {editable ? (
        <input
          type={inputType}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          className="bg-background/60 border border-primary/40 rounded-md px-4 py-2.5 text-sm font-semibold outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/40"
        />
      ) : (
        <div className="px-4 py-2.5 bg-background/30 border border-border/40 rounded-md text-sm font-semibold text-foreground/90">
          {value || <span className="text-muted-foreground/40 italic">Not set</span>}
        </div>
      )}
    </div>
  )
}

function DepartmentSelect({
  value,
  editable,
  onChange,
}: {
  value: string
  editable: boolean
  onChange?: (v: string) => void
}) {
  const [custom, setCustom] = useState(false)

  if (!editable) {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <BadgeCheck className="w-3.5 h-3.5 text-primary" />
          Department
        </label>
        <div className="px-4 py-2.5 bg-background/30 border border-border/40 rounded-md text-sm font-semibold text-foreground/90">
          {value}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
        <BadgeCheck className="w-3.5 h-3.5 text-primary" />
        Department
      </label>
      {custom ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            placeholder="Enter department name..."
            onChange={(e) => onChange?.(e.target.value)}
            className="flex-1 bg-background/60 border border-primary/40 rounded-md px-4 py-2.5 text-sm font-semibold outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/40"
          />
          <button
            onClick={() => setCustom(false)}
            className="px-3 py-2 rounded-md border border-border text-xs font-bold text-muted-foreground hover:bg-sidebar transition-colors"
          >
            List
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <select
              value={DEPARTMENTS.includes(value) ? value : ''}
              onChange={(e) => {
                if (e.target.value === '__custom__') {
                  setCustom(true)
                  onChange?.('')
                } else {
                  onChange?.(e.target.value)
                }
              }}
              className="w-full appearance-none bg-background/60 border border-primary/40 rounded-md px-4 py-2.5 text-sm font-semibold outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer"
            >
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
              <option value="__custom__">✏️ Enter custom...</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      )}
    </div>
  )
}

export default function ProfileClient({ user: userProp }: { user: SessionUser }) {
  const session = useSession()
  const user = session || userProp

  const buildProfile = (u: SessionUser) => {
    const agentId = u?.id
      ? 'AGT ' + u.id.slice(-6).toUpperCase()
      : ''
    return {
      codeName: u?.name ? u.name.split(' ')[0].toUpperCase() + '-AGENT' : 'SHADOW-WARDEN',
      name: u?.name || 'Unknown Agent',
      email: u?.email || 'unassigned@aegisintel.org',
      mobile: '+91 98765 43210',
      agentId: agentId,
      clearanceLevel: 'ALPHA-7',
      department: 'Wildlife Intelligence Division',
      joinDate: u?.loginAt ? new Date(u.loginAt).toISOString().split('T')[0] : '2024-01-15',
      status: 'ACTIVE',
      provider: u?.provider === 'google' ? 'Google OAuth 2.0' : u?.provider === 'email' ? 'Email Auth' : 'Local Session',
    }
  }

  const [profile, setProfile] = useState(buildProfile(user))
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)

  // Sync profile when session loads (async cookie read)
  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        codeName: user.name ? user.name.split(' ')[0].toUpperCase() + '-AGENT' : prev.codeName,
        agentId: prev.agentId || (user.id ? 'AGT ' + user.id.slice(-6).toUpperCase() : prev.agentId),
        provider: user.provider === 'google' ? 'Google OAuth 2.0' : user.provider === 'email' ? 'Email Auth' : prev.provider,
      }))
    }
  }, [user])

  const handleSave = () => {
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleCancel = () => {
    setProfile(buildProfile(user))
    setEditing(false)
  }

  const update = (field: string) => (val: string) =>
    setProfile((prev) => ({ ...prev, [field]: val }))

  return (
    <div className="max-w-4xl mx-auto pb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-black tracking-tight">Agent Profile</h2>
        <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest mt-1">
          Identity & Clearance Record
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Identity Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="col-span-1 relative rounded-2xl border border-primary/20 bg-card/60 backdrop-blur-sm overflow-hidden shadow-[0_0_40px_-15px_var(--color-primary)] flex flex-col items-center p-8 gap-4"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-destructive/5 pointer-events-none" />

          {/* Avatar */}
          <div className="relative z-10 w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/50 flex items-center justify-center shadow-[0_0_25px_-5px_var(--color-primary)] overflow-hidden">
            {user?.picture ? (
              <img src={user.picture} alt={profile.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <User className="w-12 h-12 text-primary" />
            )}
            <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-card" />
          </div>

          {/* Code Name & Info */}
          <div className="relative z-10 text-center">
            <div className="font-black text-xl tracking-widest text-primary font-mono uppercase">
              {profile.codeName}
            </div>
            <div className="text-sm text-foreground/80 font-semibold mt-1">{profile.name}</div>
            <div className="text-xs text-muted-foreground font-mono mt-0.5">{profile.department}</div>
            {profile.agentId && (
              <div className="text-[10px] text-primary/60 font-mono mt-1 tracking-widest">{profile.agentId}</div>
            )}
          </div>

          {/* Clearance Badge */}
          <div className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mt-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-xs font-black font-mono tracking-widest text-primary uppercase">
              Clearance {profile.clearanceLevel}
            </span>
          </div>

          {/* Status */}
          <div className="relative z-10 flex items-center gap-2 mt-auto">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
              Status: {profile.status}
            </span>
          </div>
        </motion.div>

        {/* Right: Editable Fields */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="col-span-2 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-8 shadow-lg"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold uppercase tracking-wider flex items-center gap-2">
              <Fingerprint className="w-5 h-5 text-primary" />
              Identity Data
            </h3>
            <div className="flex gap-2">
              {editing ? (
                <>
                  <button onClick={handleCancel} className="flex items-center gap-1.5 px-4 py-2 rounded-md border border-border text-sm font-bold text-muted-foreground hover:bg-sidebar hover:text-foreground transition-colors">
                    <X className="w-4 h-4" /> Cancel
                  </button>
                  <button onClick={handleSave} className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors shadow-[0_0_15px_-3px_var(--color-primary)]">
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </>
              ) : (
                <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 px-4 py-2 rounded-md border border-primary/40 bg-primary/10 text-primary text-sm font-bold hover:bg-primary/20 transition-colors">
                  <Edit3 className="w-4 h-4" /> Edit Profile
                </button>
              )}
            </div>
          </div>

          {saved && (
            <div className="mb-4 px-4 py-2.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-mono flex items-center gap-2">
              <BadgeCheck className="w-4 h-4" />
              Profile record updated successfully.
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <ProfileField
              icon={Fingerprint}
              label="Agent ID"
              value={profile.agentId}
              editable={editing}
              onChange={update('agentId')}
              placeholder="AGT 001234"
            />
            <ProfileField
              icon={ShieldCheck}
              label="Code Name"
              value={profile.codeName}
              editable={editing}
              onChange={update('codeName')}
              placeholder="SHADOW-WARDEN"
            />
            <ProfileField
              icon={User}
              label="Full Name"
              value={profile.name}
              editable={editing}
              onChange={update('name')}
            />
            <ProfileField
              icon={Mail}
              label="Email Address"
              value={profile.email}
              editable={false}
              inputType="email"
            />
            <ProfileField
              icon={Phone}
              label="Mobile Number"
              value={profile.mobile}
              editable={editing}
              onChange={update('mobile')}
              inputType="tel"
              placeholder="+91 00000 00000"
            />
            <ProfileField
              icon={Lock}
              label="Clearance Level"
              value={profile.clearanceLevel}
              editable={false}
            />
            <DepartmentSelect
              value={profile.department}
              editable={editing}
              onChange={update('department')}
            />
            <ProfileField
              icon={Activity}
              label="Auth Provider"
              value={profile.provider}
              editable={false}
            />
          </div>

          <div className="mt-6 pt-6 border-t border-border/40 flex items-center gap-2 text-xs font-mono text-muted-foreground/50">
            <Lock className="w-3.5 h-3.5" />
            Email is synced from your login provider. Agent ID and Department are editable.
          </div>
        </motion.div>
      </div>
    </div>
  )
}
