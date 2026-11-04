-- THANDIZO Database Schema for Supabase
-- Run this entire script in Supabase SQL Editor

-- =====================================================
-- USERS & AUTHENTICATION
-- =====================================================

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('PATIENT', 'DONOR', 'ADMIN', 'VERIFICATION_OFFICER', 'FINANCIAL_OFFICER', 'SUPPORT_OFFICER', 'HOSPITAL_REP', 'CORPORATE_PARTNER', 'REPRESENTATIVE')),
  phone TEXT,
  avatar_url TEXT,
  bio TEXT,
  country TEXT DEFAULT 'ZM',
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- PATIENT PROFILES & APPLICATIONS
-- =====================================================

CREATE TABLE IF NOT EXISTS patient_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('MALE', 'FEMALE', 'OTHER')),
  nationality TEXT,
  address TEXT,
  city TEXT,
  province TEXT,
  national_id_hash TEXT, -- Encrypted/hashed national ID
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS patient_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number TEXT UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  patient_profile_id UUID REFERENCES patient_profiles(id) ON DELETE SET NULL,
  
  -- Medical information
  medical_condition TEXT NOT NULL,
  diagnosis TEXT NOT NULL,
  situation_description TEXT NOT NULL,
  hospital_name TEXT NOT NULL,
  hospital_location TEXT,
  attending_doctor TEXT,
  procedure_required TEXT NOT NULL,
  urgency TEXT NOT NULL CHECK (urgency IN ('LOW', 'MEDIUM', 'HIGH', 'EMERGENCY')),
  estimated_cost DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'ZMW',
  additional_notes TEXT,
  
  -- Fundraising information
  requested_amount DECIMAL(12,2) NOT NULL,
  campaign_title TEXT NOT NULL,
  patient_story TEXT NOT NULL,
  fundraising_purpose TEXT,
  target_date DATE,
  public_photo_url TEXT,
  
  -- Consent
  medical_data_consent BOOLEAN DEFAULT false,
  identity_consent BOOLEAN DEFAULT false,
  publication_consent BOOLEAN DEFAULT false,
  hospital_contact_consent BOOLEAN DEFAULT false,
  consent_timestamp TIMESTAMP WITH TIME ZONE,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN (
    'DRAFT', 'SUBMITTED', 'DIGITAL_REVIEW_PENDING', 'ADDITIONAL_DOCS_REQUIRED',
    'DIGITALLY_VERIFIED', 'AWAITING_PHYSICAL_VERIFICATION', 
    'PHYSICAL_VERIFICATION_COMPLETED', 'FULLY_VERIFIED', 'REJECTED',
    'UNDER_INVESTIGATION', 'SUSPENDED'
  )),
  rejection_reason TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS medical_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES patient_applications(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN (
    'MEDICAL_REPORT', 'DOCTOR_LETTER', 'PRESCRIPTION', 'INVOICE',
    'LAB_RESULT', 'ID_DOC', 'PHOTO', 'CONSENT'
  )),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size_bytes INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  review_note TEXT
);

-- =====================================================
-- VERIFICATION SYSTEM
-- =====================================================

CREATE TABLE IF NOT EXISTS verification_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID UNIQUE NOT NULL REFERENCES patient_applications(id) ON DELETE CASCADE,
  assigned_officer_id UUID REFERENCES users(id) ON DELETE SET NULL,
  
  -- Digital verification
  digital_status TEXT DEFAULT 'PENDING' CHECK (digital_status IN ('PENDING', 'IN_PROGRESS', 'PASSED', 'FAILED')),
  identity_verified BOOLEAN DEFAULT false,
  medical_docs_verified BOOLEAN DEFAULT false,
  hospital_verified BOOLEAN DEFAULT false,
  quotation_verified BOOLEAN DEFAULT false,
  digital_notes TEXT,
  digital_completed_at TIMESTAMP WITH TIME ZONE,
  
  -- Physical verification
  physical_status TEXT DEFAULT 'NOT_STARTED' CHECK (physical_status IN (
    'NOT_STARTED', 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'FAILED'
  )),
  visit_scheduled_at TIMESTAMP WITH TIME ZONE,
  hospital_visited TEXT,
  contact_person TEXT,
  physical_completed_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS field_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  verification_case_id UUID NOT NULL REFERENCES verification_cases(id) ON DELETE CASCADE,
  officer_id UUID NOT NULL REFERENCES users(id),
  
  visit_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT NOT NULL,
  hospital_contacted BOOLEAN DEFAULT false,
  contact_name TEXT,
  contact_role TEXT,
  medical_need_confirmed BOOLEAN DEFAULT false,
  findings TEXT NOT NULL,
  recommendation TEXT NOT NULL CHECK (recommendation IN ('APPROVE', 'REJECT', 'NEEDS_MORE_INFO')),
  evidence_urls TEXT[] DEFAULT '{}',
  
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- CAMPAIGNS
-- =====================================================

CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  application_id UUID UNIQUE REFERENCES patient_applications(id) ON DELETE SET NULL,
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  title TEXT NOT NULL,
  story TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'EMERGENCY_TREATMENT', 'SURGERY', 'CANCER_TREATMENT', 'CHILDRENS_HEALTHCARE',
    'MATERNAL_HEALTHCARE', 'MEDICATION', 'HOSPITAL_BILLS', 'SPECIALIST_TREATMENT',
    'REHABILITATION', 'OTHER'
  )),
  public_photo_url TEXT,
  hospital_name TEXT,
  location TEXT,
  
  target_amount DECIMAL(12,2) NOT NULL,
  raised_amount DECIMAL(12,2) DEFAULT 0,
  currency TEXT DEFAULT 'ZMW',
  donor_count INTEGER DEFAULT 0,
  target_date DATE,
  
  status TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN (
    'DRAFT', 'PENDING_APPROVAL', 'ACTIVE', 'PAUSED', 'COMPLETED', 'SUSPENDED', 'REJECTED'
  )),
  is_verified BOOLEAN DEFAULT false,
  verification_level TEXT CHECK (verification_level IN ('DIGITAL_ONLY', 'FULL')),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  launched_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS campaign_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  photo_url TEXT,
  posted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS treatment_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  achieved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS saved_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, campaign_id)
);

-- =====================================================
-- DONATIONS & FINANCIAL
-- =====================================================

CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference TEXT UNIQUE NOT NULL,
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  donor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  
  amount DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'ZMW',
  payment_method TEXT NOT NULL CHECK (payment_method IN (
    'AIRTEL_MONEY', 'MTN_MONEY', 'ZAMTEL_KWACHA', 'VISA', 'MASTERCARD',
    'BANK_TRANSFER', 'CORPORATE_SPONSORSHIP', 'GRANT_ALLOCATION'
  )),
  is_anonymous BOOLEAN DEFAULT false,
  donor_name TEXT,
  donor_email TEXT,
  message TEXT,
  is_recurring BOOLEAN DEFAULT false,
  
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN (
    'PENDING', 'PROCESSING', 'SUCCESSFUL', 'FAILED', 'REFUNDED'
  )),
  provider_reference TEXT,
  failure_reason TEXT,
  receipt_url TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  refunded_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS financial_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN (
    'PATIENT_CAMPAIGN_FUNDS', 'CORPORATE_SPONSORSHIP', 'GRANT_FUNDING',
    'PLATFORM_OPERATING_INCOME', 'PLATFORM_EXPENSE', 'DISBURSEMENT', 'REFUND'
  )),
  reference_id UUID,
  amount DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'ZMW',
  description TEXT NOT NULL,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  recorded_by UUID REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS disbursements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference TEXT UNIQUE NOT NULL,
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  
  amount DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'ZMW',
  recipient_type TEXT NOT NULL CHECK (recipient_type IN ('HOSPITAL', 'PATIENT', 'REPRESENTATIVE')),
  recipient_name TEXT NOT NULL,
  recipient_account_ref TEXT,
  
  status TEXT NOT NULL DEFAULT 'REQUESTED' CHECK (status IN (
    'REQUESTED', 'UNDER_REVIEW', 'APPROVED', 'PROCESSING', 'COMPLETED', 'REJECTED', 'FAILED'
  )),
  approved_by_id UUID REFERENCES users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  proof_of_payment_url TEXT,
  payment_reference TEXT,
  
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT
);

-- =====================================================
-- CORPORATE PARTNERS
-- =====================================================

