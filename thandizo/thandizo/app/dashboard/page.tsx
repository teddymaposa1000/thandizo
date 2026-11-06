'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { 
  LogOut, 
  User, 
  FileText, 
  Heart, 
  Settings,
  Loader2
} from 'lucide-react'

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
        window.location.href = '/login'
        return
      }

      setUser(user)

      // Get user profile
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      setUserProfile(profile)

      // Redirect to role-specific dashboard using window.location
      if (profile?.role === 'ADMIN' || profile?.role === 'SUPER_ADMIN') {
        console.log('Redirecting to admin dashboard...')
        window.location.href = '/dashboard/admin'
        return
      } else if (profile?.role === 'PATIENT') {
        window.location.href = '/dashboard/patient'
        return
      } else if (profile?.role === 'DONOR') {
        window.location.href = '/dashboard/donor'
        return
      }
      
      setLoading(false)
    } catch (error) {
      console.error('Error checking user:', error)
      window.location.href = '/login'
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
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
      {/* Header */}
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
              <p className="text-xs text-ink-light capitalize">{userProfile?.role?.toLowerCase() || 'user'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-sage rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-ink-light" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-forest mb-2">
            Welcome, {userProfile?.full_name || 'User'}!
          </h1>
          <p className="text-ink-light">
            Manage your account and track your impact
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
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

        {/* Stats */}
        <div className="card p-6">
          <h2 className="font-display text-xl font-bold text-forest mb-4">Your Impact</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <p className="text-3xl font-bold text-emerald-th">0</p>
              <p className="text-sm text-ink-light">Applications</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-emerald-th">0</p>
              <p className="text-sm text-ink-light">Donations Made</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-emerald-th">K 0</p>
              <p className="text-sm text-ink-light">Total Contributed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-emerald-th">0</p>
              <p className="text-sm text-ink-light">Lives Impacted</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
