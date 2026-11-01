// THANDIZO Design Tokens & UI Primitives
// Centralized brand system — used across all components

export const BRAND = {
  name: "Thandizo",
  tagline: "A Little Help Can Save a Life.",
  statement: "Verified Care. Shared Hope.",
  colors: {
    forest: "#123E35",
    forestDark: "#0B2820",
    forestLight: "#1A5548",
    emerald: "#21865D",
    emeraldLight: "#2BA374",
    mint: "#E8F4ED",
    cream: "#FAFCFA",
    ink: "#26332D",
    sage: "#F2F5F3",
    gold: "#C9A961",
  },
} as const;

export const MEDICAL_CATEGORIES = [
  { id: "EMERGENCY_TREATMENT", label: "Emergency Treatment", icon: "🚨" },
  { id: "SURGERY", label: "Surgery", icon: "🏥" },
  { id: "CANCER_TREATMENT", label: "Cancer Treatment", icon: "🎗️" },
  { id: "CHILDRENS_HEALTHCARE", label: "Children's Healthcare", icon: "👶" },
  { id: "MATERNAL_HEALTHCARE", label: "Maternal Healthcare", icon: "🤰" },
  { id: "MEDICATION", label: "Medication", icon: "💊" },
  { id: "HOSPITAL_BILLS", label: "Hospital Bills", icon: "🧾" },
  { id: "SPECIALIST_TREATMENT", label: "Specialist Treatment", icon: "👨‍⚕️" },
  { id: "REHABILITATION", label: "Rehabilitation", icon: "🦽" },
  { id: "OTHER", label: "Other Medical Needs", icon: "🩺" },
] as const;

export const VERIFICATION_STATUSES = {
  DRAFT: { label: "Draft", color: "slate" },
  SUBMITTED: { label: "Submitted", color: "blue" },
  DIGITAL_REVIEW_PENDING: { label: "Digital Review", color: "amber" },
  ADDITIONAL_DOCS_REQUIRED: { label: "Docs Required", color: "orange" },
  DIGITALLY_VERIFIED: { label: "Digitally Verified", color: "sky" },
  AWAITING_PHYSICAL_VERIFICATION: { label: "Awaiting Field Visit", color: "purple" },
  PHYSICAL_VERIFICATION_COMPLETED: { label: "Field Visit Complete", color: "indigo" },
  FULLY_VERIFIED: { label: "Fully Verified", color: "emerald" },
  REJECTED: { label: "Rejected", color: "red" },
  UNDER_INVESTIGATION: { label: "Under Investigation", color: "rose" },
  SUSPENDED: { label: "Suspended", color: "gray" },
} as const;

export const PARTNERSHIP_TIERS = {
  COMMUNITY_SUPPORTER: { label: "Community Supporter", minContribution: 10000 },
  SILVER: { label: "Silver Partner", minContribution: 100000 },
  GOLD: { label: "Gold Partner", minContribution: 500000 },
  PLATINUM: { label: "Platinum Partner", minContribution: 2000000 },
} as const;

// Format Zambian Kwacha
export function formatZMW(amount: number): string {
  return new Intl.NumberFormat("en-ZM", {
    style: "currency",
    currency: "ZMW",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Generate application reference number
export function generateReferenceNumber(prefix: string = "THD"): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 999999).toString().padStart(6, "0");
  return `${prefix}-${year}-${random}`;
}

// Time ago formatter
export function timeAgo(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
