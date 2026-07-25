"use client";

import React, { useState, useMemo } from "react";
import { CalculatorWrapper } from "@/components/calculators/CalculatorWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { calculateRefinance, RefinanceInput } from "@/lib/calculators";
import { useCurrency } from "@/context/CurrencyContext";
import { formatCurrency } from "@/lib/utils";
import { RefreshCw, Percent, ArrowRight, ShieldCheck, CheckCircle2, Clock } from "lucide-react";

export default function RefinanceCalculatorPage() {
  const { currency } = useCurrency();

  const [input, setInput] = useState<RefinanceInput>({
    currentBalance: 320000,
    currentInterestRate: 7.25,
    currentRemainingYears: 25,
    newInterestRate: 5.75,
    newLoanTermYears: 30,
    refinanceClosingCosts: 5000,
    rollCostsIntoLoan: false,
  });

  const result = useMemo(() => calculateRefinance(input), [input]);

  return (
    <CalculatorWrapper
      id="refinance"
      title="Mortgage Refinance Calculator"
      subtitle="Determine if refinancing your mortgage makes financial sense. Calculate monthly payment savings, lifetime interest reduction, and exact break-even months."
      summaryText={`Refinance savings: ${formatCurrency(result.monthlySavings, currency)}/month, break-even in ${result.breakEvenMonths} months.`}
      formulaTitle="Refinance Break-Even Formula"
      formulaContent={
        <div>
          <p className="font-mono bg-slate-950 text-indigo-300 p-3 rounded-xl mb-2 text-center text-xs sm:text-sm">
            Break-Even (Months) = Total Closing Costs / Monthly Payment Savings
          </p>
          <p className="text-xs text-slate-300">
            Where monthly savings = Current Monthly P&I ({formatCurrency(result.currentMonthlyPayment, currency)}) minus New Monthly P&I ({formatCurrency(result.newMonthlyPayment, currency)}).
          </p>
        </div>
      }
      howItWorksContent={
        <div className="space-y-4">
          <p>
            Refinancing involves replacing an existing home loan with a new mortgage structured under different interest terms or loan durations. Homeowners typically refinance to lower monthly payments, secure a lower fixed interest rate, shorten loan terms, or convert home equity into cash.
          </p>
          <p>
            However, because refinancing incurs lender closing fees (typically 2% to 5% of the principal balance), calculating your exact <strong>Break-Even Horizon</strong> is essential. If you plan to remain in the property past the break-even month, refinancing yields net positive compound wealth.
          </p>
        </div>
      }
      exampleContent={
        <div>
          <p className="font-semibold text-slate-900 dark:text-white mb-2">Refinancing $320,000 from 7.25% to 5.75%</p>
          <p>
            With $5,000 in upfront closing costs, lowering your interest rate by 1.50% yields a monthly savings of {formatCurrency(result.monthlySavings, currency)}.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Monthly Savings</div>
              <div className="text-sm font-bold text-emerald-600">+{formatCurrency(result.monthlySavings, currency)}/mo</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Break-Even Point</div>
              <div className="text-sm font-bold text-[#6D5DF6]">{result.breakEvenMonths} Months</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Net Lifetime Savings</div>
              <div className="text-sm font-bold text-indigo-600">{formatCurrency(result.netLifetimeSavings, currency)}</div>
            </div>
          </div>
        </div>
      }
      prosAndCons={{
        pros: [
          "Reduces monthly debt burden, freeing cash flow for investments.",
          "Option to switch from an Adjustable-Rate Mortgage (ARM) to a predictable Fixed Rate.",
          "Cash-out refinance options for home improvements or high-interest debt consolidation.",
        ],
        cons: [
          "Incurs 2%-5% closing fees which require months or years to break even.",
          "Extending loan term back to 30 years can increase cumulative long-term interest if not carefully structured.",
        ],
      }}
      faqs={[
        {
          question: "When is the right time to refinance my mortgage?",
          answer: "A rule of thumb is when interest rates drop by 0.75% to 1.00% below your current rate, and you intend to stay in the home longer than the calculated break-even period.",
        },
        {
          question: "Can closing costs be added into the loan balance?",
          answer: "Yes, known as a no-cash-out refinance with rolled costs. This avoids out-of-pocket expenses at closing, though interest will accrue on the added closing cost balance.",
        },
      ]}
      relatedTools={[
        { name: "Mortgage Calculator", href: "/calculators/mortgage", desc: "Calculate original purchase mortgage payments" },
        { name: "Debt Payoff Planner", href: "/calculators/debt-payoff", desc: "Consolidate debt with mortgage cash-out" },
        { name: "Car Loan Calculator", href: "/calculators/car-loan", desc: "Compare vehicle auto loan refinance options" },
      ]}
      calculatorNode={
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <GlassCard className="lg:col-span-6 space-y-5">
            <h2 className="text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <RefreshCw className="w-5 h-5 text-[#6D5DF6]" /> Current vs New Loan Details
            </h2>

            <div className="space-y-2">
              <label htmlFor="currentBalance" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Remaining Mortgage Balance ($)</label>
              <input
                id="currentBalance"
                type="number"
                aria-label="Remaining Mortgage Balance"
                value={input.currentBalance}
                onChange={(e) => setInput({ ...input, currentBalance: Number(e.target.value) || 0 })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white"
              />
            </div>

            {/* Current Rate & Years */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="currentInterestRate" className="text-xs font-semibold text-slate-600 dark:text-slate-400">Current Rate (%)</label>
                <input
                  id="currentInterestRate"
                  type="number"
                  step="0.1"
                  aria-label="Current Interest Rate Percentage"
                  value={input.currentInterestRate}
                  onChange={(e) => setInput({ ...input, currentInterestRate: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="currentRemainingYears" className="text-xs font-semibold text-slate-600 dark:text-slate-400">Remaining Yrs</label>
                <input
                  id="currentRemainingYears"
                  type="number"
                  aria-label="Remaining Loan Years"
                  value={input.currentRemainingYears}
                  onChange={(e) => setInput({ ...input, currentRemainingYears: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white text-sm"
                />
              </div>
            </div>

            {/* New Rate & Term */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="space-y-1.5">
                <label htmlFor="newInterestRate" className="text-xs font-bold text-[#6D5DF6]">New Rate (%)</label>
                <input
                  id="newInterestRate"
                  type="number"
                  step="0.1"
                  aria-label="New Refinance Interest Rate"
                  value={input.newInterestRate}
                  onChange={(e) => setInput({ ...input, newInterestRate: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800 font-bold text-slate-900 dark:text-white text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="newLoanTermYears" className="text-xs font-bold text-[#6D5DF6]">New Term (Years)</label>
                <select
                  id="newLoanTermYears"
                  aria-label="New Loan Term Years"
                  value={input.newLoanTermYears}
                  onChange={(e) => setInput({ ...input, newLoanTermYears: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800 font-bold text-slate-900 dark:text-white text-sm"
                >
                  <option value={30}>30 Years</option>
                  <option value={20}>20 Years</option>
                  <option value={15}>15 Years</option>
                  <option value={10}>10 Years</option>
                </select>
              </div>
            </div>

            {/* Closing Costs & Checkbox */}
            <div className="space-y-2 pt-2">
              <label htmlFor="refinanceClosingCosts" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Est. Refinance Closing Costs ($)</label>
              <input
                id="refinanceClosingCosts"
                type="number"
                aria-label="Estimated Refinance Closing Costs"
                value={input.refinanceClosingCosts}
                onChange={(e) => setInput({ ...input, refinanceClosingCosts: Number(e.target.value) || 0 })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white"
              />
            </div>
          </GlassCard>

          {/* Right Summary */}
          <div className="lg:col-span-6 space-y-6">
            <GlassCard gradient className="p-8 text-center border-2 border-indigo-500/20">
              <div className="text-xs font-bold uppercase tracking-widest text-[#6D5DF6]">Monthly Savings</div>
              <div className="text-4xl sm:text-5xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">
                <AnimatedNumber value={result.monthlySavings} formatFn={(val) => `${formatCurrency(val, currency)}/mo`} />
              </div>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-[#6D5DF6] text-xs font-bold">
                <Clock className="w-4 h-4" /> Break-Even in {result.breakEvenMonths} Months ({ (result.breakEvenMonths / 12).toFixed(1) } Years)
              </div>
            </GlassCard>

            <div className="grid grid-cols-2 gap-4">
              <GlassCard className="p-5 text-center">
                <div className="text-xs text-slate-400 font-semibold">Current Payment</div>
                <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">{formatCurrency(result.currentMonthlyPayment, currency)}</div>
              </GlassCard>

              <GlassCard className="p-5 text-center">
                <div className="text-xs text-slate-400 font-semibold">New Payment</div>
                <div className="text-xl font-bold text-[#6D5DF6] mt-1">{formatCurrency(result.newMonthlyPayment, currency)}</div>
              </GlassCard>
            </div>

            <GlassCard className="p-6 space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Refinance Summary</h4>
              <div className="flex justify-between text-xs py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Current Remaining Interest:</span>
                <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(result.currentTotalRemainingInterest, currency)}</span>
              </div>
              <div className="flex justify-between text-xs py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">New Total Interest:</span>
                <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(result.newTotalInterest, currency)}</span>
              </div>
              <div className="flex justify-between text-xs py-2 font-bold">
                <span className="text-slate-900 dark:text-white">Net Lifetime Savings:</span>
                <span className="text-emerald-500 text-sm">{formatCurrency(result.netLifetimeSavings, currency)}</span>
              </div>
            </GlassCard>
          </div>
        </div>
      }
    />
  );
}
