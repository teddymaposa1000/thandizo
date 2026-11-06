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
