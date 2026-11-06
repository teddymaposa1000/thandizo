'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react'

export default function ApplicationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()
  
  const [application, setApplication] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApplication()
  }, [])

  const fetchApplication = async () => {
    try {
      const { data, error } = await supabase
        .from('patient_applications')
        .select(`
          *,
          user:users(full_name, email, phone)
        `)
        .eq('id', params.id)
        .single()

      if (error) throw error
      setApplication(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async () => {
    try {
      await supabase
        .from('patient_applications')
        .update({ status: 'DIGITAL_REVIEW_PENDING' })
        .eq('id', params.id)
      
      alert('Application approved!')
      fetchApplication()
    } catch (error) {
      alert('Failed to approve')
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
          <h2 className="text-xl font-bold text-forest mb-4">Application not found</h2>
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
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/dashboard/admin/applications" className="p-2 hover:bg-sage rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-forest">{application.campaign_title}</h1>
            <p className="text-sm text-ink-light">Ref: {application.reference_number}</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <h2 className="text-xl font-bold text-forest mb-4">Patient Info</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-ink-light">Name</p>
                  <p className="font-medium">{application.user?.full_name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-light">Email</p>
                  <p className="font-medium">{application.user?.email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-light">Phone</p>
                  <p className="font-medium">{application.user?.phone || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="text-xl font-bold text-forest mb-4">Medical Details</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-ink-light">Condition</p>
                  <p className="font-medium">{application.medical_condition}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-light">Diagnosis</p>
                  <p>{application.diagnosis}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-light">Hospital</p>
                  <p className="font-medium">{application.hospital_name}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-light">Procedure</p>
                  <p className="font-medium">{application.procedure_required}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-light">Situation</p>
                  <p className="whitespace-pre-wrap">{application.situation_description}</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="text-xl font-bold text-forest mb-4">Campaign</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-ink-light">Requested Amount</p>
                  <p className="text-2xl font-bold text-emerald-th">
                    {application.currency} {application.requested_amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-ink-light">Patient Story</p>
                  <p className="whitespace-pre-wrap">{application.patient_story}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-lg font-bold text-forest mb-4">Status</h2>
              <p className="text-sm font-medium px-3 py-1 bg-blue-100 text-blue-700 rounded-full inline-block">
                {application.status.replace(/_/g, ' ')}
              </p>
            </div>

            <div className="card p-6">
              <h2 className="text-lg font-bold text-forest mb-4">Actions</h2>
              {application.status === 'SUBMITTED' && (
                <button
                  onClick={handleApprove}
                  className="btn-primary w-full"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Approve Application
                </button>
              )}
            </div>

            <div className="card p-6">
              <h2 className="text-lg font-bold text-forest mb-4">Timeline</h2>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-xs text-ink-light">Created</p>
                  <p className="font-medium">{new Date(application.created_at).toLocaleString()}</p>
                </div>
                {application.submitted_at && (
                  <div>
                    <p className="text-xs text-ink-light">Submitted</p>
                    <p className="font-medium">{new Date(application.submitted_at).toLocaleString()}</p>
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
