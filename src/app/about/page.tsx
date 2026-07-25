"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { TrendingUp, Target, ShieldCheck, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-[#6D5DF6] text-xs font-semibold">
          <TrendingUp className="w-4 h-4" /> About ValuePilot
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          Democratizing Institutional Financial Mathematics
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          ValuePilot was founded with a singular mission: to empower everyday households with modern, ultra-precise, glassmorphic financial planning tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-[#6D5DF6] flex items-center justify-center mx-auto">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">Our Mission</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Eliminate financial ambiguity by providing transparent mathematical engines for mortgages, debt, tax, and retirement.
          </p>
        </GlassCard>

        <GlassCard className="p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">Unbiased Neutrality</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            100% free, client-side calculations with zero hidden lender kickbacks or paywalled features.
          </p>
        </GlassCard>

        <GlassCard className="p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">Institutional Grade</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Formulas reviewed by Certified Financial Planners (CFP®) adhering to standard banking algorithms.
          </p>
        </GlassCard>
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
          <div className="text-xs text-slate-500 font-semibold mt-1">Free Access</div>
        </div>
        <div>
          <div className="text-3xl font-extrabold text-amber-500">4.9/5</div>
          <div className="text-xs text-slate-500 font-semibold mt-1">User Rating</div>
        </div>
      </GlassCard>
    </div>
  );
}
