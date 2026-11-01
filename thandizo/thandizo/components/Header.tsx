"use client";

import Link from "next/link";
import { Heart, Menu, X } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { useState } from "react";
import { Logo } from "./layout";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: "/patients", label: "Find Patients" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/about", label: "About Us" },
    { href: "/partners", label: "Corporate Partners" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-cream/80 backdrop-blur-lg border-b border-sage">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-ink-light hover:text-forest rounded-lg hover:bg-mint transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-forest hover:text-forest-dark transition-colors"
            >
              Sign In
            </Link>
            <Link href="/start" className="btn-secondary !py-2.5 !px-5 text-sm">
              Start a Fundraiser
            </Link>
            <Link href="/donate" className="btn-primary !py-2.5 !px-5 text-sm">
              <Heart className="w-4 h-4" />
              Donate Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-mint transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden py-4 border-t border-sage">
            <nav className="flex flex-col gap-1 mb-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-base font-medium text-ink hover:bg-mint rounded-lg"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2 pt-4 border-t border-sage">
              <Link href="/login" className="btn-secondary w-full">
                Sign In
              </Link>
              <Link href="/start" className="btn-secondary w-full">
                Start a Fundraiser
              </Link>
              <Link href="/donate" className="btn-primary w-full">
                <Heart className="w-4 h-4" />
                Donate Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