CREATE TABLE IF NOT EXISTS corporate_partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  company_name TEXT NOT NULL,
  registration_number TEXT,
  industry TEXT,
  website TEXT,
  contact_person TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  logo_url TEXT,
  description TEXT,
  csr_focus TEXT,
  
  tier TEXT NOT NULL DEFAULT 'COMMUNITY_SUPPORTER' CHECK (tier IN (
    'COMMUNITY_SUPPORTER', 'SILVER', 'GOLD', 'PLATINUM'
  )),
  status TEXT NOT NULL DEFAULT 'APPLIED' CHECK (status IN (
    'APPLIED', 'UNDER_REVIEW', 'ACTIVE', 'PAUSED', 'TERMINATED'
  )),
  total_contributed DECIMAL(14,2) DEFAULT 0,
  currency TEXT DEFAULT 'ZMW',
  
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS sponsorships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID NOT NULL REFERENCES corporate_partners(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  category TEXT CHECK (category IN (
    'EMERGENCY_TREATMENT', 'SURGERY', 'CANCER_TREATMENT', 'CHILDRENS_HEALTHCARE',
    'MATERNAL_HEALTHCARE', 'MEDICATION', 'HOSPITAL_BILLS', 'SPECIALIST_TREATMENT',
    'REHABILITATION', 'OTHER'
  )),
  amount DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'ZMW',
  purpose TEXT,
  donation_id UUID REFERENCES donations(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- GRANTS
-- =====================================================

CREATE TABLE IF NOT EXISTS grants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  funder_name TEXT NOT NULL,
  funder_type TEXT CHECK (funder_type IN ('NGO', 'FOUNDATION', 'GOVERNMENT', 'CORPORATE')),
  grant_name TEXT NOT NULL,
  amount DECIMAL(14,2) NOT NULL,
  currency TEXT DEFAULT 'ZMW',
  allocation TEXT NOT NULL DEFAULT 'PATIENT_ASSISTANCE' CHECK (allocation IN (
    'PATIENT_ASSISTANCE', 'PLATFORM_OPERATIONS', 'MIXED'
  )),
  
  status TEXT NOT NULL DEFAULT 'OPPORTUNITY_IDENTIFIED' CHECK (status IN (
    'OPPORTUNITY_IDENTIFIED', 'APPLICATION_DRAFT', 'APPLICATION_SUBMITTED',
    'UNDER_REVIEW', 'AWARDED', 'REJECTED', 'ACTIVE', 'COMPLETED'
  )),
  application_deadline DATE,
  award_date DATE,
  start_date DATE,
  end_date DATE,
  
  agreement_url TEXT,
  notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- HOSPITALS
-- =====================================================

CREATE TABLE IF NOT EXISTS hospitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  registration_number TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  country TEXT DEFAULT 'ZM',
  phone TEXT,
  email TEXT,
  website TEXT,
  documentation_url TEXT,
  
  status TEXT NOT NULL DEFAULT 'APPLIED' CHECK (status IN (
    'APPLIED', 'VERIFIED', 'ACTIVE', 'SUSPENDED'
  )),
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hospital_representatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  hospital_id UUID NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
  position TEXT NOT NULL,
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- NOTIFICATIONS & AUDIT
-- =====================================================

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN (
    'APPLICATION_UPDATE', 'VERIFICATION_UPDATE', 'DOCUMENT_REQUEST',
    'CAMPAIGN_APPROVAL', 'DONATION_RECEIVED', 'MILESTONE_REACHED',
    'DISBURSEMENT_UPDATE', 'SPONSORSHIP_RECEIVED', 'HOSPITAL_CONFIRMATION', 'SYSTEM'
  )),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link_url TEXT,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  metadata JSONB,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_patient_applications_user_id ON patient_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_patient_applications_status ON patient_applications(status);
CREATE INDEX IF NOT EXISTS idx_patient_applications_reference ON patient_applications(reference_number);
CREATE INDEX IF NOT EXISTS idx_medical_documents_application ON medical_documents(application_id);
CREATE INDEX IF NOT EXISTS idx_verification_cases_application ON verification_cases(application_id);
CREATE INDEX IF NOT EXISTS idx_verification_cases_officer ON verification_cases(assigned_officer_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_slug ON campaigns(slug);
CREATE INDEX IF NOT EXISTS idx_campaigns_owner ON campaigns(owner_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_category ON campaigns(category);
CREATE INDEX IF NOT EXISTS idx_donations_campaign ON donations(campaign_id);
CREATE INDEX IF NOT EXISTS idx_donations_donor ON donations(donor_id);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
CREATE INDEX IF NOT EXISTS idx_donations_reference ON donations(reference);
CREATE INDEX IF NOT EXISTS idx_financial_ledger_type ON financial_ledger(type);
CREATE INDEX IF NOT EXISTS idx_financial_ledger_campaign ON financial_ledger(campaign_id);
CREATE INDEX IF NOT EXISTS idx_disbursements_campaign ON disbursements(campaign_id);
CREATE INDEX IF NOT EXISTS idx_disbursements_status ON disbursements(status);
CREATE INDEX IF NOT EXISTS idx_corporate_partners_user ON corporate_partners(user_id);
CREATE INDEX IF NOT EXISTS idx_corporate_partners_status ON corporate_partners(status);
CREATE INDEX IF NOT EXISTS idx_sponsorships_partner ON sponsorships(partner_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE field_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE treatment_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE disbursements ENABLE ROW LEVEL SECURITY;
ALTER TABLE corporate_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsorships ENABLE ROW LEVEL SECURITY;
ALTER TABLE grants ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospital_representatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all users"
  ON users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('ADMIN', 'SUPER_ADMIN')
    )
  );

-- Patient applications policies
CREATE POLICY "Users can view their own applications"
  ON patient_applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications"
  ON patient_applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own draft applications"
  ON patient_applications FOR UPDATE
  USING (auth.uid() = user_id AND status = 'DRAFT');

CREATE POLICY "Admins and officers can view all applications"
  ON patient_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('ADMIN', 'SUPER_ADMIN', 'VERIFICATION_OFFICER', 'SUPPORT_OFFICER')
    )
  );

