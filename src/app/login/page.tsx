'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldAlert, Fingerprint, Lock, ArrowRight, Activity, Globe } from 'lucide-react'
import GeometricElephant from '@/components/3d/GeometricElephant'
import { login, signup } from './actions'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsAuthenticating(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    
    // In actual implementation, we await the server action
    let result
    if (isLogin) {
      result = await login(formData)
    } else {
      result = await signup(formData)
    }

    if (result?.error) {
      setError(result.error)
      setIsAuthenticating(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans w-full overflow-hidden">
      
      {/* Left split-screen: 3D Guardian Cinematic view */}
      <div className="relative hidden w-1/2 lg:flex flex-col bg-sidebar border-r border-border overflow-hidden">
        
        {/* Abstract overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 pointer-events-none z-0" />
        
        {/* Title Top Left */}
        <div className="absolute top-8 left-8 z-20 flex items-center gap-3">
          <div className="h-10 w-10 rounded-md bg-primary/20 border border-primary/50 flex items-center justify-center shadow-[0_0_20px_var(--color-primary)]">
            <ShieldAlert className="w-6 h-6 text-primary" />
          </div>
          <span className="tracking-widest uppercase text-xl font-bold font-mono text-white drop-shadow-lg">Aegis Intel</span>
        </div>

        {/* 3D Guardian Wrapper */}
        <div className="flex-1 w-full h-full relative z-10 opacity-70">
           <GeometricElephant />
        </div>

        {/* Mission Quote Bottom */}
        <div className="absolute bottom-12 left-12 right-12 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="border-l-2 border-primary pl-6"
          >
            <h2 className="text-3xl font-black text-white leading-tight tracking-tighter shadow-md drop-shadow-2xl">
              "We watch over those<br/>who cannot speak for themselves."
            </h2>
            <p className="mt-4 text-primary font-mono uppercase tracking-widest text-sm">Active Threat Detection Matrix</p>
          </motion.div>
        </div>
      </div>

      {/* Right split-screen: Minimal Auth Form */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-background relative relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-primary/5 pointer-events-none" />
        
        <div className="w-full max-w-sm relative z-10 space-y-8">
          
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-black tracking-tight mb-2">
              {isLogin ? 'Welcome Back' : 'Initialize Access'}
            </h2>
            <p className="text-muted-foreground text-sm">
              {isLogin ? 'Enter your credentials to access the intelligence dashboard.' : 'Request restricted access to the global network.'}
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Fingerprint className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-md bg-background/50 focus:ring-1 focus:ring-primary focus:border-primary text-sm transition-all outline-none group-hover:border-primary/50"
                  placeholder="Official Email Address"
                  required
                  disabled={isAuthenticating}
                />
              </div>
              
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="password"
                  name="password"
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-md bg-background/50 focus:ring-1 focus:ring-primary focus:border-primary text-sm transition-all outline-none group-hover:border-primary/50"
                  placeholder="Clearance Passphrase"
                  required
                  disabled={isAuthenticating}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full flex items-center justify-center py-3 px-4 rounded-md text-sm font-bold tracking-widest uppercase bg-primary hover:bg-primary/90 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background transition-all disabled:opacity-50 group relative overflow-hidden shadow-[0_0_15px_-3px_var(--color-primary)]"
            >
              {isAuthenticating ? (
                <span className="flex items-center gap-2">
                  <Activity className="w-5 h-5 animate-pulse" />
                  Validating...
                </span>
              ) : (
                <span className="flex items-center gap-2 relative z-10">
                  {isLogin ? 'Authenticate' : 'Request Clearance'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
              {/* Glossy overlay effect to make it feel premium */}
              <div className="absolute inset-0 top-0 w-full h-1/2 bg-white/10 rounded-t-md pointer-events-none" />
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="bg-background px-6 text-muted-foreground">Or</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <button
              type="button"
              onClick={() => window.location.href = '/api/auth/google'}
              className="flex w-full items-center justify-center gap-3 rounded-md bg-background/50 border border-border px-3 py-3 text-sm font-semibold text-foreground shadow-sm hover:bg-sidebar transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
              </svg>
              <span className="text-sm font-medium">Continue with Google</span>
            </button>
          </div>

          <p className="textAlign-center mt-6 text-sm text-muted-foreground lg:text-left text-center">
            {isLogin ? "Don't have clearance? " : "Already an agent? "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-primary hover:text-primary/80 font-bold tracking-wide transition-colors"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>

        </div>
      </div>
    </div>
  )
}
