'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { 
  ArrowLeft,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Eye,
  Loader2
} from 'lucide-react'

interface Application {
  id: string
  reference_number: string
  user_id: string
  medical_condition: string
  diagnosis: string
  situation_description: string
  hospital_name: string
  hospital_location: string | null
  attending_doctor: string | null
  procedure_required: string
  urgency: string
  estimated_cost: number
  currency: string
  additional_notes: string | null
  requested_amount: number
  campaign_title: string
  patient_story: string
  fundraising_purpose: string | null
  target_date: string | null
  public_photo_url: string | null
  medical_data_consent: boolean
  identity_consent: boolean
  publication_consent: boolean
  hospital_contact_consent: boolean
  consent_timestamp: string | null
  status: string
  rejection_reason: string | null
  submitted_at: string | null
  created_at: string
  updated_at: string
  user?: {
    full_name: string
    email: string
    phone: string | null
  }
  patient_profile?: {
    date_of_birth: string | null
    gender: string | null
    nationality: string | null
    address: string | null
    city: string | null
    province: string | null
  }
  documents?: Array<{
    id: string
    document_type: string
    file_name: string
    file_url: string
    uploaded_at: string
  }>
}

export default function ApplicationsPage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    checkAdmin()
    fetchApplications()
  }, [])

  const checkAdmin = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

      if (!profile || (profile.role !== 'ADMIN' && profile.role !== 'SUPER_ADMIN')) {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Error:', error)
      router.push('/login')
    }
  }

  const fetchApplications = async () => {
    try {
      setLoading(true)
      
      const { data, error } = await supabase
        .from('patient_applications')
        .select(`
          *,
          user:users(full_name, email, phone),
          patient_profile:patient_profiles(date_of_birth, gender, nationality, address, city, province),
          documents:medical_documents(id, document_type, file_name, file_url, uploaded_at)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      setApplications(data || [])
    } catch (error) {
      console.error('Error fetching applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'bg-gray-100 text-gray-700 border-gray-200'
      case 'SUBMITTED':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'DIGITAL_REVIEW_PENDING':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'ADDITIONAL_DOCS_REQUIRED':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'DIGITALLY_VERIFIED':
        return 'bg-cyan-100 text-cyan-700 border-cyan-200'
      case 'AWAITING_PHYSICAL_VERIFICATION':
        return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'PHYSICAL_VERIFICATION_COMPLETED':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200'
      case 'FULLY_VERIFIED':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'REJECTED':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'UNDER_INVESTIGATION':
        return 'bg-rose-100 text-rose-700 border-rose-200'
      case 'SUSPENDED':
        return 'bg-gray-100 text-gray-700 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'EMERGENCY':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'HIGH':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'LOW':
        return 'bg-green-100 text-green-700 border-green-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const filteredApplications = applications.filter(app => {
    const matchesFilter = filter === 'ALL' || app.status === filter
    const matchesSearch = searchQuery === '' || 
      app.campaign_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.medical_condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.reference_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.user?.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/admin" className="p-2 hover:bg-sage rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-ink-light" />
            </Link>
            <div>
              <h1 className="font-display text-2xl font-bold text-forest">Patient Applications</h1>
              <p className="text-sm text-ink-light">Review and manage patient applications</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="mb-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-light" />
            <input
              type="text"
              placeholder="Search by name, condition, or reference number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'ALL'
                  ? 'bg-forest text-white'
                  : 'bg-white text-ink-light hover:bg-sage'
              }`}
            >
              All ({applications.length})
            </button>
            <button
              onClick={() => setFilter('SUBMITTED')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'SUBMITTED'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-ink-light hover:bg-sage'
              }`}
            >
              Submitted ({statusCounts['SUBMITTED'] || 0})
            </button>
            <button
              onClick={() => setFilter('DIGITAL_REVIEW_PENDING')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'DIGITAL_REVIEW_PENDING'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-white text-ink-light hover:bg-sage'
              }`}
            >
              Review Pending ({statusCounts['DIGITAL_REVIEW_PENDING'] || 0})
            </button>
            <button
              onClick={() => setFilter('FULLY_VERIFIED')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'FULLY_VERIFIED'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-ink-light hover:bg-sage'
              }`}
            >
              Verified ({statusCounts['FULLY_VERIFIED'] || 0})
            </button>
            <button
              onClick={() => setFilter('REJECTED')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'REJECTED'
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-ink-light hover:bg-sage'
              }`}
            >
              Rejected ({statusCounts['REJECTED'] || 0})
            </button>
          </div>
        </div>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <div className="card p-12 text-center">
            <FileText className="w-16 h-16 text-ink-light/30 mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-forest mb-2">
              No applications found
            </h3>
            <p className="text-ink-light">
              {searchQuery || filter !== 'ALL'
                ? 'Try adjusting your search or filters'
                : 'No patient applications have been submitted yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app) => (
              <Link
                key={app.id}
                href={`/dashboard/admin/applications/${app.id}`}
                className="card p-6 hover:shadow-md transition-shadow block"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display text-lg font-semibold text-forest">
                        {app.campaign_title}
                      </h3>
                      <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(app.status)}`}>
                        {app.status.replace(/_/g, ' ')}
                      </span>
                      <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${getUrgencyColor(app.urgency)}`}>
                        {app.urgency}
                      </span>
                    </div>
                    <p className="text-sm text-ink-light mb-2">
                      <span className="font-medium">Ref:</span> {app.reference_number}
                    </p>
                    <p className="text-sm text-ink-light">
                      <span className="font-medium">Patient:</span> {app.user?.full_name || 'Unknown'}
                    </p>
                  </div>
                  <Eye className="w-5 h-5 text-ink-light" />
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-ink-light mb-1">Medical Condition</p>
                    <p className="text-sm font-medium text-forest">{app.medical_condition}</p>
                  </div>
                  <div>
                    <p className="text-xs text-ink-light mb-1">Hospital</p>
                    <p className="text-sm font-medium text-forest">{app.hospital_name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-ink-light mb-1">Requested Amount</p>
                    <p className="text-sm font-medium text-forest">
                      {app.currency} {app.requested_amount.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-ink-light">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Submitted {new Date(app.submitted_at || app.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{app.documents?.length || 0} documents</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
