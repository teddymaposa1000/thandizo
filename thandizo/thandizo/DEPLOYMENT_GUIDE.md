# 🚀 THANDIZO Production Deployment Guide

This guide will walk you through deploying THANDIZO to production so it's publicly accessible.

---

## 📋 Prerequisites

Before deploying, you'll need:

1. **GitHub Account** — To push your code
2. **Vercel Account** — For hosting (free tier available)
3. **Supabase Account** — For database + authentication (free tier available)
4. **Domain Name** (optional) — For custom branding

---

## 🎯 Deployment Overview

We'll deploy in this order:

1. **Push code to GitHub**
2. **Set up Supabase** (database + auth)
3. **Deploy to Vercel** (hosting)
4. **Configure environment variables**
5. **Test production deployment**
6. **(Optional) Add custom domain**

---

## Step 1: Push Code to GitHub

### 1.1 Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `thandizo`
3. Make it **Public** or **Private** (your choice)
4. **Don't** initialize with README, .gitignore, or license
5. Click **Create repository**

### 1.2 Push Your Code

Run these commands in your terminal:

```bash
cd /home/user/thandizo

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "🎉 Initial commit: THANDIZO Phase 1 Foundation"

# Add GitHub as remote
git remote add origin https://github.com/YOUR_USERNAME/thandizo.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### 1.3 Verify on GitHub

Visit your repository at `https://github.com/YOUR_USERNAME/thandizo` and confirm all files are there.

---

## Step 2: Set Up Supabase

Supabase provides PostgreSQL database + authentication + file storage.

### 2.1 Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click **Start your project**
3. Sign up with GitHub (easiest) or email

### 2.2 Create a New Project

1. Click **New Project**
2. Select your organization
3. Fill in project details:
   - **Name:** `thandizo`
   - **Database Password:** (generate a strong password and save it)
   - **Region:** Choose closest to your users (e.g., `West EU` for Africa)
   - **Pricing Plan:** Free (sufficient for starting)
4. Click **Create new project**
5. Wait 2-3 minutes for setup to complete

### 2.3 Get Your Credentials

1. Go to **Project Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`)

3. Go to **Project Settings** → **Database** → **Connection string**
4. Copy the **Transaction** connection string (starts with `postgresql://...`)

**Save all these credentials securely!**

### 2.4 Push Database Schema

Run these commands locally:

```bash
cd /home/user/thandizo

# Install Supabase CLI (if not installed)
npm install -g supabase

# Log in to Supabase
supabase login

# Link your project (you'll need your project reference ID)
supabase link --project-ref YOUR_PROJECT_REF

# Push the schema
supabase db push
```

Your project reference ID is in the Supabase dashboard URL: `https://supabase.com/dashboard/project/YOUR_PROJECT_REF`

### 2.5 Verify Database

1. Go to Supabase Dashboard → **Table Editor**
2. You should see tables like `User`, `PatientApplication`, `Campaign`, etc.

---

## Step 3: Deploy to Vercel

Vercel is the easiest way to deploy Next.js applications.

### 3.1 Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up**
3. Sign up with GitHub (easiest)

### 3.2 Import Your Project

1. Click **Add New...** → **Project**
2. Find your `thandizo` repository
3. Click **Import**

### 3.3 Configure Environment Variables

In the Vercel deployment screen, add these environment variables:

```bash
# Database
DATABASE_URL="postgresql://..."  # Your Supabase connection string

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."

# App
NEXT_PUBLIC_APP_URL="https://thandizo.vercel.app"  # Will update after deployment
```

### 3.4 Deploy

1. Click **Deploy**
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like `https://thandizo-xxxxx.vercel.app`

### 3.5 Update Environment Variables

1. Go to your Vercel project dashboard
2. Go to **Settings** → **Environment Variables**
3. Update `NEXT_PUBLIC_APP_URL` with your actual Vercel URL
4. Click **Save**
5. **Redeploy** (Vercel will prompt you)

### 3.6 Test Your Deployment

1. Visit your Vercel URL
2. Test the landing page
3. Test the application form at `/start`
4. Check that everything works

