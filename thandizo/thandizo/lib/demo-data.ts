// THANDIZO Demo Data
// All patients, donations and statistics below are CLEARLY LABELLED AS FICTIONAL
// and are used only during development. Real data will replace these once the
// platform is operational and actual applications are received.

import { MedicalCategory } from "@prisma/client";

export const DEMO_DISCLAIMER =
  "DEMO DATA — All patient stories, photographs placeholders and donation figures shown on this development build are illustrative only. They do not represent real individuals or verified fundraising totals.";

export interface DemoCampaign {
  id: string;
  slug: string;
  title: string;
  patientInitial: string;
  category: MedicalCategory;
  location: string;
  story: string;
  targetAmount: number;
  raisedAmount: number;
  donorCount: number;
  verificationLevel: "FULL" | "DIGITAL_ONLY" | "PENDING";
  urgency: "EMERGENCY" | "HIGH" | "MEDIUM" | "LOW";
  daysLeft: number;
  gradient: string; // For photo placeholder
}

export const DEMO_CAMPAIGNS: DemoCampaign[] = [
  {
    id: "demo-1",
    slug: "heart-surgery-lusaka-child",
    title: "Heart Surgery for a 6-Year-Old",
    patientInitial: "M",
    category: "SURGERY",
    location: "Lusaka",
    story:
      "A young child requires urgent cardiac surgery that the family cannot afford. The procedure is available at a specialist hospital and time is critical.",
    targetAmount: 185000,
    raisedAmount: 74500,
    donorCount: 142,
    verificationLevel: "FULL",
    urgency: "EMERGENCY",
    daysLeft: 12,
    gradient: "from-emerald-th to-forest",
  },
  {
    id: "demo-2",
    slug: "maternal-care-ndola",
    title: "Safe Delivery & Maternal Care",
    patientInitial: "C",
    category: "MATERNAL_HEALTHCARE",
    location: "Ndola",
    story:
      "An expectant mother with complications needs specialist maternal care and a monitored delivery to ensure both mother and baby are safe.",
    targetAmount: 42000,
    raisedAmount: 31200,
    donorCount: 87,
    verificationLevel: "FULL",
    urgency: "HIGH",
    daysLeft: 28,
    gradient: "from-coral to-gold",
  },
  {
    id: "demo-3",
    slug: "cancer-treatment-kitwe",
    title: "Cancer Treatment Support",
    patientInitial: "J",
    category: "CANCER_TREATMENT",
    location: "Kitwe",
    story:
      "A father of three has been diagnosed with treatable cancer and requires a course of chemotherapy and follow-up care over several months.",
    targetAmount: 220000,
    raisedAmount: 98400,
    donorCount: 203,
    verificationLevel: "FULL",
    urgency: "HIGH",
    daysLeft: 45,
    gradient: "from-sky to-forest-light",
  },
  {
    id: "demo-4",
    slug: "rehabilitation-after-accident",
    title: "Rehabilitation After Road Accident",
    patientInitial: "T",
    category: "REHABILITATION",
    location: "Livingstone",
    story:
      "Following a serious road accident, a young professional requires months of physiotherapy and rehabilitation to regain mobility.",
    targetAmount: 68000,
    raisedAmount: 22100,
    donorCount: 54,
    verificationLevel: "DIGITAL_ONLY",
    urgency: "MEDIUM",
    daysLeft: 60,
    gradient: "from-forest to-emerald-th",
  },
  {
    id: "demo-5",
    slug: "childrens-medication-lusaka",
    title: "Essential Medication for Two Siblings",
    patientInitial: "A",
    category: "MEDICATION",
    location: "Lusaka",
    story:
      "Two siblings with a chronic condition require ongoing medication that their guardian is struggling to afford month to month.",
    targetAmount: 36000,
    raisedAmount: 18900,
    donorCount: 41,
    verificationLevel: "FULL",
    urgency: "MEDIUM",
    daysLeft: 90,
    gradient: "from-gold to-coral",
  },
  {
    id: "demo-6",
    slug: "emergency-surgery-chipata",
    title: "Emergency Appendectomy",
    patientInitial: "K",
    category: "EMERGENCY_TREATMENT",
    location: "Chipata",
    story:
      "An urgent surgical procedure is required within days. The family has exhausted their savings and needs immediate support.",
    targetAmount: 28000,
    raisedAmount: 24650,
    donorCount: 68,
    verificationLevel: "FULL",
    urgency: "EMERGENCY",
    daysLeft: 3,
    gradient: "from-red-500 to-coral",
  },
];

// Demo platform statistics — clearly marked as placeholder values
// In production these will come from real aggregated database queries.
export const DEMO_STATS = {
  isDemo: true,
  patientsAssisted: 0,
  totalRaised: 0,
  verifiedCampaigns: 0,
  activeDonors: 0,
  corporatePartners: 0,
  hospitalsOnboarded: 0,
};

export const IMPACT_MILESTONES = [
  {
    value: "Verified",
    label: "Every patient undergoes digital and physical verification",
    icon: "🛡️",
  },
  {
    value: "Transparent",
    label: "Full financial audit trail from donation to hospital",
    icon: "📊",
  },
  {
    value: "Direct",
    label: "Funds are paid directly to hospitals wherever possible",
    icon: "🏥",
  },
  {
    value: "Accountable",
    label: "Independent verification officers confirm every case",
    icon: "✅",
  },
];

export const FAQ_ITEMS = [
  {
    q: "How does Thandizo verify patients?",
    a: "Every application goes through a two-stage process: digital verification (medical reports, identity, hospital confirmation) followed by a physical verification visit by an independent officer who meets the patient and confirms the medical need in person.",
  },
  {
    q: "Where do donations go?",
    a: "Wherever possible, donations are paid directly to the treating hospital rather than to individuals. Every disbursement is logged, approved by a financial officer, and supported with proof of payment.",
  },
  {
    q: "Does Thandizo charge patients?",
    a: "No. Patients are never charged a fee to apply or to receive funds. Thandizo is funded through corporate partnerships, grants and — where clearly disclosed — small service fees on some donation types.",
  },
  {
    q: "Can companies sponsor patients?",
    a: "Yes. Corporate partners can sponsor individual patients, support entire medical categories, or fund emergency campaigns. We offer Community, Silver, Gold and Platinum partnership tiers with full reporting.",
  },
  {
    q: "Is my donation tax-deductible?",
    a: "This depends on your jurisdiction and the type of contribution. Corporate partners receive sponsorship statements; individual donors receive donation receipts that can be used for their own records.",
  },
  {
    q: "What happens if a campaign doesn't reach its target?",
    a: "Verified campaigns keep the funds raised, which are applied to the patient's treatment. In some cases Thandizo works with partners to bridge gaps for urgent cases.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "The verification process gave me confidence that my donation was going to someone who genuinely needed it.",
    name: "Donor, Lusaka",
    role: "Individual supporter",
  },
  {
    quote:
      "Thandizo's approach to paying hospitals directly is exactly the kind of accountability the sector needs.",
    name: "Healthcare administrator",
    role: "Partner hospital",
  },
  {
    quote:
      "As a corporate partner, the reporting and impact dashboard make CSR decisions straightforward.",
    name: "Corporate partner",
    role: "Gold tier",
  },
];
