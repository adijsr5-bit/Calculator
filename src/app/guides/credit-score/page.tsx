"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ShieldCheck, Award, TrendingUp, AlertCircle, CheckCircle2, BookOpen, ArrowRight, HelpCircle } from "lucide-react";
import Link from "next/link";
import { generateFAQSchema, generateArticleSchema } from "@/lib/utils";

export default function CreditScoreGuidePage() {
  const faqs = [
    {
      question: "What is a FICO score vs VantageScore?",
      answer: "FICO (Fair Isaac Corporation) and VantageScore are the two dominant credit scoring models. FICO is used by over 90% of top mortgage lenders, ranging from 300 to 850.",
    },
    {
      question: "How long does negative info stay on my credit report?",
      answer: "Late payments, foreclosures, and collections remain on your credit report for 7 years. Chapter 7 bankruptcies stay for 10 years.",
    },
    {
      question: "Does checking my own credit score lower it?",
      answer: "No! Checking your own credit report is a 'soft inquiry' and has 0 impact on your score. Only formal lender loan applications cause 'hard inquiries' (-5 points temporarily).",
    },
  ];

  const faqSchema = generateFAQSchema(faqs);
  const articleSchema = generateArticleSchema(
    "Ultimate Guide to Credit Score & How to Reach 800+",
    "Learn what credit scores are, FICO score ranges (300-850), credit score factors, and 7 actionable steps to improve your credit score fast.",
    "https://truepathfinance.com/guides/credit-score",
    "2026-07-24"
  );

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, articleSchema]) }}
      />

      {/* Hero Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" /> Educational Credit Guide
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          Master Your Credit Score (300 to 850)
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          Everything you need to know about credit rating factors, ranges, and strategic steps to elevate your score to 800+.
        </p>
      </div>

      {/* Credit Score Ranges Component */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Credit Score Ranges Explained</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <GlassCard className="p-5 border-l-4 border-l-emerald-500 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">800 – 850</div>
            <div className="text-lg font-extrabold text-slate-900 dark:text-white">Exceptional / Excellent</div>
            <p className="text-xs text-slate-500">Qualifies for lowest mortgage APRs & premium rewards cards.</p>
          </GlassCard>

          <GlassCard className="p-5 border-l-4 border-l-blue-500 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600">740 – 799</div>
            <div className="text-lg font-extrabold text-slate-900 dark:text-white">Very Good</div>
            <p className="text-xs text-slate-500">Above national average; high approval odds for prime loans.</p>
          </GlassCard>

          <GlassCard className="p-5 border-l-4 border-l-amber-500 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600">670 – 739</div>
            <div className="text-lg font-extrabold text-slate-900 dark:text-white">Good / Fair</div>
            <p className="text-xs text-slate-500">Acceptable to most lenders, though interest rates will be higher.</p>
          </GlassCard>

          <GlassCard className="p-5 border-l-4 border-l-red-500 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-red-600">300 – 669</div>
            <div className="text-lg font-extrabold text-slate-900 dark:text-white">Poor / Below Avg</div>
            <p className="text-xs text-slate-500">Requires dedicated credit repair and secured credit cards.</p>
          </GlassCard>
        </div>
      </section>

      {/* 5 Factors of FICO Score */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">The 5 Factors That Determine Your Score</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6 space-y-3">
            <div className="text-3xl font-extrabold text-[#6D5DF6]">35%</div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Payment History</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              The single biggest factor. Pay every credit bill on time without fail.
            </p>
          </GlassCard>

          <GlassCard className="p-6 space-y-3">
            <div className="text-3xl font-extrabold text-[#6D5DF6]">30%</div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Credit Utilization Ratio</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Keep credit card balances below 10% to 30% of total credit limits.
            </p>
          </GlassCard>

          <GlassCard className="p-6 space-y-3">
            <div className="text-3xl font-extrabold text-[#6D5DF6]">15%</div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Length of Credit History</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Older accounts increase your average credit age. Keep oldest accounts open.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Action Steps */}
      <section className="p-8 rounded-3xl bg-slate-900 text-white space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-[#6D5DF6]" /> 5 Action Steps to Boost Credit Fast
        </h2>
        <div className="space-y-4 text-sm text-slate-300">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-[#6D5DF6] text-white flex items-center justify-center font-bold text-xs shrink-0">1</div>
            <div><strong>Set Up Auto-Pay:</strong> Never miss a payment date. Payment history accounts for 35% of your total score.</div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-[#6D5DF6] text-white flex items-center justify-center font-bold text-xs shrink-0">2</div>
            <div><strong>Pay Down Balances Mid-Cycle:</strong> Pay credit cards before the statement closing date to report lower credit utilization.</div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-[#6D5DF6] text-white flex items-center justify-center font-bold text-xs shrink-0">3</div>
            <div><strong>Request Credit Limit Increases:</strong> Raising your credit line lowers overall utilization instantly.</div>
          </div>
        </div>
      </section>

      {/* Internal Links & FAQs */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Related Financial Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/calculators/debt-payoff" className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#6D5DF6] transition-all">
            <div className="font-bold text-slate-900 dark:text-white text-sm">Debt Payoff Planner</div>
            <div className="text-xs text-slate-500 mt-1">Lower credit utilization fast</div>
          </Link>
          <Link href="/calculators/mortgage" className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#6D5DF6] transition-all">
            <div className="font-bold text-slate-900 dark:text-white text-sm">Mortgage Calculator</div>
            <div className="text-xs text-slate-500 mt-1">Check home loan eligibility</div>
          </Link>
          <Link href="/calculators/car-loan" className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#6D5DF6] transition-all">
            <div className="font-bold text-slate-900 dark:text-white text-sm">Car Loan Calculator</div>
            <div className="text-xs text-slate-500 mt-1">See auto loan APR rates</div>
          </Link>
        </div>
      </section>
    </div>
  );
}
