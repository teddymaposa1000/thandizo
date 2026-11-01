# 🌿 THANDIZO

**A Little Help Can Save a Life.**  
**Verified Care. Shared Hope.**

THANDIZO is a medical crowdfunding platform that connects people who cannot afford medical treatment with donors, companies, and communities willing to help.

---

## 🚀 Quick Start

### View the Platform
The development server is already running at:
- **http://localhost:3000** — Landing page
- **http://localhost:3000/start** — Patient application form

### Install Dependencies (if needed)
```bash
cd /home/user/thandizo
npm install
```

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

---

## 📋 What's Built (Phase 1)

### ✅ Complete Features
- **Landing Page** — Professional, trust-building homepage with hero, features, FAQ, testimonials
- **Patient Application Form** — 6-step multi-step form for medical assistance requests
- **Database Schema** — Comprehensive PostgreSQL schema with 25+ entities
- **Design System** — Complete THANDIZO brand identity with colors, typography, components
- **Navigation** — Responsive header and footer with mobile menu
- **Demo Data** — Clearly labeled fictional campaigns and statistics

### 🗂️ Key Files
- `app/page.tsx` — Landing page
- `app/start/page.tsx` — Patient application form
- `prisma/schema.prisma` — Database schema
- `lib/brand.ts` — Design tokens and utilities
- `lib/demo-data.ts` — Demo campaigns and content
- `components/layout.tsx` — Logo, Footer
- `components/Header.tsx` — Navigation

---

## 🎯 Next Steps

### Phase 2: Authentication & Patient Flow
1. Set up Supabase (or NextAuth.js) for authentication
2. Connect application form to database
3. Build patient dashboard
4. Implement file upload system

### Phase 3: Verification Engine
1. Build admin dashboard for application review
2. Create verification officer portal
3. Implement digital + physical verification workflow
4. Add hospital verification system

### Phase 4: Campaigns & Donations
1. Create public campaign pages
2. Implement donation system with payment gateways
3. Build donor dashboard
4. Set up financial ledger and disbursement workflow

### Phase 5: Corporate & Grants
1. Build corporate partner portal
2. Implement grants management module
3. Create impact reporting system

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** PostgreSQL (via Prisma ORM)
- **Authentication:** Supabase (or NextAuth.js)
- **File Storage:** Supabase Storage
- **Icons:** Lucide React
- **Fonts:** Inter + Fraunces

---

## 🎨 Design System

### Colors
- **Forest Green:** #123E35 (primary)
- **Emerald:** #21865D (secondary)
- **Soft Mint:** #E8F4ED (accent)
- **Cream:** #FAFCFA (background)
- **Ink:** #26332D (text)

### Typography
- **Display:** Fraunces (headings)
- **Body:** Inter (body text)

### Components
- `btn-primary` — Forest green button
- `btn-secondary` — White button with forest border
- `btn-accent` — Emerald button
- `card` — White card with shadow
- `input-field` — Form input with focus states
- `badge-verified` — Green verification badge
- `badge-pending` — Amber pending badge
- `badge-urgent` — Red urgent badge

---

## 📊 Database Schema

### Key Entities
- **Users** — 9 roles (Patient, Donor, Corporate Partner, Hospital Rep, Admin roles)
- **Patient Applications** — Multi-step application with medical info and documents
- **Verification Cases** — Digital + physical verification workflow
- **Campaigns** — Fundraising campaigns with updates and milestones
- **Donations** — Payment tracking with multiple methods
- **Financial Ledger** — 7 ledger types for transparent accounting
- **Corporate Partners** — 4 partnership tiers
- **Grants** — Grant tracking with allocation types
- **Hospitals** — Hospital registration and representatives

### Application Status Workflow
```
DRAFT → SUBMITTED → DIGITAL_REVIEW_PENDING → DIGITALLY_VERIFIED
→ AWAITING_PHYSICAL_VERIFICATION → PHYSICAL_VERIFICATION_COMPLETED
→ FULLY_VERIFIED
```

---

## 🔐 Security Features

