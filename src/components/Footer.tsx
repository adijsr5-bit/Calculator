"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TrendingUp, Send, CheckCircle2, ShieldAlert } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#6D5DF6]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Newsletter Box */}
        <div className="rounded-3xl p-8 bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-white">Get financial tips & debt payoff strategies weekly</h3>
            <p className="text-xs text-slate-400">No spam. Unsubscribe anytime.</p>
          </div>

          {subscribed ? (
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-950/40 px-4 py-3 rounded-2xl border border-emerald-800">
              <CheckCircle2 className="w-4 h-4" /> Thank you for subscribing!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full md:w-auto max-w-md">
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email address for financial newsletter
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                required
                aria-label="Email address for financial newsletter"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-full px-5 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#6D5DF6]"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="px-6 py-3 rounded-full bg-[#6D5DF6] hover:bg-[#583ef0] text-white text-xs font-bold transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-8 border-b border-slate-800">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" aria-label="ValuePilot Home" className="flex items-center gap-2 group">
              <img
                src="/logo.webp"
                alt="ValuePilot - Plan Better. Calculate Smarter."
                width={120}
                height={32}
                decoding="async"
                className="h-9 w-auto object-contain brightness-110 group-hover:scale-105 transition-transform"
              />
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Helping you make smarter financial decisions and build a secure future with free institutional-grade calculators.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="font-bold text-white uppercase tracking-wider" role="heading" aria-level={3}>Calculators</div>
            <ul className="space-y-2 text-slate-300">
              <li><Link href="/calculators/mortgage" className="hover:text-white">Mortgage Calculator</Link></li>
              <li><Link href="/calculators/refinance" className="hover:text-white">Refinance Calculator</Link></li>
              <li><Link href="/calculators/car-loan" className="hover:text-white">Car Loan Calculator</Link></li>
              <li><Link href="/calculators/debt-payoff" className="hover:text-white">Debt Payoff Planner</Link></li>
            </ul>
          </div>

          <div className="space-y-3 text-xs">
            <div className="font-bold text-white uppercase tracking-wider" role="heading" aria-level={3}>Resources</div>
            <ul className="space-y-2 text-slate-300">
              <li><Link href="/blog" className="hover:text-white">Blog & Articles</Link></li>
              <li><Link href="/guides/credit-score" className="hover:text-white">Credit Score Guide</Link></li>
              <li><Link href="/glossary" className="hover:text-white">Finance Glossary</Link></li>
              <li><Link href="/calculators/retirement" className="hover:text-white">Retirement Growth</Link></li>
            </ul>
          </div>

          <div className="space-y-3 text-xs">
            <div className="font-bold text-white uppercase tracking-wider" role="heading" aria-level={3}>Legal</div>
            <ul className="space-y-2 text-slate-300">
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Use</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white">Disclaimer</Link></li>
              <li><Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div>© {new Date().getFullYear()} ValuePilot. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:underline text-slate-300 hover:text-white font-medium">Privacy</Link>
            <Link href="/terms" className="hover:underline text-slate-300 hover:text-white font-medium">Terms</Link>
            <Link href="/disclaimer" className="hover:underline text-slate-300 hover:text-white font-medium">Disclaimer</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
