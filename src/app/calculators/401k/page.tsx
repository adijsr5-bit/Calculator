"use client";

import React, { useState, useMemo } from "react";
import { CalculatorWrapper } from "@/components/calculators/CalculatorWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { calculate401k, Four01kInput } from "@/lib/calculators";
import { useCurrency } from "@/context/CurrencyContext";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, Gift, ShieldCheck } from "lucide-react";

export default function Four01kCalculatorPage() {
  const { currency } = useCurrency();

  const [input, setInput] = useState<Four01kInput>({
    currentAge: 28,
    retirementAge: 65,
    currentSalary: 85000,
    annualSalaryIncrease: 3.0,
    employeeContributionPercent: 8,
    employerMatchPercent: 50, // 50% match
    employerMatchLimitPercent: 6, // up to 6% of salary
    currentBalance: 15000,
    expectedAnnualReturn: 7.5,
  });

  const result = useMemo(() => calculate401k(input), [input]);

  return (
    <CalculatorWrapper
      id="401k"
      title="401(k) Match Calculator"
      subtitle="Calculate how employer match contributions, annual salary growth, and pre-tax 401(k) compounding boost your retirement wealth."
      summaryText={`Final 401(k) Balance: ${formatCurrency(result.finalBalance, currency)} with ${formatCurrency(result.totalEmployerMatch, currency)} in free employer match!`}
      formulaTitle="401(k) Employer Match Formula"
      formulaContent={
        <div>
          <p className="font-mono bg-slate-950 text-indigo-300 p-3 rounded-xl mb-2 text-center text-xs sm:text-sm">
            Employer Match = Annual Salary × Min(Employee %, Match Cap %) × Match %
          </p>
          <p className="text-xs text-slate-300">
            For example, 50% match on contributions up to 6% of an $85,000 salary yields $2,550 in free annual employer match!
          </p>
        </div>
      }
      howItWorksContent={
        <div className="space-y-4">
          <p>
            A 401(k) is an employer-sponsored tax-advantaged retirement account. Contributions are deducted straight from your paycheck before federal income taxes are calculated, lowering your current year taxable income.
          </p>
          <p>
            An <strong>Employer Match</strong> is essentially a 100% immediate guaranteed return on your money. Financial advisors universally recommend contributing at least enough to capture your full employer match limit.
          </p>
        </div>
      }
      exampleContent={
        <div>
          <p className="font-semibold text-slate-900 dark:text-white mb-2">Example: $85,000 Salary with 50% Match up to 6%</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Employee Contributions</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">{formatCurrency(result.totalEmployeeContributions, currency)}</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Free Employer Match</div>
              <div className="text-sm font-bold text-emerald-600">+{formatCurrency(result.totalEmployerMatch, currency)}</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Final 401(k) Nest Egg</div>
              <div className="text-sm font-bold text-[#6D5DF6]">{formatCurrency(result.finalBalance, currency)}</div>
            </div>
          </div>
        </div>
      }
      prosAndCons={{
        pros: [
          "Pre-tax salary contributions reduce federal income tax bill immediately.",
          "Employer match provides instant free money for your retirement balance.",
        ],
        cons: [
          "Early withdrawals prior to age 59½ incur a 10% IRS penalty plus ordinary income tax.",
        ],
      }}
      faqs={[
        {
          question: "What is the 2024 401(k) contribution limit?",
          answer: "For 2024, the employee contribution limit is $23,000 per year (plus an additional $7,500 catch-up contribution for individuals aged 50 and older).",
        },
      ]}
      relatedTools={[
        { name: "Traditional vs Roth IRA", href: "/calculators/ira", desc: "Compare individual IRA options alongside 401(k)" },
        { name: "Retirement Growth", href: "/calculators/retirement", desc: "Project overall compound retirement growth" },
        { name: "Tax Refund Estimator", href: "/calculators/tax-refund", desc: "Estimate tax savings from 401(k) contributions" },
      ]}
      calculatorNode={
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <GlassCard className="lg:col-span-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <Gift className="w-5 h-5 text-[#6D5DF6]" /> 401(k) Inputs
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] text-slate-500 font-semibold">Annual Salary ($)</label>
                <input
                  type="number"
                  value={input.currentSalary}
                  onChange={(e) => setInput({ ...input, currentSalary: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border text-xs font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-slate-500 font-semibold">Employee Contribution (%)</label>
                <input
                  type="number"
                  value={input.employeeContributionPercent}
                  onChange={(e) => setInput({ ...input, employeeContributionPercent: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border text-xs font-bold text-[#6D5DF6]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] text-slate-500 font-semibold">Employer Match % (e.g. 50%)</label>
                <input
                  type="number"
                  value={input.employerMatchPercent}
                  onChange={(e) => setInput({ ...input, employerMatchPercent: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border text-xs font-bold text-emerald-600"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-slate-500 font-semibold">Match Cap Limit % (e.g. 6%)</label>
                <input
                  type="number"
                  value={input.employerMatchLimitPercent}
                  onChange={(e) => setInput({ ...input, employerMatchLimitPercent: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border text-xs font-bold"
                />
              </div>
            </div>
          </GlassCard>

          <div className="lg:col-span-6 space-y-6">
            <GlassCard gradient className="p-8 text-center border-2 border-indigo-500/20">
              <div className="text-xs font-bold uppercase tracking-widest text-[#6D5DF6]">Projected 401(k) Balance</div>
              <div className="text-4xl sm:text-5xl font-extrabold text-slate-950 dark:text-white mt-2">
                <AnimatedNumber value={result.finalBalance} formatFn={(val) => formatCurrency(val, currency)} />
              </div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-2">
                Includes {formatCurrency(result.totalEmployerMatch, currency)} in Free Employer Match Money!
              </p>
            </GlassCard>
          </div>
        </div>
      }
    />
  );
}
