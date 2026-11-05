'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { LogOut, User, FileText, Heart, Loader2 } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      setUser(user)

      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      setUserProfile(profile)

      if (profile?.role === 'ADMIN' || profile?.role === 'SUPER_ADMIN') {
        router.push('/dashboard/admin')
      } else if (profile?.role === 'PATIENT') {
        router.push('/dashboard/patient')
      } else if (profile?.role === 'DONOR') {
        router.push('/dashboard/donor')
      }
    } catch (error) {
      console.error('Error:', error)
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-th" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-sage">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-th to-forest rounded-xl flex items-center justify-center">
              <span className="text-xl">🌿</span>
            </div>
            <span className="font-display text-xl font-bold text-forest">THANDIZO</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-forest">{userProfile?.full_name || user?.email}</p>
              <p className="text-xs text-ink-light capitalize">{userProfile?.role?.toLowerCase()}</p>
            </div>
            <button onClick={handleLogout} className="p-2 hover:bg-sage rounded-lg transition-colors">
              <LogOut className="w-5 h-5 text-ink-light" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-forest mb-2">
            Welcome, {userProfile?.full_name || 'User'}!
          </h1>
          <p className="text-ink-light">Manage your account and track your impact</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/dashboard/profile" className="card p-6 hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 bg-mint rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <User className="w-6 h-6 text-emerald-th" />
            </div>
            <h3 className="font-semibold text-forest mb-1">My Profile</h3>
            <p className="text-sm text-ink-light">Update your personal information</p>
          </Link>

          <Link href="/dashboard/applications" className="card p-6 hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 bg-mint rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-emerald-th" />
            </div>
            <h3 className="font-semibold text-forest mb-1">My Applications</h3>
            <p className="text-sm text-ink-light">View and manage your applications</p>
          </Link>

          <Link href="/dashboard/donations" className="card p-6 hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 bg-mint rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Heart className="w-6 h-6 text-emerald-th" />
            </div>
            <h3 className="font-semibold text-forest mb-1">My Donations</h3>
            <p className="text-sm text-ink-light">Track your contributions</p>
          </Link>
        </div>
      </main>
    </div>
  )
}
