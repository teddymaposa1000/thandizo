'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Mail, Lock, AlertCircle, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Get user role from our users table
      const { data: userData } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .single()

      // Redirect based on role
      if (userData?.role === 'ADMIN' || userData?.role === 'SUPER_ADMIN') {
        console.log('Admin detected, redirecting to admin dashboard...')
        window.location.href = '/dashboard/admin'
        return
      } else if (userData?.role === 'PATIENT') {
        console.log('Patient detected, redirecting to patient dashboard...')
        window.location.href = '/dashboard/patient'
        return
      } else if (userData?.role === 'DONOR') {
        console.log('Donor detected, redirecting to donor dashboard...')
        window.location.href = '/dashboard/donor'
        return
      } else {
        console.log('Default user, redirecting to dashboard...')
        window.location.href = '/dashboard'
        return
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-50 via-mint/20 to-cream flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-th to-forest rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">🌿</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-forest">THANDIZO</h1>
            <p className="text-sm text-ink-light mt-1">Verified Care. Shared Hope.</p>
          </Link>
        </div>

        {/* Login Form */}
        <div className="card p-8">
          <h2 className="font-display text-2xl font-bold text-forest mb-2">Welcome Back</h2>
          <p className="text-ink-light mb-6">Sign in to your account</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="label">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-light" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-light" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/forgot-password" className="text-sm text-emerald-th hover:text-emerald-light transition-colors">
              Forgot your password?
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-sage text-center">
            <p className="text-sm text-ink-light">
              Don't have an account?{' '}
              <Link href="/register" className="font-medium text-emerald-th hover:text-emerald-light transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 card p-6 bg-mint/30">
          <h3 className="font-medium text-forest mb-3">Demo Credentials</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-light">Admin:</span>
              <span className="font-mono text-forest">lilyoung1703@gmail.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-light">Password:</span>
              <span className="font-mono text-forest">(your password)</span>
            </div>
          </div>
          <p className="text-xs text-ink-light mt-3 italic">
            Use these credentials to test the admin dashboard
          </p>
        </div>
      </div>
    </div>
  )
}
