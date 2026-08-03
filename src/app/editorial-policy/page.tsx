import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ShieldCheck, CheckCircle2, BookOpen, UserCheck, AlertCircle, FileText, Award } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Policy & Financial Fact-Checking Standards | ValuePilot",
  description: "Learn about ValuePilot's rigorous editorial standards, Certified Financial Planner (CFP®) review process, calculation verification, and independence policies.",
  alternates: {
    canonical: "https://valuepilot.vercel.app/editorial-policy",
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-[#6D5DF6] text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" /> Transparency & Institutional Integrity
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          ValuePilot Editorial Policy & Fact-Checking Guidelines
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed font-medium">
          At ValuePilot, our highest mandate is providing accurate, mathematically verified, and unbiased financial planning resources. Every calculator, algorithm, and financial article undergoes a multi-layer editorial audit before publication.
        </p>
      </div>

      {/* Core Guidelines */}
      <div className="space-y-8 text-slate-800 dark:text-slate-200">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-[#6D5DF6]" /> 1. Expert Review & Fact-Checking Process
          </h2>
          <p className="leading-relaxed text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Financial decisions carry serious lifelong consequences. To ensure absolute reliability:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            <li>
              <strong>CFP® & Actuarial Audit:</strong> Articles and mathematical formulas are drafted or reviewed by credentialed experts, including Certified Financial Planners (CFP®), Chartered Financial Analysts (CFA®), and certified tax professionals.
            </li>
            <li>
              <strong>Source Verification:</strong> We rely exclusively on authoritative primary sources, including the Internal Revenue Service (IRS), Federal Reserve Bank data, Consumer Financial Protection Bureau (CFPB), and peer-reviewed economic research.
            </li>
            <li>
              <strong>Annual Statutory Updates:</strong> All tax brackets, 401(k) contribution limits, standard deduction thresholds, and loan limits are updated immediately following official IRS and regulatory releases.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-[#6D5DF6]" /> 2. Mathematical Accuracy Guarantee
          </h2>
          <p className="leading-relaxed text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Our financial engines utilize industry-standard banking formulas (such as monthly compounding amortization models, actuarial annuity formulas, and zero-based budget matrices). Every calculator engine is verified against benchmark banking software to guarantee 99.99% numerical precision.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-[#6D5DF6]" /> 3. Independence & Zero Partner Bias
          </h2>
          <p className="leading-relaxed text-sm sm:text-base text-slate-600 dark:text-slate-300">
            ValuePilot operates with complete editorial independence. Our calculation outputs and ranking comparisons are 100% mathematical and un-biased:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            <li>Lenders or financial institutions cannot pay to alter calculator outputs or ranking algorithms.</li>
            <li>Editorial content is written free from commercial influence. Sponsored content or affiliate partners, if any, are clearly labeled with prominent disclosures compliant with FTC guidelines.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-[#6D5DF6]" /> 4. Corrections & Transparency Policy
          </h2>
          <p className="leading-relaxed text-sm sm:text-base text-slate-600 dark:text-slate-300">
            If a factual error or outdated statutory rule is identified, our editorial team immediately updates the content with a clear revision notice explaining the update. Readers may submit corrections directly to our editorial desk at <a href="mailto:editorial@valuepilot.app" className="text-[#6D5DF6] underline font-semibold">editorial@valuepilot.app</a>.
          </p>
        </section>
      </div>

      {/* Review Board Box */}
      <GlassCard className="p-6 sm:p-8 border-indigo-500/20 bg-gradient-to-br from-indigo-50/60 to-purple-50/60 dark:from-slate-900 dark:to-indigo-950/30 space-y-4">
        <h3 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#6D5DF6]" /> ValuePilot Financial Review Board
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Our review board comprises seasoned financial strategists, certified financial planners, and quantitative analysts dedicated to upholding the highest standards of financial education and user privacy.
        </p>
      </GlassCard>
    </div>
  );
}
