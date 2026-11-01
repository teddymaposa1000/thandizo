import Link from "next/link";
import { Heart, Menu, X, Shield, ChevronDown } from "lucide-react";
import { BRAND } from "@/lib/brand";

// Header must be a client component because it uses useState
export { Header } from "./Header";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 group ${className}`}>
      <div className="relative">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-th to-forest flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
          <Heart className="w-5 h-5 text-white" strokeWidth={2.5} fill="currentColor" />
        </div>
        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gold rounded-full border-2 border-cream" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-xl font-semibold text-forest tracking-tight">
          {BRAND.name}
        </span>
        <span className="text-[10px] text-ink-light uppercase tracking-widest font-medium mt-0.5">
          Verified Care
        </span>
      </div>
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="bg-forest text-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <div>
                <div className="font-display text-xl font-semibold">{BRAND.name}</div>
                <div className="text-xs text-white/60 uppercase tracking-widest">
                  Verified Care
                </div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              {BRAND.tagline} A humanitarian technology platform connecting people
              in need with those who can help.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/50">
              <Shield className="w-3.5 h-3.5" />
              <span>Shared Hope. Verified Impact.</span>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold mb-4 uppercase tracking-wider">
              For Patients
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link href="/start" className="hover:text-white transition-colors">Start a Fundraiser</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How Verification Works</Link></li>
              <li><Link href="/patients" className="hover:text-white transition-colors">Browse Campaigns</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold mb-4 uppercase tracking-wider">
              For Partners
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link href="/partners" className="hover:text-white transition-colors">Corporate Partnerships</Link></li>
              <li><Link href="/hospitals" className="hover:text-white transition-colors">Hospital Portal</Link></li>
              <li><Link href="/grants" className="hover:text-white transition-colors">Grants & Foundations</Link></li>
              <li><Link href="/impact" className="hover:text-white transition-colors">Impact Reports</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold mb-4 uppercase tracking-wider">
              Thandizo
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/verification-policy" className="hover:text-white transition-colors">Verification Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 mt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            © 2026 Thandizo. Registered social enterprise. All
            rights reserved.
          </p>
          <p className="text-xs text-white/50 italic">
            "{BRAND.tagline}"
          </p>
        </div>
      </div>
    </footer>
  );
}