---

## Step 4: Configure Authentication (Optional but Recommended)

If you want users to register and log in:

### 4.1 Enable Email Authentication in Supabase

1. Go to Supabase Dashboard → **Authentication** → **Providers**
2. Enable **Email**
3. Configure:
   - **Enable Email provider:** ✅
   - **Confirm email:** ✅ (recommended)
   - **Secure email change:** ✅
   - **Secure password change:** ✅

### 4.2 Configure Email Templates

1. Go to **Authentication** → **Email Templates**
2. Customize templates for:
   - Confirmation email
   - Password reset
   - Magic link (optional)

### 4.3 Add Site URL

1. Go to **Authentication** → **URL Configuration**
2. Add your Vercel URL to **Site URL**
3. Add to **Redirect URLs**

---

## Step 5: Set Up File Storage (For Document Uploads)

### 5.1 Create Storage Buckets

1. Go to Supabase Dashboard → **Storage**
2. Create two buckets:
   - **medical-documents** (private) — For medical reports, IDs
   - **campaign-photos** (public) — For campaign images

### 5.2 Configure Bucket Policies

**For medical-documents (private):**
```sql
-- Only authenticated users can upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'medical-documents');

-- Only document owners can view
CREATE POLICY "Users can view own documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'medical-documents' AND owner = auth.uid());
```

**For campaign-photos (public):**
```sql
-- Anyone can view
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'campaign-photos');

-- Authenticated users can upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'campaign-photos');
```

---

## Step 6: Configure Payment Gateways (When Ready)

### 6.1 Airtel Money API

1. Apply for Airtel Money API access
2. Get API credentials
3. Add to Vercel environment variables:
   ```bash
   AIRTEL_MONEY_API_KEY="..."
   AIRTEL_MONEY_API_SECRET="..."
   ```

### 6.2 MTN Mobile Money API

1. Apply for MTN MoMo API access
2. Get API credentials
3. Add to Vercel environment variables:
   ```bash
   MTN_MONEY_API_KEY="..."
   MTN_MONEY_API_SECRET="..."
   ```

### 6.3 Stripe (For Card Payments)

