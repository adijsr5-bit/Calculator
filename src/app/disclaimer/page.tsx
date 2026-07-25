import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ShieldAlert, AlertCircle, FileCheck2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Disclaimer & Educational Notice | ValuePilot",
  description: "Read ValuePilot's Financial Disclaimer. Our tools provide educational mathematical estimations and do not constitute formal fiduciary financial, tax, or legal advice.",
  alternates: {
    canonical: "https://valuepilot.vercel.app/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div className="space-y-3 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 text-xs font-bold mx-auto">
          <ShieldAlert className="w-4 h-4" /> YMYL Educational Financial Notice
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white">Financial & Mathematical Disclaimer</h1>
        <p className="text-xs text-slate-500 font-semibold">Effective Date: July 25, 2026</p>
      </div>

      <GlassCard className="p-8 prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" /> Educational Purposes Only
          </h2>
          <p>
            ValuePilot is an independent financial engineering and decision-support software platform. All calculations, estimates, interest rates, amortization schedules, tax refund approximations, and retirement growth models published across ValuePilot are generated strictly for <strong>educational and informational planning purposes</strong>.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-[#6D5DF6]" /> Not Fiduciary Financial or Tax Advice
          </h2>
          <p>
            ValuePilot is not a registered investment advisor (RIA), licensed mortgage lender, certified public accountant (CPA), or legal firm. The outputs of our calculators do not constitute formal financial, credit counseling, tax filing, or legal advice.
          </p>
          <p>
            Actual loan terms, mortgage rates, property tax assessments, and tax liability are subject to individual creditworthiness, underwriting approval, local government taxing jurisdictions, and federal tax laws. Always consult a qualified Certified Financial Planner (CFP®), licensed mortgage broker, or CPA prior to executing major financial transactions.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Accuracy & Mathematical Models</h2>
          <p>
            While our mathematical algorithms undergo continuous testing against banking standard compound formulas and updated IRS tax schedules, ValuePilot makes no explicit warranty or representation regarding the absolute precision of third-party external bank offers, changing interest rate environments, or local tax assessments.
          </p>
        </section>
      </GlassCard>
    </div>
  );
}