- **Encrypted ID Storage** — National IDs are hashed, never stored in plaintext
- **Private Document Storage** — Medical documents in private Supabase buckets
- **Consent Tracking** — Explicit consent with timestamps
- **Role-Based Access** — Granular permissions for 9 user roles
- **Audit Logs** — Every admin action is logged
- **Secure Payments** — Server-side verification only

---

## 🌍 Key Features

### Two-Stage Verification
1. **Digital Verification** — Document review, identity check, hospital confirmation
2. **Physical Verification** — Independent officer visit, field report, evidence collection

### Financial Transparency
- **Separate Ledgers** — Patient funds vs platform revenue
- **Direct Hospital Payments** — Funds paid directly to hospitals where possible
- **Audit Trail** — Every transaction logged with proof
- **Disbursement Workflow** — Multi-step approval process

### Corporate Partnerships
- **4 Tiers** — Community, Silver, Gold, Platinum
- **Impact Dashboard** — Real-time reporting for partners
- **Sponsorship Management** — Track contributions and impact
- **Bulk Contributions** — Support multiple patients or categories

---

## 📝 Environment Variables

Create `.env.local` from `.env.example`:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/thandizo"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Payment providers (test mode)
AIRTEL_MONEY_API_KEY=""
MTN_MONEY_API_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_PUBLISHABLE_KEY=""
```

---

## 🧪 Testing

### View Landing Page
1. Open http://localhost:3000
2. Explore all sections (hero, features, FAQ, etc.)
3. Test responsive design (resize browser)

### Test Application Form
1. Go to http://localhost:3000/start
2. Fill out all 6 steps
3. Test form validation
4. Check progress indicator

### Build Check
```bash
npm run build
```
Should complete without errors.

---

## 📚 Documentation

- **PHASE1_SUMMARY.md** — Detailed summary of what's been built
- **prisma/schema.prisma** — Complete database schema with comments
- **lib/brand.ts** — Design tokens and utility functions
- **Code comments** — Inline explanations throughout

---

## 🎯 Design Principles

1. **Trust First** — Verification badges, transparent processes, audit trails
2. **Compassion** — Warm colors, human-centered design, hopeful messaging
3. **Professionalism** — Clean typography, polished layouts, attention to detail
4. **Transparency** — Clear financial tracking, public verification status
5. **Accessibility** — Responsive design, semantic HTML, ARIA labels

---

## 🚧 Current Status

**Phase 1: Foundation** ✅ Complete
- Landing page
- Application form
- Database schema
- Design system

**Phase 2: Authentication** ⏳ Next
- User registration/login
- Session management
- Patient dashboard

**Phase 3: Verification** ⏳ Planned
- Admin dashboard
- Verification workflow
- Hospital portal

**Phase 4: Campaigns** ⏳ Planned
- Campaign pages
- Donation system
- Financial management

**Phase 5: Corporate** ⏳ Planned
- Partner portal
- Grants module
- Impact reporting

---

## 💡 Important Notes

### Demo Data
All patient stories, photographs, and donation figures shown in the development build are **clearly labeled as fictional**. Real data will appear once the platform is operational.

### Impact Statistics
The impact statistics section deliberately shows placeholders (—) rather than fabricated numbers. Real statistics will be calculated from actual database records.

### Payment Integration
Payment gateways are designed but not yet integrated. Test mode will be used initially with clear labeling.

---

## 🤝 Contributing

This is a humanitarian technology platform. When contributing:
- Prioritize security and privacy
- Maintain financial transparency
- Follow accessibility best practices
- Test thoroughly before deploying
- Document all changes

---

## 📞 Support

For questions or issues:
1. Review PHASE1_SUMMARY.md for detailed information
2. Check code comments for explanations
3. Inspect the Prisma schema for data model details
4. Test the application to understand user flows

---

## 🌟 Vision

THANDIZO aims to become Africa's most trusted medical crowdfunding platform, connecting patients in need with a compassionate community of donors, corporate partners, and healthcare institutions.

**A Little Help Can Save a Life.**

---

## 📄 License

Proprietary — THANDIZO Social Enterprise

---

**Built with ❤️ for Zambia and Africa**
