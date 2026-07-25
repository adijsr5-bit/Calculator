"use client";

import React, { useState, useMemo } from "react";
import { CalculatorWrapper } from "@/components/calculators/CalculatorWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { calculateTaxRefund, TaxInput } from "@/lib/calculators";
import { useCurrency } from "@/context/CurrencyContext";
import { formatCurrency } from "@/lib/utils";
import { Receipt, DollarSign, Percent, ShieldCheck } from "lucide-react";

export default function TaxRefundEstimatorPage() {
  const { currency } = useCurrency();

  const [input, setInput] = useState<TaxInput>({
    filingStatus: "single",
    grossIncome: 95000,
    federalTaxPaid: 15500,
    deductionType: "standard",
    itemizedDeductionAmount: 0,
    taxCredits: 0,
  });

  const result = useMemo(() => calculateTaxRefund(input), [input]);

  return (
    <CalculatorWrapper
      id="tax-refund"
      title="Tax Refund Estimator"
      subtitle="Estimate your federal income tax refund or amount owed based on standard vs itemized deductions, marginal tax brackets, and tax credits."
      summaryText={`Estimated ${result.estimatedRefundOrOwed >= 0 ? "Refund" : "Owed"}: ${formatCurrency(Math.abs(result.estimatedRefundOrOwed), currency)}`}
      formulaTitle="Federal Income Tax Formula"
      formulaContent={
        <div>
          <p className="font-mono bg-slate-950 text-indigo-300 p-3 rounded-xl mb-2 text-center text-xs sm:text-sm">
            Taxable Income = Gross Income - Standard/Itemized Deduction
          </p>
          <p className="text-xs text-slate-300">
            Marginal tax rates (10%, 12%, 22%, 24%, 32%, 35%, 37%) are applied progressively across brackets to compute total tax liability.
          </p>
        </div>
      }
      howItWorksContent={
        <div className="space-y-4">
          <p>
            Federal income taxes in the United States operate under a progressive tax bracket system. Only income within each specific bracket range is taxed at that bracket's marginal rate.
          </p>
          <p>
            Your total tax liability is compared against tax withholdings made throughout the tax year (W-2 Box 2). If your withholdings exceed your total tax liability, the IRS issues a tax refund.
          </p>
        </div>
      }
      exampleContent={
        <div>
          <p className="font-semibold text-slate-900 dark:text-white mb-2">Example: Single Filer, $95,000 Gross Income</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Standard Deduction</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">{formatCurrency(result.standardDeduction, currency)}</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Taxable Income</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">{formatCurrency(result.taxableIncome, currency)}</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Effective Tax Rate</div>
              <div className="text-sm font-bold text-[#6D5DF6]">{result.effectiveTaxRate.toFixed(1)}%</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Est. Refund</div>
              <div className="text-sm font-bold text-emerald-600">{formatCurrency(Math.max(0, result.estimatedRefundOrOwed), currency)}</div>
            </div>
          </div>
        </div>
      }
      prosAndCons={{
        pros: [
          "Identifies exact tax savings from maximize pre-tax 401(k) and IRA contributions.",
          "Prepares you ahead of tax filing season to avoid unexpected tax bill surprises.",
        ],
        cons: [
          "State and municipal local income taxes vary by location and are calculated separately.",
        ],
      }}
      faqs={[
        {
          question: "Should I claim the Standard Deduction or Itemize?",
          answer: "Claim the standard deduction unless your total qualifying itemized expenses (mortgage interest, state taxes, charitable gifts) exceed $14,600 for Single filers or $29,200 for Married filing jointly.",
        },
      ]}
      relatedTools={[
        { name: "401(k) Match Calculator", href: "/calculators/401k", desc: "Lower taxable income with pre-tax contributions" },
        { name: "Traditional vs Roth IRA", href: "/calculators/ira", desc: "Compare tax deduction benefits now vs retirement" },
        { name: "Budget Planner", href: "/calculators/budget", desc: "Plan your net take-home paycheck" },
      ]}
      calculatorNode={
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <GlassCard className="lg:col-span-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <Receipt className="w-5 h-5 text-[#6D5DF6]" /> Tax Details
            </h2>

            <div className="space-y-1">
              <label htmlFor="filingStatus" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Filing Status</label>
              <select
                id="filingStatus"
                aria-label="Select Tax Filing Status"
                value={input.filingStatus}
                onChange={(e) => setInput({ ...input, filingStatus: e.target.value as any })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border font-bold text-xs"
              >
                <option value="single">Single Filer ($14,600 Std Deduction)</option>
                <option value="married_joint">Married Filing Jointly ($29,200 Std Deduction)</option>
                <option value="head_of_household">Head of Household ($21,900 Std Deduction)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label htmlFor="grossIncome" className="text-[11px] text-slate-500 font-semibold">Annual Gross Income ($)</label>
                <input
                  id="grossIncome"
                  type="number"
                  aria-label="Annual Gross Income"
                  value={input.grossIncome}
                  onChange={(e) => setInput({ ...input, grossIncome: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border text-xs font-bold"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="federalTaxPaid" className="text-[11px] text-slate-500 font-semibold">Federal Tax Withheld ($)</label>
                <input
                  id="federalTaxPaid"
                  type="number"
                  aria-label="Federal Tax Withheld Amount"
                  value={input.federalTaxPaid}
                  onChange={(e) => setInput({ ...input, federalTaxPaid: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border text-xs font-bold text-emerald-600"
                />
              </div>
            </div>
          </GlassCard>

          <div className="lg:col-span-6 space-y-6">
            <GlassCard gradient className="p-8 text-center border-2 border-indigo-500/20">
              <div className="text-xs font-bold uppercase tracking-widest text-[#6D5DF6]">
                {result.estimatedRefundOrOwed >= 0 ? "Estimated Tax Refund" : "Estimated Tax Owed"}
              </div>
              <div className={`text-4xl sm:text-5xl font-extrabold mt-2 ${result.estimatedRefundOrOwed >= 0 ? "text-emerald-500" : "text-amber-500"}`}>
                <AnimatedNumber value={Math.abs(result.estimatedRefundOrOwed)} formatFn={(val) => formatCurrency(val, currency)} />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Total Tax Liability: <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(result.totalTaxOwed, currency)}</span> (Effective Rate: {result.effectiveTaxRate.toFixed(1)}%)
              </p>
            </GlassCard>
          </div>
        </div>
      }
    />
  );
}
