import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy & Data Security | ValuePilot",
  description: "Read ValuePilot's Privacy Policy. Learn how we protect your data with 100% client-side calculation privacy, GDPR compliance, and Google AdSense cookie disclosures.",
  alternates: {
    canonical: "https://valuepilot.vercel.app/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" /> Comprehensive Data Protection Notice
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white">Privacy Policy & Advertising Disclosures</h1>
        <p className="text-xs text-slate-500 font-semibold">Last Updated & Effective Date: July 25, 2026</p>
      </div>

      <GlassCard className="p-8 prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#6D5DF6]" /> 1. Client-Side Financial Calculation Privacy
          </h2>
          <p>
            At ValuePilot, we respect your absolute right to financial privacy. All inputs entered into our calculators (including mortgage amounts, interest rates, debt balances, salaries, tax figures, and net worth details) are calculated <strong>100% client-side directly within your web browser</strong>. ValuePilot does not collect, record, transmit, or store your sensitive personal financial values on external servers.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-indigo-500" /> 2. Google AdSense & Third-Party Advertising Policy
          </h2>
          <p>
            ValuePilot partners with third-party vendors, including Google AdSense, to serve ads when you visit our website. These vendors use cookies (such as the DoubleClick DART cookie) to serve ads based on a user’s prior visits to ValuePilot or other websites on the internet.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
            <li>Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to ValuePilot and/or other sites on the Internet.</li>
            <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#6D5DF6] underline font-semibold">Google Ads Settings</a>.</li>
            <li>Alternatively, users can opt out of third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-[#6D5DF6] underline font-semibold">www.aboutads.info</a>.</li>
          </ul>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-500" /> 3. Cookies, Web Beacons & Local Storage
          </h2>
          <p>
            We use LocalStorage and standard session cookies solely to preserve your non-sensitive UI settings across page reloads (such as selected currency preference, light/dark mode preference, and cookie consent consent flags). No personal identifying information (PII) is stored.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">4. GDPR Rights (European Economic Area Users)</h2>
          <p>
            If you reside within the European Economic Area (EEA), you possess full rights under the General Data Protection Regulation (GDPR) to access, update, restrict processing, or request deletion of any personal data. Because ValuePilot does not log personal financial data on remote servers, your session data remains strictly under your device control.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">5. CCPA Notice (California Consumer Privacy Act)</h2>
          <p>
            California residents have the right to request information regarding data collection practices. ValuePilot does not sell personal information to third parties or data brokers.
          </p>
        </section>
      </GlassCard>
    </div>
  );
}