-- Campaigns policies
CREATE POLICY "Anyone can view active campaigns"
  ON campaigns FOR SELECT
  USING (status = 'ACTIVE');

CREATE POLICY "Users can view their own campaigns"
  ON campaigns FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can create campaigns"
  ON campaigns FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own draft campaigns"
  ON campaigns FOR UPDATE
  USING (auth.uid() = owner_id AND status = 'DRAFT');

-- Donations policies
CREATE POLICY "Anyone can create donations"
  ON donations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their own donations"
  ON donations FOR SELECT
  USING (auth.uid() = donor_id);

CREATE POLICY "Campaign owners can view donations to their campaigns"
  ON donations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE id = donations.campaign_id AND owner_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all donations"
  ON donations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('ADMIN', 'SUPER_ADMIN', 'FINANCIAL_OFFICER')
    )
  );

-- Notifications policies
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- Medical documents policies (restricted access)
CREATE POLICY "Users can view their own documents"
  ON medical_documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM patient_applications 
      WHERE id = medical_documents.application_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can upload documents to their applications"
  ON medical_documents FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM patient_applications 
      WHERE id = application_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins and officers can view all documents"
  ON medical_documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('ADMIN', 'SUPER_ADMIN', 'VERIFICATION_OFFICER')
    )
  );

-- Financial ledger (admin only)
CREATE POLICY "Admins can view financial ledger"
  ON financial_ledger FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('ADMIN', 'SUPER_ADMIN', 'FINANCIAL_OFFICER')
    )
  );

CREATE POLICY "Admins can create ledger entries"
  ON financial_ledger FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('ADMIN', 'SUPER_ADMIN', 'FINANCIAL_OFFICER')
    )
  );

-- Audit logs (admin only)
CREATE POLICY "Admins can view audit logs"
  ON audit_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('ADMIN', 'SUPER_ADMIN')
    )
  );

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patient_profiles_updated_at BEFORE UPDATE ON patient_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patient_applications_updated_at BEFORE UPDATE ON patient_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_verification_cases_updated_at BEFORE UPDATE ON verification_cases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_grants_updated_at BEFORE UPDATE ON grants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate reference numbers
CREATE OR REPLACE FUNCTION generate_reference_number(prefix TEXT)
RETURNS TEXT AS $$
DECLARE
  year_part TEXT;
  random_part TEXT;
BEGIN
  year_part := TO_CHAR(NOW(), 'YYYY');
  random_part := LPAD(FLOOR(RANDOM() * 999999)::TEXT, 6, '0');
  RETURN prefix || '-' || year_part || '-' || random_part;
END;
$$ LANGUAGE plpgsql;

-- Function to update campaign raised amount
CREATE OR REPLACE FUNCTION update_campaign_raised_amount()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'SUCCESSFUL' THEN
    UPDATE campaigns
    SET 
      raised_amount = raised_amount + NEW.amount,
      donor_count = donor_count + 1
    WHERE id = NEW.campaign_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update campaign totals when donation is successful
CREATE TRIGGER update_campaign_on_donation
  AFTER INSERT ON donations
  FOR EACH ROW
  WHEN (NEW.status = 'SUCCESSFUL')
  EXECUTE FUNCTION update_campaign_raised_amount();

-- =====================================================
-- STORAGE BUCKETS (for file uploads)
-- =====================================================

-- Create storage buckets (run these separately in Supabase Storage UI)
-- Note: You'll need to create these manually in Supabase Dashboard → Storage

-- INSERT INTO storage.buckets (id, name, public)
-- VALUES 
--   ('medical-documents', 'medical-documents', false),
--   ('campaign-photos', 'campaign-photos', true);

-- Storage policies (run after creating buckets)
-- CREATE POLICY "Users can upload medical documents"
--   ON storage.objects FOR INSERT
--   WITH CHECK (
--     bucket_id = 'medical-documents' 
--     AND auth.role() = 'authenticated'
--   );

-- CREATE POLICY "Users can view their own medical documents"
--   ON storage.objects FOR SELECT
--   USING (
--     bucket_id = 'medical-documents' 
--     AND auth.uid()::text = (storage.foldername(name))[1]
--   );

-- CREATE POLICY "Anyone can view campaign photos"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'campaign-photos');

-- CREATE POLICY "Authenticated users can upload campaign photos"
--   ON storage.objects FOR INSERT
--   WITH CHECK (
--     bucket_id = 'campaign-photos' 
--     AND auth.role() = 'authenticated'
--   );

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

-- If you see this, the schema has been created successfully!
SELECT 'THANDIZO database schema created successfully!' AS message;
