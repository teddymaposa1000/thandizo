"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Stethoscope,
  FileText,
  Shield,
  Heart,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  AlertCircle,
} from "lucide-react";
import { Header, Footer } from "@/components/layout";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

export default function StartFundraiserPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal
    fullName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "Zambian",
    address: "",
    city: "",
    province: "",
    phone: "",
    email: "",

    // Step 2: Medical
    medicalCondition: "",
    diagnosis: "",
    situationDescription: "",
    hospitalName: "",
    hospitalLocation: "",
    attendingDoctor: "",
    procedureRequired: "",
    urgency: "MEDIUM",
    estimatedCost: "",
    additionalNotes: "",

    // Step 3: Documents (handled separately)
    documents: [] as File[],

    // Step 4: Identity
    nationalId: "",
    patientPhoto: null as File | null,
    guardianName: "",
    guardianRelationship: "",
    guardianPhone: "",

    // Step 5: Fundraising
    requestedAmount: "",
    campaignTitle: "",
    patientStory: "",
    fundraisingPurpose: "",
    targetDate: "",

    // Step 6: Consent
    medicalDataConsent: false,
    identityConsent: false,
    publicationConsent: false,
    hospitalContactConsent: false,
  });

  const steps = [
    { num: 1, title: "Personal Info", icon: User },
    { num: 2, title: "Medical Details", icon: Stethoscope },
    { num: 3, title: "Documents", icon: FileText },
    { num: 4, title: "Identity", icon: Shield },
    { num: 5, title: "Fundraising", icon: Heart },
    { num: 6, title: "Consent", icon: CheckCircle2 },
  ];

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep((currentStep + 1) as Step);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((currentStep - 1) as Step);
  };

  const handleSubmit = async () => {
    // In production, this would submit to the API
    alert("Application submitted! (Demo mode — no data saved)");
    router.push("/dashboard/patient");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 bg-sage/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-forest mb-2">
              Start a Medical Fundraiser
            </h1>
            <p className="text-ink-light">
              Complete this application to request medical assistance. You can save
              your progress and return later.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="bg-white rounded-2xl border border-sage p-6 mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isActive = currentStep === step.num;
                const isCompleted = currentStep > step.num;

                return (
                  <div key={step.num} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          isActive
                            ? "bg-forest text-white shadow-lg scale-110"
                            : isCompleted
                            ? "bg-emerald-th text-white"
                            : "bg-sage text-ink-light"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>
                      <span
                        className={`mt-2 text-xs font-medium text-center ${
                          isActive ? "text-forest" : "text-ink-light"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    {idx < steps.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-2 ${
                          isCompleted ? "bg-emerald-th" : "bg-sage"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-sage p-8">
            {currentStep === 1 && <Step1Personal formData={formData} updateField={updateField} />}
            {currentStep === 2 && <Step2Medical formData={formData} updateField={updateField} />}
            {currentStep === 3 && <Step3Documents formData={formData} updateField={updateField} />}
            {currentStep === 4 && <Step4Identity formData={formData} updateField={updateField} />}
            {currentStep === 5 && <Step5Fundraising formData={formData} updateField={updateField} />}
            {currentStep === 6 && <Step6Consent formData={formData} updateField={updateField} />}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-sage">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              {currentStep < 6 ? (
                <button onClick={nextStep} className="btn-primary">
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={handleSubmit} className="btn-primary">
                  <CheckCircle2 className="w-4 h-4" />
                  Submit Application
                </button>
              )}
            </div>
          </div>

          {/* Save Progress */}
          <div className="mt-6 text-center">
            <button className="text-sm text-ink-light hover:text-forest transition-colors">
              Save as draft and continue later
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// ============================================================
// STEP COMPONENTS
// ============================================================

function Step1Personal({ formData, updateField }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold text-forest mb-1">
          Personal Information
        </h2>
        <p className="text-sm text-ink-light">
          Tell us about the patient seeking medical assistance.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Full Legal Name *</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            className="input-field"
            placeholder="As shown on ID"
          />
        </div>
        <div>
          <label className="label">Date of Birth *</label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => updateField("dateOfBirth", e.target.value)}
            className="input-field"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => updateField("gender", e.target.value)}
            className="input-field"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="label">Nationality</label>
          <input
            type="text"
            value={formData.nationality}
            onChange={(e) => updateField("nationality", e.target.value)}
            className="input-field"
          />
        </div>
      </div>

      <div>
        <label className="label">Residential Address</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => updateField("address", e.target.value)}
          className="input-field"
          placeholder="Street address"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">City</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => updateField("city", e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="label">Province</label>
          <select
            value={formData.province}
            onChange={(e) => updateField("province", e.target.value)}
            className="input-field"
          >
            <option value="">Select province</option>
            <option value="lusaka">Lusaka</option>
            <option value="copperbelt">Copperbelt</option>
            <option value="southern">Southern</option>
            <option value="eastern">Eastern</option>
            <option value="northern">Northern</option>
            <option value="western">Western</option>
            <option value="central">Central</option>
            <option value="luapula">Luapula</option>
            <option value="northwestern">North-Western</option>
            <option value="muchinga">Muchinga</option>
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Phone Number *</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className="input-field"
            placeholder="+260 97 1234567"
          />
        </div>
        <div>
          <label className="label">Email Address *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="input-field"
            placeholder="patient@example.com"
          />
        </div>
      </div>
    </div>
  );
}

function Step2Medical({ formData, updateField }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold text-forest mb-1">
          Medical Information
        </h2>
        <p className="text-sm text-ink-light">
          Provide details about the medical condition and treatment needed.
        </p>
      </div>

      <div>
        <label className="label">Medical Condition *</label>
        <input
          type="text"
          value={formData.medicalCondition}
          onChange={(e) => updateField("medicalCondition", e.target.value)}
          className="input-field"
          placeholder="e.g., Heart disease, Cancer, Injury"
        />
      </div>

      <div>
        <label className="label">Diagnosis *</label>
        <textarea
          value={formData.diagnosis}
          onChange={(e) => updateField("diagnosis", e.target.value)}
          className="input-field"
          rows={3}
          placeholder="Official diagnosis from doctor"
        />
      </div>

      <div>
        <label className="label">Patient's Situation *</label>
        <textarea
          value={formData.situationDescription}
          onChange={(e) => updateField("situationDescription", e.target.value)}
          className="input-field"
          rows={4}
          placeholder="Describe the patient's medical situation and why assistance is needed"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Hospital / Clinic Name *</label>
          <input
            type="text"
            value={formData.hospitalName}
            onChange={(e) => updateField("hospitalName", e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="label">Hospital Location</label>
          <input
            type="text"
            value={formData.hospitalLocation}
            onChange={(e) => updateField("hospitalLocation", e.target.value)}
            className="input-field"
            placeholder="City, Province"
          />
        </div>
      </div>

      <div>
        <label className="label">Attending Doctor</label>
        <input
          type="text"
          value={formData.attendingDoctor}
          onChange={(e) => updateField("attendingDoctor", e.target.value)}
          className="input-field"
          placeholder="Dr. Name"
        />
      </div>

      <div>
        <label className="label">Required Procedure *</label>
        <input
          type="text"
          value={formData.procedureRequired}
          onChange={(e) => updateField("procedureRequired", e.target.value)}
          className="input-field"
          placeholder="e.g., Heart surgery, Chemotherapy"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Treatment Urgency *</label>
          <select
            value={formData.urgency}
            onChange={(e) => updateField("urgency", e.target.value)}
            className="input-field"
          >
            <option value="LOW">Low — Can wait months</option>
            <option value="MEDIUM">Medium — Within weeks</option>
            <option value="HIGH">High — Within days</option>
            <option value="EMERGENCY">Emergency — Immediate</option>
          </select>
        </div>
        <div>
          <label className="label">Estimated Cost (ZMW) *</label>
          <input
            type="number"
            value={formData.estimatedCost}
            onChange={(e) => updateField("estimatedCost", e.target.value)}
            className="input-field"
            placeholder="50000"
          />
        </div>
      </div>

      <div>
        <label className="label">Additional Notes</label>
        <textarea
          value={formData.additionalNotes}
          onChange={(e) => updateField("additionalNotes", e.target.value)}
          className="input-field"
          rows={3}
          placeholder="Any other relevant medical information"
        />
      </div>
    </div>
  );
}

function Step3Documents({ formData, updateField }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold text-forest mb-1">
          Medical Documentation
        </h2>
        <p className="text-sm text-ink-light">
          Upload supporting medical documents. All files are stored securely and only
          accessible to authorized verification officers.
        </p>
      </div>

      <div className="bg-mint/50 border border-emerald-th/20 rounded-xl p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-emerald-th flex-shrink-0 mt-0.5" />
        <div className="text-sm text-ink-light">
          <strong className="text-forest">Accepted formats:</strong> PDF, JPG, PNG.
          Maximum 10MB per file.
        </div>
      </div>

      <div className="space-y-4">
        <DocumentUpload
          label="Medical Reports"
          description="Official medical reports from hospital"
          required
        />
        <DocumentUpload
          label="Doctor's Letter"
          description="Letter from attending physician"
          required
        />
        <DocumentUpload
          label="Hospital Invoice / Quotation"
          description="Treatment cost breakdown"
          required
        />
        <DocumentUpload
          label="Laboratory Results"
          description="Test results and scans"
        />
        <DocumentUpload
          label="Prescriptions"
          description="Current medications"
        />
        <DocumentUpload
          label="Other Supporting Documents"
          description="Any additional relevant documents"
        />
      </div>
    </div>
  );
}

function DocumentUpload({ label, description, required }: any) {
  return (
    <div className="border-2 border-dashed border-sage rounded-xl p-6 hover:border-emerald-th/50 transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-mint flex items-center justify-center flex-shrink-0">
          <Upload className="w-6 h-6 text-emerald-th" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-forest">{label}</span>
            {required && <span className="text-coral text-xs">*</span>}
          </div>
          <p className="text-sm text-ink-light mb-3">{description}</p>
          <button className="btn-secondary !py-2 !px-4 text-sm">
            <Upload className="w-4 h-4" />
            Choose Files
          </button>
        </div>
      </div>
    </div>
  );
}

function Step4Identity({ formData, updateField }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold text-forest mb-1">
          Identity & Representation
        </h2>
        <p className="text-sm text-ink-light">
          Verify identity and provide guardian/representative details if applicable.
        </p>
      </div>

      <div>
        <label className="label">National ID Number *</label>
        <input
          type="text"
          value={formData.nationalId}
          onChange={(e) => updateField("nationalId", e.target.value)}
          className="input-field"
          placeholder="Securely encrypted"
        />
        <p className="text-xs text-ink-light mt-1">
          Your ID is encrypted and never stored in plaintext.
        </p>
      </div>

      <DocumentUpload
        label="Identity Document"
        description="National ID, Passport, or Driver's License"
        required
      />

      <DocumentUpload
        label="Patient Photograph"
        description="Recent clear photo of patient (with consent)"
      />

      <div className="border-t border-sage pt-6">
        <h3 className="font-display text-xl font-semibold text-forest mb-4">
          Guardian / Representative (Optional)
        </h3>
        <p className="text-sm text-ink-light mb-4">
          If someone else is managing this application on behalf of the patient.
        </p>

        <div className="space-y-4">
          <div>
            <label className="label">Guardian's Full Name</label>
            <input
              type="text"
              value={formData.guardianName}
              onChange={(e) => updateField("guardianName", e.target.value)}
              className="input-field"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Relationship to Patient</label>
              <input
                type="text"
                value={formData.guardianRelationship}
                onChange={(e) => updateField("guardianRelationship", e.target.value)}
                className="input-field"
                placeholder="e.g., Parent, Spouse, Sibling"
              />
            </div>
            <div>
              <label className="label">Guardian's Phone</label>
              <input
                type="tel"
                value={formData.guardianPhone}
                onChange={(e) => updateField("guardianPhone", e.target.value)}
                className="input-field"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step5Fundraising({ formData, updateField }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold text-forest mb-1">
          Fundraising Information
        </h2>
        <p className="text-sm text-ink-light">
          Tell donors about the campaign and how their support will help.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Requested Amount (ZMW) *</label>
          <input
            type="number"
            value={formData.requestedAmount}
            onChange={(e) => updateField("requestedAmount", e.target.value)}
            className="input-field"
            placeholder="50000"
          />
        </div>
        <div>
          <label className="label">Target Date (Optional)</label>
          <input
            type="date"
            value={formData.targetDate}
            onChange={(e) => updateField("targetDate", e.target.value)}
            className="input-field"
          />
        </div>
      </div>

      <div>
        <label className="label">Campaign Title *</label>
        <input
          type="text"
          value={formData.campaignTitle}
          onChange={(e) => updateField("campaignTitle", e.target.value)}
          className="input-field"
          placeholder="e.g., Heart Surgery for John"
        />
      </div>

      <div>
        <label className="label">Patient Story *</label>
        <textarea
          value={formData.patientStory}
          onChange={(e) => updateField("patientStory", e.target.value)}
          className="input-field"
          rows={6}
          placeholder="Share the patient's story in a way that helps donors understand the situation and feel connected..."
        />
        <p className="text-xs text-ink-light mt-1">
          This will be visible to donors. Be honest, respectful, and compelling.
        </p>
      </div>

      <div>
        <label className="label">Fundraising Purpose</label>
        <textarea
          value={formData.fundraisingPurpose}
          onChange={(e) => updateField("fundraisingPurpose", e.target.value)}
          className="input-field"
          rows={3}
          placeholder="How will the funds be used?"
        />
      </div>

      <DocumentUpload
        label="Public Campaign Photo"
        description="A photo to represent the campaign (with patient consent)"
      />
    </div>
  );
}

function Step6Consent({ formData, updateField }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold text-forest mb-1">
          Consent & Submission
        </h2>
        <p className="text-sm text-ink-light">
          Please review and accept the following consents before submitting.
        </p>
      </div>

      <div className="space-y-4">
        <ConsentCheckbox
          checked={formData.medicalDataConsent}
          onChange={(v: boolean) => updateField("medicalDataConsent", v)}
          label="Medical Data Processing"
          description="I consent to Thandizo processing the medical information provided for the purpose of verification and campaign management."
        />
        <ConsentCheckbox
          checked={formData.identityConsent}
          onChange={(v: boolean) => updateField("identityConsent", v)}
          label="Identity Verification"
          description="I consent to identity verification procedures, including secure storage of encrypted identity documents."
        />
        <ConsentCheckbox
          checked={formData.publicationConsent}
          onChange={(v: boolean) => updateField("publicationConsent", v)}
          label="Campaign Publication"
          description="I consent to the publication of the patient's story and approved photographs for fundraising purposes."
        />
        <ConsentCheckbox
          checked={formData.hospitalContactConsent}
          onChange={(v: boolean) => updateField("hospitalContactConsent", v)}
          label="Hospital Contact"
          description="I consent to Thandizo contacting the hospital and medical professionals to verify treatment details."
        />
      </div>

      <div className="bg-mint/50 border border-emerald-th/20 rounded-xl p-5">
        <h3 className="font-display text-lg font-semibold text-forest mb-3">
          Before You Submit
        </h3>
        <ul className="space-y-2 text-sm text-ink-light">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-th mt-0.5 flex-shrink-0" />
            All information provided is accurate to the best of my knowledge
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-th mt-0.5 flex-shrink-0" />
            I understand that false information may result in application rejection
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-th mt-0.5 flex-shrink-0" />
            I agree to Thandizo's Terms & Conditions and Privacy Policy
          </li>
        </ul>
      </div>

      <div className="bg-sage rounded-xl p-5">
        <h3 className="font-display text-lg font-semibold text-forest mb-2">
          What Happens Next?
        </h3>
        <ol className="space-y-2 text-sm text-ink-light list-decimal list-inside">
          <li>Your application receives a unique reference number</li>
          <li>Digital verification begins (1-3 days)</li>
          <li>You may be contacted for additional documents</li>
          <li>Physical verification visit is scheduled</li>
          <li>Once fully verified, your campaign goes live</li>
        </ol>
      </div>
    </div>
  );
}

function ConsentCheckbox({ checked, onChange, label, description }: any) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 w-5 h-5 rounded border-sage text-emerald-th focus:ring-emerald-th cursor-pointer"
      />
      <div>
        <div className="font-medium text-forest group-hover:text-emerald-th transition-colors">
          {label}
        </div>
        <div className="text-sm text-ink-light mt-0.5">{description}</div>
      </div>
    </label>
  );
}
