'use client'
'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
// ... rest of the imports
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
  Calendar,
  MapPin,
  Phone,
  Mail,
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
    reviewed_by: string | null
    reviewed_at: string | null
    review_note: string | null
  }>
}

export default function ApplicationDetailPage() {
  const router = useRouter()
  const params = useParams()
  const supabase = createClient()
  
  const [application, setApplication] = useState<Application | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')
  const [showDocsRequestModal, setShowDocsRequestModal] = useState(false)
  const [docsRequestNote, setDocsRequestNote] = useState('')

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
          documents:medical_documents(id, document_type, file_name, file_url, uploaded_at, reviewed_by, reviewed_at, review_note)
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
      console.error('Error approving application:', error)
      alert('Failed to approve application')
    } finally {
      setActionLoading(false)
    }
  }

  const handleReject = async () => {
    if (!application || !rejectionReason.trim()) return
    
    try {
      setActionLoading(true)
      
      const { error } = await supabase
        .from('patient_applications')
        .update({ 
          status: 'REJECTED',
          rejection_reason: rejectionReason,
          updated_at: new Date().toISOString()
        })
        .eq('id', application.id)

      if (error) throw error

      alert('Application rejected!')
      setShowRejectModal(false)
      setRejectionReason('')
      fetchApplication()
    } catch (error) {
      console.error('Error rejecting application:', error)
      alert('Failed to reject application')
    } finally {
      setActionLoading(false)
    }
  }

  const handleRequestDocs = async () => {
    if (!application || !docsRequestNote.trim()) return
    
    try {
      setActionLoading(true)
      
      const { error } = await supabase
        .from('patient_applications')
        .update({ 
          status: 'ADDITIONAL_DOCS_REQUIRED',
          additional_notes: `${application.additional_notes || ''}\n\n[Admin Request]: ${docsRequestNote}`,
          updated_at: new Date().toISOString()
        })
        .eq('id', application.id)

      if (error) throw error

      alert('Document request sent!')
      setShowDocsRequestModal(false)
      setDocsRequestNote('')
      fetchApplication()
    } catch (error) {
      console.error('Error requesting documents:', error)
      alert('Failed to request documents')
    } finally {
      setActionLoading(false)
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
      {/* Header */}
      <header className="bg-white border-b border-sage">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/admin/applications" className="p-2 hover:bg-sage rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-ink-light" />
              </Link>
              <div>
                <h1 className="font-display text-2xl font-bold text-forest">
                  {application.campaign_title}
                </h1>
                <p className="text-sm text-ink-light">
                  Reference: {application.reference_number}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(application.status)}`}>
                {application.status.replace(/_/g, ' ')}
              </span>
              <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getUrgencyColor(application.urgency)}`}>
                {application.urgency}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Information */}
            <div className="card p-6">
              <h2 className="font-display text-xl font-bold text-forest mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Patient Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-ink-light mb-1">Full Name</p>
                  <p className="text-sm font-medium text-forest">{application.user?.full_name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-light mb-1">Email</p>
                  <p className="text-sm font-medium text-forest">{application.user?.email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-light mb-1">Phone</p>
                  <p className="text-sm font-medium text-forest">{application.user?.phone || 'N/A'}</p>
                </div>
                {application.patient_profile?.date_of_birth && (
                  <div>
                    <p className="text-xs text-ink-light mb-1">Date of Birth</p>
                    <p className="text-sm font-medium text-forest">
                      {new Date(application.patient_profile.date_of_birth).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {application.patient_profile?.gender && (
                  <div>
                    <p className="text-xs text-ink-light mb-1">Gender</p>
                    <p className="text-sm font-medium text-forest">{application.patient_profile.gender}</p>
                  </div>
                )}
                {application.patient_profile?.nationality && (
                  <div>
                    <p className="text-xs text-ink-light mb-1">Nationality</p>
                    <p className="text-sm font-medium text-forest">{application.patient_profile.nationality}</p>
                  </div>
                )}
              </div>
              {application.patient_profile?.address && (
                <div className="mt-4 pt-4 border-t border-sage">
                  <p className="text-xs text-ink-light mb-1">Address</p>
                  <p className="text-sm font-medium text-forest">
                    {application.patient_profile.address}
                    {application.patient_profile.city && `, ${application.patient_profile.city}`}
                    {application.patient_profile.province && `, ${application.patient_profile.province}`}
                  </p>
                </div>
              )}
            </div>

            {/* Medical Information */}
            <div className="card p-6">
              <h2 className="font-display text-xl font-bold text-forest mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Medical Information
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-ink-light mb-1">Medical Condition</p>
                  <p className="text-sm font-medium text-forest">{application.medical_condition}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-light mb-1">Diagnosis</p>
                  <p className="text-sm text-forest">{application.diagnosis}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-light mb-1">Procedure Required</p>
                  <p className="text-sm font-medium text-forest">{application.procedure_required}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-light mb-1">Situation Description</p>
                  <p className="text-sm text-forest whitespace-pre-wrap">{application.situation_description}</p>
                </div>
              </div>
            </div>

            {/* Hospital Information */}
            <div className="card p-6">
              <h2 className="font-display text-xl font-bold text-forest mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Hospital Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-ink-light mb-1">Hospital Name</p>
                  <p className="text-sm font-medium text-forest">{application.hospital_name}</p>
                </div>
                {application.hospital_location && (
                  <div>
                    <p className="text-xs text-ink-light mb-1">Location</p>
                    <p className="text-sm font-medium text-forest">{application.hospital_location}</p>
                  </div>
                )}
                {application.attending_doctor && (
                  <div>
                    <p className="text-xs text-ink-light mb-1">Attending Doctor</p>
                    <p className="text-sm font-medium text-forest">{application.attending_doctor}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-ink-light mb-1">Estimated Cost</p>
                  <p className="text-sm font-medium text-forest">
                    {application.currency} {application.estimated_cost.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Campaign Information */}
            <div className="card p-6">
              <h2 className="font-display text-xl font-bold text-forest mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Campaign Information
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-ink-light mb-1">Campaign Title</p>
                  <p className="text-sm font-medium text-forest">{application.campaign_title}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-light mb-1">Requested Amount</p>
                  <p className="text-lg font-bold text-emerald-th">
                    {application.currency} {application.requested_amount.toLocaleString()}
                  </p>
                </div>
                {application.target_date && (
                  <div>
                    <p className="text-xs text-ink-light mb-1">Target Date</p>
                    <p className="text-sm font-medium text-forest">
                      {new Date(application.target_date).toLocaleDateString()}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-ink-light mb-1">Patient Story</p>
                  <p className="text-sm text-forest whitespace-pre-wrap">{application.patient_story}</p>
                </div>
                {application.fundraising_purpose && (
                  <div>
                    <p className="text-xs text-ink-light mb-1">Fundraising Purpose</p>
                    <p className="text-sm text-forest whitespace-pre-wrap">{application.fundraising_purpose}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Documents */}
            <div className="card p-6">
              <h2 className="font-display text-xl font-bold text-forest mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Documents ({application.documents?.length || 0})
              </h2>
              {application.documents && application.documents.length > 0 ? (
                <div className="space-y-3">
                  {application.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-sage/50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-forest">{doc.file_name}</p>
                        <p className="text-xs text-ink-light">
                          {doc.document_type.replace(/_/g, ' ')} • Uploaded {new Date(doc.uploaded_at).toLocaleDateString()}
                        </p>
                        {doc.review_note && (
                          <p className="text-xs text-ink-light mt-1 italic">Note: {doc.review_note}</p>
                        )}
                      </div>
                      <a
                        href={doc.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-white rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4 text-emerald-th" />
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-ink-light text-center py-4">
                  No documents uploaded
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <div className="card p-6">
              <h2 className="font-display text-lg font-bold text-forest mb-4">Actions</h2>
              <div className="space-y-3">
                {application.status === 'SUBMITTED' && (
                  <>
                    <button
                      onClick={handleApprove}
                      disabled={actionLoading}
                      className="btn-primary w-full"
                    >
                      {actionLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Move to Digital Review
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setShowRejectModal(true)}
                      disabled={actionLoading}
                      className="btn-secondary w-full !border-red-300 !text-red-600 hover:!bg-red-50"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject Application
                    </button>
                  </>
                )}
                <button
                  onClick={() => setShowDocsRequestModal(true)}
                  disabled={actionLoading}
                  className="btn-secondary w-full"
                >
                  <MessageSquare className="w-4 h-4" />
                  Request Documents
                </button>
              </div>
            </div>

            {/* Consent Status */}
            <div className="card p-6">
              <h2 className="font-display text-lg font-bold text-forest mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Consent Status
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink-light">Medical Data</span>
                  {application.medical_data_consent ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink-light">Identity Verification</span>
                  {application.identity_consent ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink-light">Publication</span>
                  {application.publication_consent ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink-light">Hospital Contact</span>
                  {application.hospital_contact_consent ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="card p-6">
              <h2 className="font-display text-lg font-bold text-forest mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Timeline
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-ink-light mb-1">Created</p>
                  <p className="text-sm font-medium text-forest">
                    {new Date(application.created_at).toLocaleString()}
                  </p>
                </div>
                {application.submitted_at && (
                  <div>
                    <p className="text-xs text-ink-light mb-1">Submitted</p>
                    <p className="text-sm font-medium text-forest">
                      {new Date(application.submitted_at).toLocaleString()}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-ink-light mb-1">Last Updated</p>
                  <p className="text-sm font-medium text-forest">
                    {new Date(application.updated_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Rejection Reason */}
            {application.rejection_reason && (
              <div className="card p-6 border-red-200 bg-red-50">
                <h2 className="font-display text-lg font-bold text-red-700 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Rejection Reason
                </h2>
                <p className="text-sm text-red-900 whitespace-pre-wrap">
                  {application.rejection_reason}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="font-display text-xl font-bold text-forest mb-4">
              Reject Application
            </h3>
            <div className="mb-4">
              <label className="label">Reason for Rejection *</label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="input-field"
                rows={4}
                placeholder="Explain why this application is being rejected..."
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRejectModal(false)
                  setRejectionReason('')
                }}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={!rejectionReason.trim() || actionLoading}
                className="btn-primary flex-1 !bg-red-600 hover:!bg-red-700"
              >
                {actionLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Reject'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Documents Modal */}
      {showDocsRequestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="font-display text-xl font-bold text-forest mb-4">
              Request Additional Documents
            </h3>
            <div className="mb-4">
              <label className="label">What documents do you need? *</label>
              <textarea
                value={docsRequestNote}
                onChange={(e) => setDocsRequestNote(e.target.value)}
                className="input-field"
                rows={4}
                placeholder="Specify which documents are needed and why..."
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDocsRequestModal(false)
                  setDocsRequestNote('')
                }}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestDocs}
                disabled={!docsRequestNote.trim() || actionLoading}
                className="btn-primary flex-1"
              >
                {actionLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Send Request'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
