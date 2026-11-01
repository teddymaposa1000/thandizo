import Link from "next/link";
import {
  Heart,
  Shield,
  Search,
  ArrowRight,
  CheckCircle2,
  Building2,
  Stethoscope,
  Users,
  HandCoins,
  BadgeCheck,
  Eye,
  Handshake,
  ChevronRight,
  Clock,
  MapPin,
  Plus,
} from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { BRAND, MEDICAL_CATEGORIES, formatZMW } from "@/lib/brand";
import {
  DEMO_CAMPAIGNS,
  IMPACT_MILESTONES,
  FAQ_ITEMS,
  TESTIMONIALS,
} from "@/lib/demo-data";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection />
        <TrustBar />
        <HowItWorks />
        <FeaturedPatients />
        <EmergencyCampaigns />
        <MedicalCategories />
        <VerificationProcess />
        <CorporatePartners />
        <ImpactStats />
        <Testimonials />
        <FAQSection />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mint via-cream to-cream">
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-th/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-forest/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-emerald-th/20 text-xs font-medium text-forest mb-6 shadow-sm">
              <BadgeCheck className="w-3.5 h-3.5 text-emerald-th" />
              Every patient is independently verified
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-forest leading-[1.05] tracking-tight">
              Healthcare Should{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Never Be</span>
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-gold/30 -z-0 rounded" />
              </span>{" "}
              Out of Reach.
            </h1>

            <p className="mt-6 text-lg text-ink-light leading-relaxed max-w-xl">
              Thousands of people struggle to access essential medical treatment
              because of financial challenges. Thandizo connects people in need with
              those who can help — transparently, accountably, and with verified
              impact.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/patients" className="btn-primary !px-8 !py-4 text-base">
                <Search className="w-5 h-5" />
                Find Someone to Help
              </Link>
              <Link href="/start" className="btn-secondary !px-8 !py-4 text-base">
                Get Medical Assistance
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-ink-light">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-th" />
                <span>Free to apply</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-th" />
                <span>Direct hospital payments</span>
              </div>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="relative aspect-[4/5] max-w-md mx-auto">
              {/* Main image card */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-emerald-th to-forest">
                {/* Placeholder humanitarian healthcare visual using SVG */}
                <svg viewBox="0 0 400 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#21865D" />
                      <stop offset="100%" stopColor="#123E35" />
                    </linearGradient>
                    <linearGradient id="sunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#C9A961" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#C9A961" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="500" fill="url(#heroGrad)" />
                  <circle cx="320" cy="80" r="60" fill="url(#sunGrad)" />

                  {/* Stylized figures — healthcare worker and patient */}
                  <g opacity="0.95">
                    {/* Healthcare worker */}
                    <circle cx="150" cy="240" r="28" fill="#FAFCFA" />
                    <path d="M110 340 Q110 290 150 290 Q190 290 190 340 L190 420 L110 420 Z" fill="#FAFCFA" />
                    {/* Cross on uniform */}
                    <rect x="145" y="320" width="10" height="30" fill="#21865D" rx="2" />
                    <rect x="140" y="330" width="20" height="10" fill="#21865D" rx="2" />

                    {/* Patient */}
                    <circle cx="260" cy="250" r="24" fill="#E8F4ED" />
                    <path d="M225 345 Q225 305 260 305 Q295 305 295 345 L295 420 L225 420 Z" fill="#E8F4ED" />
                  </g>

                  {/* Hands connecting */}
                  <g opacity="0.9">
                    <path d="M185 360 Q205 345 225 360" stroke="#C9A961" strokeWidth="4" fill="none" strokeLinecap="round" />
                  </g>

                  {/* Heart in middle */}
                  <g transform="translate(205 330)">
                    <path d="M0 5 C-8 -8, -20 0, -10 10 L0 22 L10 10 C20 0, 8 -8, 0 5 Z" fill="#C9A961" />
                  </g>

                  {/* Decorative dots */}
                  <circle cx="50" cy="120" r="3" fill="#E8F4ED" opacity="0.6" />
                  <circle cx="80" cy="160" r="2" fill="#E8F4ED" opacity="0.4" />
                  <circle cx="340" cy="200" r="2.5" fill="#E8F4ED" opacity="0.5" />
                  <circle cx="360" cy="260" r="2" fill="#E8F4ED" opacity="0.4" />
                </svg>
              </div>

              {/* Floating card — verified badge */}
              <div className="absolute -left-6 top-12 bg-white rounded-2xl shadow-xl p-4 w-48 animate-float">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-mint flex items-center justify-center">
                    <Shield className="w-5 h-5 text-emerald-th" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-forest">Fully Verified</div>
                    <div className="text-[10px] text-ink-light">Physical visit complete</div>
                  </div>
                </div>
              </div>

              {/* Floating card — donation */}
              <div className="absolute -right-4 bottom-16 bg-white rounded-2xl shadow-xl p-4 w-52 animate-float-delayed">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-ink-light">New donation</span>
                  <Heart className="w-3.5 h-3.5 text-coral" fill="currentColor" />
                </div>
                <div className="text-lg font-semibold text-forest">K 2,500</div>
                <div className="text-xs text-ink-light mt-1">from a donor in Lusaka</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

// ============================================================
// TRUST BAR
// ============================================================
function TrustBar() {
  const items = [
    { icon: Shield, text: "Two-stage verification" },
    { icon: Stethoscope, text: "Hospital-confirmed cases" },
    { icon: Building2, text: "Direct hospital payments" },
    { icon: Eye, text: "Transparent disbursements" },
  ];

  return (
    <section className="bg-white border-y border-sage">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="w-10 h-10 rounded-lg bg-mint flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-forest" />
              </div>
              <span className="text-sm font-medium text-ink">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// HOW IT WORKS
// ============================================================
function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Apply",
      description:
        "Patients or their representatives submit a detailed medical assistance application with supporting documentation.",
      icon: Plus,
    },
    {
      step: "02",
      title: "Verify",
      description:
        "Our team conducts digital verification, followed by an independent physical visit to confirm the case in person.",
      icon: Shield,
    },
    {
      step: "03",
      title: "Fundraise",
      description:
        "Approved campaigns go live to donors, corporate partners and foundations who contribute toward the target.",
      icon: HandCoins,
    },
    {
      step: "04",
      title: "Deliver",
      description:
        "Funds are paid directly to the hospital where possible, with full audit trail and proof of payment.",
      icon: Handshake,
    },
  ];

  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="How Thandizo Works"
          title="A transparent path from need to care"
          description="Four carefully designed stages ensure every contribution reaches a verified patient and every patient receives accountable care."
        />

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={step.step} className="relative">
              <div className="card p-6 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-th to-forest flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-display text-4xl font-semibold text-sage">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-forest mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-ink-light leading-relaxed">
                  {step.description}
                </p>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                  <ChevronRight className="w-6 h-6 text-emerald-th/40" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FEATURED PATIENTS
// ============================================================
function FeaturedPatients() {
  const featured = DEMO_CAMPAIGNS.slice(0, 3);

  return (
    <section className="py-24 bg-sage/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow="Featured Verified Patients"
            title="Cases ready for your support"
            align="left"
            className="mb-0"
          />
          <Link
            href="/patients"
            className="btn-secondary !py-3 self-start sm:self-auto"
          >
            View all patients
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <DemoNotice />

        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((c) => (
            <CampaignCard key={c.id} campaign={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// EMERGENCY CAMPAIGNS
// ============================================================
function EmergencyCampaigns() {
  const emergencies = DEMO_CAMPAIGNS.filter((c) => c.urgency === "EMERGENCY");

  return (
    <section className="py-24 bg-gradient-to-br from-forest to-forest-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-coral/20 backdrop-blur flex items-center justify-center">
            <Clock className="w-5 h-5 text-coral" />
          </div>
          <span className="text-xs font-medium text-coral uppercase tracking-widest">
            Urgent medical needs
          </span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-4 max-w-3xl">
          Emergency campaigns that can't wait.
        </h2>
        <p className="text-white/70 text-lg mb-10 max-w-2xl">
          These verified patients have time-critical medical needs. Every hour counts.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {emergencies.map((c) => (
            <div key={c.id} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center text-white text-2xl font-semibold flex-shrink-0`}>
                  {c.patientInitial}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="badge-urgent">
                      <Clock className="w-3 h-3" /> {c.daysLeft} days left
                    </span>
                    {c.verificationLevel === "FULL" && (
                      <span className="badge-verified !bg-white/10 !text-white !border-white/20">
                        <Shield className="w-3 h-3" /> Fully Verified
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-1 truncate">
                    {c.title}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-white/60 mb-4">
                    <MapPin className="w-3.5 h-3.5" />
                    {c.location}
                  </div>

                  <CampaignProgress
                    raised={c.raisedAmount}
                    target={c.targetAmount}
                    variant="light"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MEDICAL CATEGORIES
// ============================================================
function MedicalCategories() {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Medical Categories"
          title="Find a cause that speaks to you"
          description="Support the kind of medical need that matters most to you — from emergency surgeries to long-term rehabilitation."
        />

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {MEDICAL_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/patients?category=${cat.id}`}
              className="card p-5 hover:border-emerald-th/30 hover:-translate-y-0.5 transition-all group"
            >
              <div className="text-3xl mb-3">{cat.icon}</div>
              <div className="font-medium text-forest text-sm leading-tight group-hover:text-emerald-th transition-colors">
                {cat.label}
              </div>
              <ChevronRight className="w-4 h-4 text-ink-light/50 mt-3 group-hover:text-emerald-th group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// VERIFICATION PROCESS
// ============================================================
function VerificationProcess() {
  return (
    <section className="py-24 bg-mint/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block text-xs font-medium text-emerald-th uppercase tracking-widest mb-4">
              Our Verification Process
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-forest leading-tight mb-6">
              Trust is earned,<br />not assumed.
            </h2>
            <p className="text-lg text-ink-light leading-relaxed mb-8">
              Thandizo operates a rigorous two-stage verification process. Every
              patient must be confirmed through documentation and in-person before
              they can receive the highest verification badge.
            </p>

            <div className="space-y-4">
              <VerificationStage
                number="1"
                title="Digital Verification"
                items={[
                  "Identity documentation review",
                  "Medical report authentication",
                  "Hospital and doctor confirmation",
                  "Treatment quotation review",
                  "Consent verification",
                ]}
              />
              <VerificationStage
                number="2"
                title="Physical Verification"
                items={[
                  "Independent officer visit",
                  "Patient and guardian interview",
                  "Hospital personnel contact",
                  "Evidence collection with consent",
                  "Field report and recommendation",
                ]}
              />
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-th to-forest rounded-3xl rotate-3 opacity-20" />
              <div className="absolute inset-0 bg-white rounded-3xl shadow-xl p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-medium text-ink-light uppercase tracking-wider">
                      Verification Status
                    </span>
                    <span className="badge-verified">
                      <Shield className="w-3 h-3" />
                      Fully Verified
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-forest mb-2">
                    Sample Patient Record
                  </h3>
                  <p className="text-sm text-ink-light">
                    Visual representation of what a verified patient record looks like to donors.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "Identity verified", done: true },
                    { label: "Medical report authenticated", done: true },
                    { label: "Hospital confirmation", done: true },
                    { label: "Physical visit completed", done: true },
                    { label: "Field report approved", done: true },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-th/10 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-emerald-th" />
                      </div>
                      <span className="text-sm text-ink">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VerificationStage({ number, title, items }: { number: string; title: string; items: string[] }) {
  return (
    <div className="bg-white rounded-2xl border border-sage p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-forest text-white font-display font-semibold flex items-center justify-center">
          {number}
        </div>
        <h3 className="font-display text-lg font-semibold text-forest">{title}</h3>
      </div>
      <ul className="space-y-2 pl-1">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-ink-light">
            <CheckCircle2 className="w-4 h-4 text-emerald-th mt-0.5 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================================
// CORPORATE PARTNERS
// ============================================================
function CorporatePartners() {
  const tiers = [
    { tier: "Community", color: "from-ink-light to-ink", min: "K 10,000+" },
    { tier: "Silver", color: "from-slate-400 to-slate-600", min: "K 100,000+" },
    { tier: "Gold", color: "from-gold to-amber-600", min: "K 500,000+" },
    { tier: "Platinum", color: "from-forest to-emerald-th", min: "K 2,000,000+" },
  ];

  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Corporate Partnerships"
          title="CSR with measurable impact"
          description="Companies sponsor patients, fund medical categories and support emergency campaigns — with full reporting and transparent impact dashboards."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiers.map((t) => (
            <div key={t.tier} className="card overflow-hidden group hover:-translate-y-1 transition-transform">
              <div className={`h-24 bg-gradient-to-br ${t.color} flex items-end p-4`}>
                <span className="font-display text-2xl font-semibold text-white">{t.tier}</span>
              </div>
              <div className="p-5">
                <div className="text-xs text-ink-light uppercase tracking-wider mb-1">
                  From
                </div>
                <div className="font-display text-xl font-semibold text-forest mb-4">
                  {t.min}
                </div>
                <ul className="space-y-2 text-sm text-ink-light">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-th" />
                    Impact reporting
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-th" />
                    Sponsorship statements
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-th" />
                    Brand recognition
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/partners" className="btn-primary">
            <Building2 className="w-4 h-4" />
            Become a Corporate Partner
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// IMPACT STATS
// ============================================================
function ImpactStats() {
  // Real stats will come from database. Until then we show zeros honestly.
  const stats = [
    { label: "Verified patients assisted", value: "—" },
    { label: "Total funds raised (ZMW)", value: "—" },
    { label: "Active verified campaigns", value: "—" },
    { label: "Donors who have given", value: "—" },
  ];

  return (
    <section className="py-24 bg-sage/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Platform Impact"
          title="Measured, accountable, transparent"
          description="Every number on this platform is sourced from verified transactions. We do not inflate statistics or invent impact."
        />

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="card p-6 text-center">
              <div className="font-display text-4xl sm:text-5xl font-semibold text-forest mb-2">
                {stat.value}
              </div>
              <div className="text-xs text-ink-light uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-ink-light/70 italic max-w-2xl mx-auto">
          Impact statistics will update automatically once the platform receives its
          first verified applications and donations. During development, we
          deliberately display placeholders rather than fabricated numbers.
        </p>

        <div className="mt-14 grid md:grid-cols-4 gap-4">
          {IMPACT_MILESTONES.map((m) => (
            <div key={m.value} className="bg-white rounded-2xl border border-sage p-5">
              <div className="text-3xl mb-3">{m.icon}</div>
              <div className="font-display text-lg font-semibold text-forest mb-1">
                {m.value}
              </div>
              <div className="text-xs text-ink-light leading-relaxed">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TESTIMONIALS
// ============================================================
function Testimonials() {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Voices from the Community"
          title="Why people trust Thandizo"
        />

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <figure key={idx} className="card p-8">
              <div className="font-display text-6xl text-emerald-th/30 leading-none mb-2">
                "
              </div>
              <blockquote className="text-ink leading-relaxed mb-6">
                {t.quote}
              </blockquote>
              <figcaption>
                <div className="font-medium text-forest">{t.name}</div>
                <div className="text-sm text-ink-light">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FAQ
// ============================================================
function FAQSection() {
  return (
    <section className="py-24 bg-sage/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Frequently Asked Questions"
          title="Clear answers, no fine print"
        />

        <div className="mt-14 space-y-3">
          {FAQ_ITEMS.map((item, idx) => (
            <details
              key={idx}
              className="group card p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer"
            >
              <summary className="flex items-center justify-between gap-4 font-medium text-forest">
                {item.q}
                <Plus className="w-5 h-5 text-emerald-th transition-transform group-open:rotate-45 flex-shrink-0" />
              </summary>
              <p className="mt-4 text-ink-light leading-relaxed text-sm">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FINAL CTA
// ============================================================
function FinalCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-mint via-cream to-cream relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(33,134,93,0.08),transparent_50%)]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-emerald-th/20 text-xs font-medium text-forest mb-6">
          <Heart className="w-3.5 h-3.5 text-coral" fill="currentColor" />
          {BRAND.tagline}
        </div>

        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-forest leading-tight mb-6">
          A little help can<br />save a life.
        </h2>
        <p className="text-lg text-ink-light max-w-2xl mx-auto mb-10">
          Whether you give K 50 or K 500,000 — whether you're an individual, a
          company or a foundation — your contribution reaches a verified patient,
          through a transparent process, with proof.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/donate" className="btn-primary !px-8 !py-4 text-base">
            <Heart className="w-5 h-5" />
            Donate Now
          </Link>
          <Link href="/start" className="btn-secondary !px-8 !py-4 text-base">
            Start a Fundraiser
          </Link>
          <Link href="/partners" className="btn-accent !px-8 !py-4 text-base">
            <Building2 className="w-5 h-5" />
            Partner With Us
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SHARED COMPONENTS
// ============================================================
function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      {eyebrow && (
        <span className="inline-block text-xs font-medium text-emerald-th uppercase tracking-widest mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-forest leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-ink-light leading-relaxed">{description}</p>
      )}
    </div>
  );
}

function DemoNotice() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2">
      <span className="font-semibold">Development build:</span>
      <span>
        Patient stories and figures shown are illustrative placeholders. Real
        verified cases will appear when the platform launches.
      </span>
    </div>
  );
}

function CampaignCard({ campaign }: { campaign: any }) {
  const progress = (campaign.raisedAmount / campaign.targetAmount) * 100;

  return (
    <Link href={`/patients/${campaign.slug}`} className="card overflow-hidden group block">
      <div className={`aspect-[4/3] bg-gradient-to-br ${campaign.gradient} relative`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/90 font-display text-6xl font-semibold">
            {campaign.patientInitial}
          </span>
        </div>
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {campaign.verificationLevel === "FULL" && (
            <span className="badge-verified">
              <Shield className="w-3 h-3" /> Verified
            </span>
          )}
          {campaign.urgency === "EMERGENCY" && (
            <span className="badge-urgent">
              <Clock className="w-3 h-3" /> Urgent
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur rounded-full px-3 py-1 text-xs font-medium text-forest flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {campaign.location}
        </div>
      </div>

      <div className="p-5">
        <div className="text-xs font-medium text-emerald-th uppercase tracking-wider mb-1.5">
          {MEDICAL_CATEGORIES.find((c) => c.id === campaign.category)?.label}
        </div>
        <h3 className="font-display text-lg font-semibold text-forest mb-2 group-hover:text-emerald-th transition-colors line-clamp-2">
          {campaign.title}
        </h3>
        <p className="text-sm text-ink-light line-clamp-2 mb-4">
          {campaign.story}
        </p>

        <CampaignProgress
          raised={campaign.raisedAmount}
          target={campaign.targetAmount}
          donorCount={campaign.donorCount}
        />
      </div>
    </Link>
  );
}

function CampaignProgress({
  raised,
  target,
  donorCount,
  variant = "default",
}: {
  raised: number;
  target: number;
  donorCount?: number;
  variant?: "default" | "light";
}) {
  const progress = Math.min((raised / target) * 100, 100);
  const isLight = variant === "light";

  return (
    <div>
      <div className={`h-1.5 rounded-full ${isLight ? "bg-white/20" : "bg-sage"} overflow-hidden mb-2`}>
        <div
          className="h-full bg-gradient-to-r from-emerald-th to-forest rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className={`flex items-center justify-between text-xs ${isLight ? "text-white/80" : "text-ink-light"}`}>
        <span>
          <span className={`font-semibold ${isLight ? "text-white" : "text-forest"}`}>
            {formatZMW(raised)}
          </span>{" "}
          of {formatZMW(target)}
        </span>
        {donorCount !== undefined && (
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {donorCount}
          </span>
        )}
      </div>
    </div>
  );
}
