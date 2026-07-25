"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Calculator,
  ShieldCheck,
  Zap,
  ArrowRight,
  Home as HomeIcon,
  Car,
  CreditCard,
  Wallet,
  Receipt,
  PiggyBank,
  Gift,
  CheckCircle2,
  Sparkles,
  Percent,
  X as XIcon,
  BookOpen,
  DollarSign,
  Award,
  Layers,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { FloatingMockup } from "@/components/ui/FloatingMockup";
import { useCurrency } from "@/context/CurrencyContext";

export default function HomePage() {
  const { currency } = useCurrency();
  const [quizGoal, setQuizGoal] = useState<string>("mortgage");

  const categories = [
    { title: "Mortgage Calculators", icon: HomeIcon, href: "/calculators/mortgage", count: "2 Tools", color: "bg-[#6D5DF6]/10 text-[#6D5DF6]" },
    { title: "Debt Payoff Tools", icon: CreditCard, href: "/calculators/debt-payoff", count: "1 Tool", color: "bg-emerald-500/10 text-emerald-600" },
    { title: "Retirement Planning", icon: PiggyBank, href: "/calculators/retirement", count: "3 Tools", color: "bg-amber-500/10 text-amber-600" },
    { title: "Car Loan Calculators", icon: Car, href: "/calculators/car-loan", count: "1 Tool", color: "bg-purple-500/10 text-purple-600" },
    { title: "Budget Planning", icon: Wallet, href: "/calculators/budget", count: "1 Tool", color: "bg-blue-500/10 text-blue-600" },
    { title: "Tax Estimators", icon: Receipt, href: "/calculators/tax-refund", count: "1 Tool", color: "bg-rose-500/10 text-rose-600" },
  ];

  const marketRates = [
    { name: "30-Yr Fixed Mortgage", rate: "6.45%", trend: "↓ -0.15%", status: "Optimal" },
    { name: "60-Mo Auto Loan", rate: "6.85%", trend: "→ Stable", status: "Standard" },
    { name: "High-Yield Savings", rate: "4.85% APY", trend: "↑ +0.10%", status: "High Yield" },
    { name: "S&P 500 Avg Return", rate: "9.80%", trend: "↑ Historical", status: "Growth" },
  ];

  const testimonials = [
    {
      name: "Marcus Vance",
      role: "Homeowner in Austin, TX",
      quote: "ValuePilot helped me calculate my exact refinancing break-even point in under 2 minutes. Saved us $340/month!",
      rating: 5,
    },
    {
      name: "Elena Rostova",
      role: "Debt Free Graduate",
      quote: "The Avalanche Debt Planner on ValuePilot showed me how adding just $150 extra a month would shave 2 years off my loans. Life changing!",
      rating: 5,
    },
    {
      name: "David Chen",
      role: "Software Engineer",
      quote: "No ads, no login required, and super accurate 2026 tax bracket math. Best finance tool on the web.",
      rating: 5,
    },
  ];

  // Homepage High SEO Linking Flow Array
  const linkingCascade = [
    { title: "Mortgage Calculator", href: "/calculators/mortgage", desc: "Calculate monthly PITI payments & loan term amortization." },
    { title: "Refinance Calculator", href: "/calculators/refinance", desc: "Find your exact rate break-even month & interest savings." },
    { title: "Budget Planner", href: "/calculators/budget", desc: "Organize income with 50/30/20 budget worksheets." },
    { title: "Debt Payoff Calculator", href: "/calculators/debt-payoff", desc: "Compare Snowball vs Avalanche payoff strategies." },
    { title: "Net Worth Calculator", href: "/calculators/net-worth", desc: "Track personal net worth, assets, and liability balances." },
    { title: "Retirement Calculator", href: "/calculators/retirement", desc: "Project 401(k) compound APY growth with inflation." },
  ];

  return (
    <div className="space-y-24 pt-20 pb-20 overflow-x-hidden">
      {/* SECTION 1: HERO SECTION */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Text */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-950/60 border border-purple-200/60 dark:border-purple-800/60 text-[#6D5DF6] text-xs font-bold animate-in fade-in duration-300">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>ValuePilot Financial Tools & Money Planning</span>
            </div>

            {/* HOMEPAGE H1 */}
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-2 duration-500">
              Free Financial Calculators <br />
              <span className="text-[#6D5DF6]">& Personal Finance Tools</span>
            </h1>

            <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium animate-in fade-in slide-in-from-bottom-3 duration-500">
              Use ValuePilot&apos;s free money tools to plan your mortgage, monthly budget, debt payoff, retirement, tax refund, car loan, and net worth with 100% private client-side calculations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Link
                href="/calculators/mortgage"
                className="px-7 py-4 rounded-full bg-[#6D5DF6] hover:bg-[#583ef0] text-white font-bold text-base shadow-purple transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group"
              >
                Launch Mortgage Tool
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </span>
              </Link>
              <Link
                href="/calculators/debt-payoff"
                className="px-7 py-4 rounded-full bg-white dark:bg-slate-900 hover:bg-slate-50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-base transition-all hover:scale-105 shadow-sm"
              >
                Debt Payoff Planner
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-4 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#6D5DF6] text-white font-bold flex items-center justify-center border-2 border-white text-xs">JS</div>
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center border-2 border-white text-xs">AK</div>
                <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center border-2 border-white text-xs">MP</div>
              </div>
              <div>
                <div className="text-amber-600 font-bold">★★★★★ 4.9/5</div>
                <span>Trusted by 250K+ smart investors on ValuePilot</span>
              </div>
            </div>
          </div>

          {/* Right Balanced Modern SaaS Widget */}
          <div className="lg:col-span-6">
            <FloatingMockup />
          </div>
        </div>
      </section>

      {/* SECTION 2: LIVE MARKET INTEREST RATE TICKER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-[#6D5DF6]" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Live 2026 Market Interest Benchmarks
              </span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
              Updated Today
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
            {marketRates.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#F8F7FF] dark:bg-slate-800/80 border border-purple-100/60 dark:border-slate-700">
                <div className="text-[11px] text-slate-700 dark:text-slate-300 font-bold">{item.name}</div>
                <div className="text-xl font-extrabold text-slate-950 dark:text-white mt-1">{item.rate}</div>
                <div className="text-[10px] font-bold text-emerald-700 mt-1">{item.trend}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: CALCULATOR CATEGORIES GRID (HOMEPAGE H2s) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Comprehensive Suite of Financial Tools
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-sm">
            Everything you need for mortgage planning, budget worksheets, debt payoff strategies, and retirement growth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <Link key={i} href={cat.href}>
              <GlassCard purpleTint className="p-6 space-y-4 hover:border-[#6D5DF6] transition-all group">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl ${cat.color} flex items-center justify-center font-bold`}>
                    <cat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{cat.count}</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-[#6D5DF6] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 flex items-center gap-1 font-semibold">
                    Explore tools <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </p>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      {/* HOMEPAGE INTERNAL LINKING CASCADE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-purple-100 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-[#6D5DF6] uppercase tracking-wider">INSTANT LINKING CASCADE</span>
              <h2 className="text-2xl font-extrabold text-slate-950 dark:text-white mt-1">
                Connected Personal Finance Suite
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-400">Mortgage → Refinance → Budget → Debt → Net Worth → Retirement</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {linkingCascade.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-[#6D5DF6] transition-all group flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-[#6D5DF6]/10 text-[#6D5DF6] font-extrabold flex items-center justify-center shrink-0 text-xs">
                  0{index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#6D5DF6] transition-colors flex items-center gap-1">
                    {item.title}
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#6D5DF6]" />
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: INTERACTIVE FINANCIAL HEALTH QUIZ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlassCard purpleTint className="p-8 sm:p-10 space-y-6">
          <div className="max-w-xl space-y-2">
            <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-[#6D5DF6] text-xs font-bold">
              Interactive Quiz
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
              Which Calculator Do You Need Right Now?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">Select your top goal to get an instant tailored recommendation.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => setQuizGoal("mortgage")}
              aria-label="Select goal: Buy or Refinance Home"
              className={`p-5 rounded-2xl border text-left transition-all ${
                quizGoal === "mortgage"
                  ? "bg-[#6D5DF6] text-white border-[#6D5DF6] shadow-purple"
                  : "bg-white dark:bg-slate-900 border-slate-200 text-slate-900 dark:text-white"
              }`}
            >
              <HomeIcon className="w-6 h-6 mb-2" />
              <div className="font-bold text-sm">Buy / Refinance Home</div>
              <div className="text-[11px] opacity-80 mt-1">Mortgage PITI & Rate Break-even</div>
            </button>

            <button
              onClick={() => setQuizGoal("debt")}
              aria-label="Select goal: Pay Off Credit Cards and Loans"
              className={`p-5 rounded-2xl border text-left transition-all ${
                quizGoal === "debt"
                  ? "bg-[#6D5DF6] text-white border-[#6D5DF6] shadow-purple"
                  : "bg-white dark:bg-slate-900 border-slate-200 text-slate-900 dark:text-white"
              }`}
            >
              <CreditCard className="w-6 h-6 mb-2" />
              <div className="font-bold text-sm">Pay Off Credit Cards & Loans</div>
              <div className="text-[11px] opacity-80 mt-1">Snowball vs Avalanche Strategy</div>
            </button>

            <button
              onClick={() => setQuizGoal("wealth")}
              aria-label="Select goal: Build Retirement and Wealth"
              className={`p-5 rounded-2xl border text-left transition-all ${
                quizGoal === "wealth"
                  ? "bg-[#6D5DF6] text-white border-[#6D5DF6] shadow-purple"
                  : "bg-white dark:bg-slate-900 border-slate-200 text-slate-900 dark:text-white"
              }`}
            >
              <PiggyBank className="w-6 h-6 mb-2" />
              <div className="font-bold text-sm">Build Retirement & Wealth</div>
              <div className="text-[11px] opacity-80 mt-1">401(k) Match & Compound APY</div>
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400 font-bold uppercase">Recommended Tool</div>
              <div className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">
                {quizGoal === "mortgage" && "Mortgage & Refinance Calculator"}
                {quizGoal === "debt" && "Debt Payoff Planner (Avalanche vs Snowball)"}
                {quizGoal === "wealth" && "Retirement Growth & 401(k) Match Calculator"}
              </div>
            </div>
            <Link
              href={
                quizGoal === "mortgage"
                  ? "/calculators/mortgage"
                  : quizGoal === "debt"
                  ? "/calculators/debt-payoff"
                  : "/calculators/retirement"
              }
              className="px-6 py-3 rounded-full bg-[#6D5DF6] text-white font-bold text-xs shadow-purple hover:bg-[#583ef0] transition-all whitespace-nowrap"
            >
              Launch Recommended Tool →
            </Link>
          </div>
        </GlassCard>
      </section>

      {/* SECTION 5: WHY VALUEPILOT VS OTHER BANK CALCULATORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-purple-100/90 dark:border-slate-800 shadow-xl shadow-purple-500/5 space-y-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-100/80 dark:bg-purple-950/80 text-[#6D5DF6] text-xs font-bold border border-purple-200/50">
              <Sparkles className="w-3.5 h-3.5" /> TRANSPARENT & UNBIASED
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Why Smart Investors Choose ValuePilot
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Transparent client-side privacy vs traditional lead-generation bank calculators.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <th className="py-4 px-4 font-extrabold uppercase tracking-wider text-slate-400 w-1/3">
                    Feature / Guarantee
                  </th>
                  <th className="py-4 px-4 w-1/3 text-center">
                    <div className="py-2.5 px-4 rounded-2xl bg-gradient-to-r from-[#6D5DF6] to-[#8B7CFF] text-white font-extrabold shadow-purple flex items-center justify-center gap-1.5 text-xs sm:text-sm">
                      <ShieldCheck className="w-4 h-4" /> ValuePilot
                    </div>
                  </th>
                  <th className="py-4 px-4 w-1/3 text-center font-bold text-slate-400 uppercase text-[11px]">
                    Traditional Bank Calculators
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                <tr className="hover:bg-purple-50/40 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-white text-sm">
                    100% Free & No Login Needed
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 font-bold border border-emerald-200/60 dark:border-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Yes, Instant Access
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-500 font-semibold border border-rose-200/60 dark:border-rose-800">
                      <XIcon className="w-4 h-4 text-rose-400" /> Forces email & phone signup
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-purple-50/40 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-white text-sm">
                    Client-Side Private Calculation
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 font-bold border border-emerald-200/60 dark:border-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Private (No Tracking)
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-500 font-semibold border border-rose-200/60 dark:border-rose-800">
                      <XIcon className="w-4 h-4 text-rose-400" /> Sells data to mortgage brokers
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-purple-50/40 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-white text-sm">
                    Export PDF & Amortization Print
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 font-bold border border-emerald-200/60 dark:border-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Professional PDF Reports
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-500 font-semibold border border-rose-200/60 dark:border-rose-800">
                      <XIcon className="w-4 h-4 text-rose-400" /> No PDF export option
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-purple-50/40 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-white text-sm">
                    Dual Strategy Toggle (Snowball vs Avalanche)
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 font-bold border border-emerald-200/60 dark:border-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Live Interactive Switcher
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-500 font-semibold border border-rose-200/60 dark:border-rose-800">
                      <XIcon className="w-4 h-4 text-rose-400" /> Static single scenario only
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-purple-50/40 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-white text-sm">
                    Unbiased & Ad-Free Interface
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 font-bold border border-emerald-200/60 dark:border-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 0% Ads & 0% Bank Affiliates
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-500 font-semibold border border-rose-200/60 dark:border-rose-800">
                      <XIcon className="w-4 h-4 text-rose-400" /> Flooded with credit card ads
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/80 dark:bg-slate-800/80 border border-purple-100 dark:border-slate-700 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#6D5DF6]" />
              <span><strong>ValuePilot Privacy Guarantee:</strong> Your numbers are processed 100% locally in your browser memory.</span>
            </div>
            <Link href="/calculators/mortgage" className="text-[#6D5DF6] font-bold hover:underline hidden sm:inline">
              Try Mortgage Calculator →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: USER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
            Loved By Thousands of Users
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">Real feedback from debt-free planners and homeowners on ValuePilot.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <GlassCard key={idx} className="p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-amber-500 font-bold text-sm">★★★★★</div>
                <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
                <div className="font-bold text-sm text-slate-900 dark:text-white">{t.name}</div>
                <div className="text-[11px] text-slate-400">{t.role}</div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* SECTION 7: STATS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-10 purple-gradient-card shadow-2xl text-center grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="space-y-1">
            <div className="text-4xl font-extrabold text-white">$180M+</div>
            <div className="text-xs font-bold text-purple-200 uppercase tracking-wider">Interest Saved</div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-extrabold text-white">2.4 Million</div>
            <div className="text-xs font-bold text-purple-200 uppercase tracking-wider">Calculations Generated</div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-extrabold text-emerald-300">100%</div>
            <div className="text-xs font-bold text-purple-200 uppercase tracking-wider">Free ValuePilot Math</div>
          </div>
        </div>
      </section>
    </div>
  );
}
