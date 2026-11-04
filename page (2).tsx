'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { 
  LogOut, 
  Users, 
  FileText, 
  Heart, 
  Shield,
  DollarSign,
  Building2,
  Activity,
  Loader2,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const supabase = createClient()
  
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAdmin()
  }, [])

  const checkAdmin = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      // Check if user is admin
      const { data: profile } = await supabase
        .from('users')
        .select('role, full_name')
        .eq('id', user.id)
        .single()

      if (!profile || (profile.role !== 'ADMIN' && profile.role !== 'SUPER_ADMIN')) {
        router.push('/dashboard')
        return
      }

      setUser({ ...user, ...profile })
      await fetchStats()
    } catch (error) {
      console.error('Error:', error)
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      // Fetch various stats
      const [
        { count: totalUsers },
        { count: totalApplications },
        { count: pendingApplications },
        { count: activeCampaigns },
        { count: totalDonations },
        { data: donationSum }
      ] = await Promise.all([
        supabase.from('users').select('*', { count: 'exact', head: true }),
        supabase.from('patient_applications').select('*', { count: 'exact', head: true }),
        supabase.from('patient_applications').select('*', { count: 'exact', head: true }).eq('status', 'SUBMITTED'),
        supabase.from('campaigns').select('*', { count: 'exact', head: true }).eq('status', 'ACTIVE'),
        supabase.from('donations').select('*', { count: 'exact', head: true }).eq('status', 'SUCCESSFUL'),
        supabase.from('donations').select('amount').eq('status', 'SUCCESSFUL')
      ])

      const totalRaised = donationSum?.reduce((sum, d) => sum + parseFloat(d.amount), 0) || 0

      setStats({
        totalUsers: totalUsers || 0,
        totalApplications: totalApplications || 0,
        pendingApplications: pendingApplications || 0,
        activeCampaigns: activeCampaigns || 0,
        totalDonations: totalDonations || 0,
        totalRaised
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
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
      {/* Header */}
      <header className="bg-white border-b border-sage">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-th to-forest rounded-xl flex items-center justify-center">
              <span className="text-xl">🌿</span>
            </div>
            <div>
              <span className="font-display text-xl font-bold text-forest">THANDIZO</span>
              <p className="text-xs text-ink-light">Admin Dashboard</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-forest">{user?.full_name}</p>
              <p className="text-xs text-ink-light">Administrator</p>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-forest mb-2">
            Admin Dashboard
          </h1>
          <p className="text-ink-light">
            Manage patients, campaigns, donations, and platform operations
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-mint rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-emerald-th" />
              </div>
              <Activity className="w-5 h-5 text-emerald-th" />
            </div>
            <p className="text-3xl font-bold text-forest">{stats?.totalUsers || 0}</p>
            <p className="text-sm text-ink-light">Total Users</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-mint rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-emerald-th" />
              </div>
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-3xl font-bold text-forest">{stats?.totalApplications || 0}</p>
            <p className="text-sm text-ink-light">Applications ({stats?.pendingApplications || 0} pending)</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-mint rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-emerald-th" />
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-th" />
            </div>
            <p className="text-3xl font-bold text-forest">{stats?.activeCampaigns || 0}</p>
            <p className="text-sm text-ink-light">Active Campaigns</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-mint rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-th" />
              </div>
              <Activity className="w-5 h-5 text-emerald-th" />
            </div>
            <p className="text-3xl font-bold text-forest">K {stats?.totalRaised?.toLocaleString() || '0'}</p>
            <p className="text-sm text-ink-light">Total Raised ({stats?.totalDonations || 0} donations)</p>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/dashboard/admin/applications" className="card p-6 hover:shadow-md transition-shadow group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-mint rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-emerald-th" />
              </div>
              <div>
                <h3 className="font-semibold text-forest mb-1">Applications</h3>
                <p className="text-sm text-ink-light mb-2">Review and manage patient applications</p>
                {stats?.pendingApplications > 0 && (
                  <span className="badge-pending">
                    {stats.pendingApplications} pending review
                  </span>
                )}
              </div>
            </div>
          </Link>

          <Link href="/dashboard/admin/campaigns" className="card p-6 hover:shadow-md transition-shadow group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-mint rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-emerald-th" />
              </div>
              <div>
                <h3 className="font-semibold text-forest mb-1">Campaigns</h3>
                <p className="text-sm text-ink-light">Manage active campaigns and approvals</p>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/admin/verification" className="card p-6 hover:shadow-md transition-shadow group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-mint rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-emerald-th" />
              </div>
              <div>
                <h3 className="font-semibold text-forest mb-1">Verification</h3>
                <p className="text-sm text-ink-light">Digital and physical verification workflow</p>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/admin/donations" className="card p-6 hover:shadow-md transition-shadow group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-mint rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <DollarSign className="w-6 h-6 text-emerald-th" />
              </div>
              <div>
                <h3 className="font-semibold text-forest mb-1">Donations</h3>
                <p className="text-sm text-ink-light">Track donations and disbursements</p>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/admin/partners" className="card p-6 hover:shadow-md transition-shadow group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-mint rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6 text-emerald-th" />
              </div>
              <div>
                <h3 className="font-semibold text-forest mb-1">Corporate Partners</h3>
                <p className="text-sm text-ink-light">Manage partnerships and sponsorships</p>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/admin/users" className="card p-6 hover:shadow-md transition-shadow group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-mint rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-emerald-th" />
              </div>
              <div>
                <h3 className="font-semibold text-forest mb-1">Users</h3>
                <p className="text-sm text-ink-light">Manage user accounts and roles</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 card p-6">
          <h2 className="font-display text-xl font-bold text-forest mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <button className="btn-secondary">
              <AlertCircle className="w-4 h-4" />
              Review Pending Applications
            </button>
            <button className="btn-secondary">
              <CheckCircle2 className="w-4 h-4" />
              Approve Campaigns
            </button>
            <button className="btn-secondary">
              <DollarSign className="w-4 h-4" />
              Process Disbursements
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
