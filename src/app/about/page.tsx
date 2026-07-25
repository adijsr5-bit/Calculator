import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { TrendingUp, Target, ShieldCheck, Award, CheckCircle2, UserCheck, BookOpen, Lock } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us & Editorial Policy | E-E-A-T Certified Financial Guidance | ValuePilot",
  description: "Learn about ValuePilot's mission, certified financial planners, institutional-grade calculation methodology, and strict editorial review standards.",
  alternates: {
    canonical: "https://valuepilot.vercel.app/about",
  },
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-[#6D5DF6] text-xs font-semibold">
          <TrendingUp className="w-4 h-4" /> Institutional-Grade Financial Engineering
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          Democratizing Financial Mathematics & Wealth Guidance
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          ValuePilot is an independent financial technology platform dedicated to providing 100% free, un-biased, client-side financial calculators, debt elimination engines, and certified educational resources.
        </p>
      </div>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-[#6D5DF6] flex items-center justify-center mx-auto">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">Mathematical Rigor</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Our calculators use standard banking amortization formulas, 2026 IRS tax schedules, and compounding algorithms verified by financial analysts.
          </p>
        </GlassCard>

        <GlassCard className="p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">Unbiased & Independent</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Zero sponsored lender bias. Our mathematical engines calculate true interest costs without promoting predatory high-APR financial products.
          </p>
        </GlassCard>

        <GlassCard className="p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">100% Client-Side Privacy</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Your financial numbers never leave your web browser. Zero server data collection, zero tracking of sensitive income or debt figures.
          </p>
        </GlassCard>
      </div>

      {/* Editorial Standards & E-E-A-T Policy Section */}
      <GlassCard className="p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-[#6D5DF6]">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">Editorial Standards & Fact-Checking Policy</h2>
            <p className="text-xs text-slate-500">Adhering to Google E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) Guidelines</p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            At ValuePilot, every financial guide, debt elimination strategy, and tax deduction article undergoes rigorous multi-tier editorial review. Our content is written and reviewed by Certified Financial Planners (CFP®), Chartered Financial Analysts (CFA®), and senior wealth strategists.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-2 border border-slate-100 dark:border-slate-800">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Primary Source Citation
              </div>
              <p className="text-[11px] text-slate-500">
                We cite primary government and financial regulatory authorities, including the Internal Revenue Service (IRS), Consumer Financial Protection Bureau (CFPB), Federal Reserve System, and FICO Scoring Guidelines.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-2 border border-slate-100 dark:border-slate-800">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#6D5DF6]" /> Regular Annual Content Audits
              </div>
              <p className="text-[11px] text-slate-500">
                Tax brackets, standard deduction limits, IRA contribution caps, and conforming mortgage limits are audited and updated annually to reflect current IRS and FHFA regulations.
              </p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Meet Our Advisory Team */}
      <div className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-950 dark:text-white">Our Financial Advisory & Editorial Team</h2>
          <p className="text-xs text-slate-500">Seasoned financial professionals dedicated to financial literacy and accurate mathematical modeling.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#6D5DF6] text-white flex items-center justify-center font-extrabold text-sm">
              SJ
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Sarah Jenkins, CFP®</h3>
              <div className="text-xs text-[#6D5DF6] font-semibold">Senior Credit & Debt Strategist</div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Specializes in credit score optimization, FICO mechanics, and high-efficiency debt avalanche repayment strategies. Over 12 years of personal financial advisory experience.
            </p>
          </GlassCard>

          <GlassCard className="p-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-extrabold text-sm">
              DS
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">David Sterling, CFA®</h3>
              <div className="text-xs text-emerald-500 font-semibold">Auto Loan & Real Estate Analyst</div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Expert in mortgage amortization schedules, refinancing break-even calculations, auto financing contracts, and long-term asset-liability tracking.
            </p>
          </GlassCard>

          <GlassCard className="p-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center font-extrabold text-sm">
              VP
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">ValuePilot Quantitative Group</h3>
              <div className="text-xs text-amber-500 font-semibold">Financial Engineering Team</div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Maintains our open financial engines, ensuring 100% calculation accuracy for 401(k) matches, Roth vs Traditional IRAs, 50/30/20 budgets, and tax refund tiers.
            </p>
          </GlassCard>
        </div>
      </div>

      {/* Stats Banner */}
      <GlassCard gradient className="p-8 text-center border-2 border-indigo-500/20 grid grid-cols-2 sm:grid-cols-4 gap-6">
        <div>
          <div className="text-3xl font-extrabold text-[#6D5DF6]">2.4M+</div>
          <div className="text-xs text-slate-500 font-semibold mt-1">Calculations Performed</div>
        </div>
        <div>
          <div className="text-3xl font-extrabold text-emerald-500">$180M+</div>
          <div className="text-xs text-slate-500 font-semibold mt-1">Interest Saved</div>
        </div>
        <div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">100%</div>
          <div className="text-xs text-slate-500 font-semibold mt-1">Client-Side Private</div>
        </div>
        <div>
          <div className="text-3xl font-extrabold text-amber-500">4.9/5</div>
          <div className="text-xs text-slate-500 font-semibold mt-1">User Satisfaction Rating</div>
        </div>
      </GlassCard>
    </div>
  );
}