1. Create Stripe account at [stripe.com](https://stripe.com)
2. Get API keys from Dashboard → **Developers** → **API keys**
3. Add to Vercel environment variables:
   ```bash
   STRIPE_SECRET_KEY="sk_test_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   ```

**Note:** Use test keys initially, switch to live keys when ready for real payments.

---

## Step 7: Add Custom Domain (Optional)

### 7.1 Purchase a Domain

Buy from:
- [Namecheap](https://namecheap.com)
- [GoDaddy](https://godaddy.com)
- [Google Domains](https://domains.google)

Recommended: `thandizo.com` or `thandizo.org`

### 7.2 Add Domain to Vercel

1. Go to Vercel project → **Settings** → **Domains**
2. Add your domain (e.g., `thandizo.com`)
3. Vercel will provide DNS records

### 7.3 Configure DNS

Add these records to your domain registrar:

**For root domain (@):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 7.4 Wait for DNS Propagation

DNS changes can take 5 minutes to 48 hours. Usually completes within 30 minutes.

### 7.5 Update Environment Variables

1. Go to Vercel → **Settings** → **Environment Variables**
2. Update `NEXT_PUBLIC_APP_URL` to your custom domain
3. Redeploy

---

## Step 8: Configure Email Notifications (Optional)

### 8.1 Use Resend (Recommended)

1. Sign up at [resend.com](https://resend.com) (free tier: 100 emails/day)
2. Verify your domain
3. Get API key from **API Keys** section
4. Add to Vercel environment variables:
   ```bash
   RESEND_API_KEY="re_..."
   ```

### 8.2 Alternative: SendGrid

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Get API key
3. Add to environment variables:
   ```bash
   SENDGRID_API_KEY="SG..."
   ```

---

## Step 9: Set Up Monitoring & Analytics

### 9.1 Vercel Analytics (Built-in)

1. Go to Vercel project → **Analytics**
2. Enable analytics (free for hobby plan)
3. View page views, performance metrics

### 9.2 Error Tracking (Recommended)

**Option A: Sentry**
1. Sign up at [sentry.io](https://sentry.io) (free tier available)
2. Create project for Next.js
3. Get DSN (Data Source Name)
4. Add to environment variables:
   ```bash
   NEXT_PUBLIC_SENTRY_DSN="https://..."
   ```

**Option B: LogRocket**
1. Sign up at [logrocket.com](https://logrocket.com)
2. Get app ID
3. Add to environment variables:
   ```bash
   NEXT_PUBLIC_LOGROCKET_ID="..."
   ```

### 9.3 Uptime Monitoring

Use [UptimeRobot](https://uptimerobot.com) (free):
1. Sign up
2. Add your domain
3. Get alerts when site is down

---

## Step 10: Production Checklist

Before announcing your platform, verify:

### ✅ Functionality
- [ ] Landing page loads correctly
- [ ] Application form works end-to-end
- [ ] All links work
- [ ] Mobile responsive
- [ ] Forms validate properly
- [ ] Error messages are user-friendly

### ✅ Security
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Environment variables not exposed in client
- [ ] Database connection secure
- [ ] File uploads validated
- [ ] Authentication working (if implemented)

### ✅ Performance
- [ ] Page load time < 3 seconds
- [ ] Images optimized
- [ ] No console errors
- [ ] Lighthouse score > 90

### ✅ Legal
- [ ] Privacy Policy page created
- [ ] Terms & Conditions page created
- [ ] Cookie consent banner (if required)
- [ ] GDPR compliance (if targeting EU)

### ✅ Monitoring
- [ ] Analytics enabled
- [ ] Error tracking configured
- [ ] Uptime monitoring active
- [ ] Backup strategy in place

---

## 🔧 Troubleshooting

### Build Fails on Vercel

**Error:** Module not found
```bash
# Solution: Clear Vercel cache
# Go to Vercel project → Settings → Git → Ignored Build Step
# Add: node_modules
```

**Error:** Environment variables not found
```bash
# Solution: Check variable names match exactly
# Redeploy after adding variables
```

### Database Connection Fails

**Error:** Connection refused
```bash
# Solution: Check DATABASE_URL format
# Should be: postgresql://user:password@host:port/database?schema=public
```

**Error:** SSL required
```bash
# Solution: Add ?sslmode=require to connection string
```

### Authentication Not Working

**Error:** Redirect URL mismatch
```bash
# Solution: Add your Vercel URL to Supabase
# Authentication → URL Configuration → Redirect URLs
```

---

## 📊 Cost Estimate (Free Tier)

### Supabase (Free)
- Database: 500 MB
- Storage: 1 GB
- Bandwidth: 2 GB/month
- Auth: 50,000 monthly active users

### Vercel (Hobby - Free)
- Bandwidth: 100 GB/month
- Serverless function executions: 100 GB-hours
- Build minutes: 6,000 minutes/month

### Total: **$0/month** for starting out

When you scale:
- Supabase Pro: $25/month
- Vercel Pro: $20/month
- **Total: ~$45/month** for serious traffic

---

## 🎉 You're Live!

Once deployed, your platform will be accessible at:
- **Vercel URL:** `https://thandizo-xxxxx.vercel.app`
- **Custom Domain:** `https://thandizo.com` (if configured)

### Share Your Platform

1. **Test thoroughly** before sharing
2. **Start with trusted users** (friends, family, partners)
3. **Gather feedback** and iterate
4. **Announce publicly** when ready

---

## 📞 Support Resources

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **THANDIZO Docs:** See README.md and PHASE1_SUMMARY.md

---

## 🚀 Next Steps After Deployment

1. **Set up email notifications** for new applications
2. **Build admin dashboard** for reviewing applications
3. **Implement verification workflow**
4. **Create campaign pages**
5. **Integrate payment gateways**
6. **Add corporate partner portal**
7. **Launch marketing campaign**

---

**Congratulations! THANDIZO is now live and ready to help patients access medical care!** 🌿

*A Little Help Can Save a Life.*
