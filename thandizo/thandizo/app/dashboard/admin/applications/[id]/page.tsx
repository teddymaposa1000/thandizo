'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { 
  ArrowLeft,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  User,
  Building2,
  DollarSign,
  Download,
  MessageSquare,
  Loader2,
  Shield
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

export default function ApplicationDetailPage() {
  const router = useRouter()
  const params = useParams()
  const supabase = createClient()
  
  const [application, setApplication] = useState<Application | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    checkAdmin()
    fetchApplication()
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

  const fetchApplication = async () => {
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
        .eq('id', params.id)
        .single()

      if (error) throw error
      setApplication(data)
    } catch (error) {
      console.error('Error fetching application:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async () => {
    if (!application) return
    try {
      setActionLoading(true)
      const { error } = await supabase
        .from('patient_applications')
        .update({ 
          status: 'DIGITAL_REVIEW_PENDING',
          updated_at: new Date().toISOString()
        })
        .eq('id', application.id)

      if (error) throw error
      alert('Application moved to digital review!')
      fetchApplication()
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to approve application')
    } finally {
      setActionLoading(false)
    }
  }
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'DRAFT': 'bg-gray-100 text-gray-700',
      'SUBMITTED': 'bg-blue-100 text-blue-700',
      'DIGITAL_REVIEW_PENDING': 'bg-yellow-100 text-yellow-700',
      'FULLY_VERIFIED': 'bg-green-100 text-green-700',
      'REJECTED': 'bg-red-100 text-red-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-th" />
      </div>
    )
  }

  if (!application) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-ink-light/30 mx-auto mb-4" />
          <h3 className="font-display text-xl font-semibold text-forest mb-2">
            Application not found
          </h3>
          <Link href="/dashboard/admin/applications" className="btn-secondary">
            Back to Applications
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-sage">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/admin/applications" className="p-2 hover:bg-sage rounded-lg">
                <ArrowLeft className="w-5 h-5 text-ink-light" />
              </Link>
              <div>
                <h1 className="font-display text-2xl font-bold text-forest">
                  {application.campaign_title}
                </h1>
                <p className="text-sm text-ink-light">
                  Ref: {application.reference_number}
                </p>
              </div>
            </div>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(application.status)}`}>
              {application.status.replace(/_/g, ' ')}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <h2 className="font-display text-xl font-bold text-forest mb-4">
                Patient Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-ink-light">Full Name</p>
                  <p className="text-sm font-medium text-forest">{application.user?.full_name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-light">Email</p>
                  <p className="text-sm font-medium text-forest">{application.user?.email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-light">Phone</p>
                  <p className="text-sm font-medium text-forest">{application.user?.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-light">Medical Condition</p>
                  <p className="text-sm font-medium text-forest">{application.medical_condition}</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="font-display text-xl font-bold text-forest mb-4">
                Medical Details
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-ink-light mb-1">Diagnosis</p>
                  <p className="text-sm text-forest">{application.diagnosis}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-light mb-1">Procedure Required</p>
                  <p className="text-sm font-medium text-forest">{application.procedure_required}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-light mb-1">Hospital</p>
                  <p className="text-sm font-medium text-forest">{application.hospital_name}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-light mb-1">Situation</p>
                  <p className="text-sm text-forest whitespace-pre-wrap">{application.situation_description}</p>
                </div>
              </div>
            </div>            <div className="card p-6">
              <h2 className="font-display text-xl font-bold text-forest mb-4">
                Campaign Details
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-ink-light mb-1">Requested Amount</p>
                  <p className="text-lg font-bold text-emerald-th">
                    {application.currency} {application.requested_amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-ink-light mb-1">Patient Story</p>
                  <p className="text-sm text-forest whitespace-pre-wrap">{application.patient_story}</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="font-display text-xl font-bold text-forest mb-4">
                Documents ({application.documents?.length || 0})
              </h2>
              {application.documents && application.documents.length > 0 ? (
                <div className="space-y-3">
                  {application.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-sage/50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-forest">{doc.file_name}</p>
                        <p className="text-xs text-ink-light">{doc.document_type}</p>
                      </div>
                      <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white rounded-lg">
                        <Download className="w-4 h-4 text-emerald-th" />
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-ink-light text-center py-4">No documents</p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="font-display text-lg font-bold text-forest mb-4">Actions</h2>
              {application.status === 'SUBMITTED' && (
                <button
                  onClick={handleApprove}
                  disabled={actionLoading}
                  className="btn-primary w-full mb-3"
                >
                  {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  Move to Review
                </button>
              )}
            </div>

            <div className="card p-6">
              <h2 className="font-display text-lg font-bold text-forest mb-4">Timeline</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-ink-light">Created</p>
                  <p className="text-sm font-medium text-forest">{new Date(application.created_at).toLocaleString()}</p>
                </div>
                {application.submitted_at && (
                  <div>
                    <p className="text-xs text-ink-light">Submitted</p>
                    <p className="text-sm font-medium text-forest">{new Date(application.submitted_at).toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
