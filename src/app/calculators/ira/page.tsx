"use client";

import React, { useState, useMemo } from "react";
import { CalculatorWrapper } from "@/components/calculators/CalculatorWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { calculateIRA, IraInput } from "@/lib/calculators";
import { useCurrency } from "@/context/CurrencyContext";
import { formatCurrency } from "@/lib/utils";
import { Coins, ArrowRight, ShieldCheck, Award } from "lucide-react";

export default function IraCalculatorPage() {
  const { currency } = useCurrency();

  const [input, setInput] = useState<IraInput>({
    currentAge: 30,
    retirementAge: 65,
    annualContribution: 7000,
    currentMarginalTaxRate: 24,
    expectedRetirementTaxRate: 15,
    expectedAnnualReturn: 8.0,
  });

  const result = useMemo(() => calculateIRA(input), [input]);

  return (
    <CalculatorWrapper
      id="ira"
      title="Traditional vs Roth IRA Calculator"
      subtitle="Compare Traditional IRA upfront tax deduction vs Roth IRA tax-free growth and 100% tax-free retirement withdrawals."
      summaryText={`Recommended: ${result.betterOption}. Roth IRA Tax-Free Balance: ${formatCurrency(result.rothFutureValue, currency)}`}
      formulaTitle="Roth vs Traditional IRA Comparison"
      formulaContent={
        <div>
          <p className="font-mono bg-slate-950 text-indigo-300 p-3 rounded-xl mb-2 text-center text-xs sm:text-sm">
            Roth IRA: Post-Tax Dollars In → 100% Tax-Free Compound Growth Out
          </p>
          <p className="text-xs text-slate-300">
            If your current tax rate ({input.currentMarginalTaxRate}%) is higher than your expected retirement rate ({input.expectedRetirementTaxRate}%), Traditional IRA saves taxes now. Otherwise, Roth IRA is superior.
          </p>
        </div>
      }
      howItWorksContent={
        <div className="space-y-4">
          <p>
            An Individual Retirement Account (IRA) allows individuals to save for retirement independently of employer plans.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Traditional IRA:</strong> Pre-tax contributions reduce your taxable income today. Withdrawals in retirement are taxed as ordinary income.</li>
            <li><strong>Roth IRA:</strong> After-tax contributions. Compound interest grows completely tax-free, and qualified withdrawals after age 59½ incur 0% federal tax.</li>
          </ul>
        </div>
      }
      exampleContent={
        <div>
          <p className="font-semibold text-slate-900 dark:text-white mb-2">Example: Max $7,000 Annual Contribution over 35 Years</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Roth IRA (Tax-Free Out)</div>
              <div className="text-sm font-bold text-emerald-600">{formatCurrency(result.rothFutureValue, currency)}</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Traditional (After Tax)</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">{formatCurrency(result.traditionalFutureValueTaxed, currency)}</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Winner</div>
              <div className="text-sm font-bold text-[#6D5DF6]">{result.betterOption}</div>
            </div>
          </div>
        </div>
      }
      prosAndCons={{
        pros: [
          "Roth IRA contributions (principal balance) can be withdrawn anytime tax-free and penalty-free.",
          "Roth IRAs have no Required Minimum Distributions (RMDs) during the owner's lifetime.",
        ],
        cons: [
          "High income earners (above $161,000 Single / $240,000 Married) face Roth IRA contribution limits and require a Backdoor Roth process.",
        ],
      }}
      faqs={[
        {
          question: "What is the 2024 annual IRA contribution limit?",
          answer: "The 2024 IRA contribution limit is $7,000 per year ($8,000 if age 50 or older), shared across Traditional and Roth IRAs.",
        },
      ]}
      relatedTools={[
        { name: "401(k) Match Calculator", href: "/calculators/401k", desc: "Compare 401(k) match alongside IRA" },
        { name: "Retirement Growth", href: "/calculators/retirement", desc: "Project overall compound retirement growth" },
        { name: "Tax Refund Estimator", href: "/calculators/tax-refund", desc: "Check IRA tax deduction benefits" },
      ]}
      calculatorNode={
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <GlassCard className="lg:col-span-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <Coins className="w-5 h-5 text-[#6D5DF6]" /> IRA Parameters
            </h2>

            <div className="space-y-1">
              <label htmlFor="annualContribution" className="text-[11px] text-slate-500 font-semibold">Annual Contribution ($)</label>
              <input
                id="annualContribution"
                type="number"
                aria-label="Annual IRA Contribution Amount"
                value={input.annualContribution}
                onChange={(e) => setInput({ ...input, annualContribution: Number(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border text-xs font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label htmlFor="currentMarginalTaxRate" className="text-[11px] text-slate-500 font-semibold">Current Tax Rate (%)</label>
                <input
                  id="currentMarginalTaxRate"
                  type="number"
                  aria-label="Current Marginal Tax Rate Percentage"
                  value={input.currentMarginalTaxRate}
                  onChange={(e) => setInput({ ...input, currentMarginalTaxRate: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border text-xs font-bold"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="expectedRetirementTaxRate" className="text-[11px] text-slate-500 font-semibold">Retirement Tax Rate (%)</label>
                <input
                  id="expectedRetirementTaxRate"
                  type="number"
                  aria-label="Expected Retirement Tax Rate Percentage"
                  value={input.expectedRetirementTaxRate}
                  onChange={(e) => setInput({ ...input, expectedRetirementTaxRate: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border text-xs font-bold"
                />
              </div>
            </div>
          </GlassCard>

          <div className="lg:col-span-6 space-y-6">
            <GlassCard gradient className="p-8 text-center border-2 border-indigo-500/20">
              <div className="text-xs font-bold uppercase tracking-widest text-[#6D5DF6]">Recommended Option</div>
              <div className="text-3xl font-extrabold text-slate-950 dark:text-white mt-1">
                {result.betterOption}
              </div>
              <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                Roth Tax-Free Balance: {formatCurrency(result.rothFutureValue, currency)}
              </div>
            </GlassCard>
          </div>
        </div>
      }
    />
  );
}
