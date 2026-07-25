"use client";

import React, { useState, useMemo } from "react";
import { CalculatorWrapper } from "@/components/calculators/CalculatorWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { calculateBudget, BudgetInput } from "@/lib/calculators";
import { useCurrency } from "@/context/CurrencyContext";
import { formatCurrency } from "@/lib/utils";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Wallet, PieChart as PieIcon, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

export default function BudgetPlannerPage() {
  const { currency } = useCurrency();

  const [input, setInput] = useState<BudgetInput>({
    monthlyIncome: 6500,
    housing: 1800,
    food: 650,
    transport: 400,
    utilities: 250,
    insurance: 200,
    subscriptions: 80,
    debtPayments: 350,
    savingsInvestment: 1300,
    entertainment: 350,
    misc: 200,
  });

  const result = useMemo(() => calculateBudget(input), [input]);

  const pieData = [
    { name: "Essential Needs (50%)", value: result.needsTotal, color: "#6D5DF6" },
    { name: "Discretionary Wants (30%)", value: result.wantsTotal, color: "#F59E0B" },
    { name: "Savings & Debt (20%)", value: result.savingsTotal, color: "#10B981" },
  ];

  return (
    <CalculatorWrapper
      id="budget"
      title="Budget Planner (50/30/20)"
      subtitle="Optimize your monthly cash flow with the gold-standard 50/30/20 financial rule and zero-based budget analysis."
      summaryText={`Monthly income: ${formatCurrency(input.monthlyIncome, currency)}, Savings rate: ${result.savingsRatePercent.toFixed(1)}%`}
      formulaTitle="The 50/30/20 Budgeting Rule"
      formulaContent={
        <div>
          <p className="font-mono bg-slate-950 text-indigo-300 p-3 rounded-xl mb-2 text-center text-xs sm:text-sm">
            Needs ≤ 50% | Wants ≤ 30% | Savings ≥ 20%
          </p>
          <p className="text-xs text-slate-300">
            Categorizes net take-home salary to ensure essentials are covered, lifestyle is enjoyed, and long-term financial independence is guaranteed.
          </p>
        </div>
      }
      howItWorksContent={
        <div className="space-y-4">
          <p>
            Budgeting is the foundational anchor of personal finance. Without tracking monthly expenditures, salary increases frequently disappear to lifestyle creep.
          </p>
          <p>
            The 50/30/20 framework simplifies money management by grouping all spending into three distinct buckets:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>50% Needs:</strong> Non-negotiable expenses required to live and work (Rent/Mortgage, Groceries, Utilities, Minimum Debt).</li>
            <li><strong>30% Wants:</strong> Flexible discretionary lifestyle choices (Dining out, Subscriptions, Vacations, Hobbies).</li>
            <li><strong>20% Savings:</strong> Wealth accumulation, 401(k), Roth IRA, Emergency Fund, and extra principal debt payoff.</li>
          </ul>
        </div>
      }
      exampleContent={
        <div>
          <p className="font-semibold text-slate-900 dark:text-white mb-2">Example: $6,500 Monthly Net Income</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Needs (Target $3,250)</div>
              <div className="text-sm font-bold text-[#6D5DF6]">{formatCurrency(result.needsTotal, currency)} ({result.needsPercent.toFixed(1)}%)</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Wants (Target $1,950)</div>
              <div className="text-sm font-bold text-amber-600">{formatCurrency(result.wantsTotal, currency)} ({result.wantsPercent.toFixed(1)}%)</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Savings (Target $1,300)</div>
              <div className="text-sm font-bold text-emerald-600">{formatCurrency(result.savingsTotal, currency)} ({result.savingsPercent.toFixed(1)}%)</div>
            </div>
          </div>
        </div>
      }
      prosAndCons={{
        pros: [
          "Prevents overspending and guarantees compound investment growth.",
          "Simple framework that eliminates granular tedious receipt tracking.",
        ],
        cons: [
          "High cost-of-living metro areas may force Needs above 50% temporarily.",
        ],
      }}
      faqs={[
        {
          question: "What if my essential needs take up more than 50% of my income?",
          answer: "In high cost-of-living areas, needs can temporarily reach 60%. Compensate by reducing discretionary wants until income grows.",
        },
      ]}
      relatedTools={[
        { name: "Debt Payoff Planner", href: "/calculators/debt-payoff", desc: "Redirect extra budget cash flow" },
        { name: "Retirement Growth", href: "/calculators/retirement", desc: "Project savings growth over 30 years" },
        { name: "Net Worth Tracker", href: "/calculators/net-worth", desc: "Track total accumulated net assets" },
      ]}
      calculatorNode={
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <GlassCard className="lg:col-span-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <Wallet className="w-5 h-5 text-[#6D5DF6]" /> Income & Expense Inputs
            </h2>

            <div className="space-y-1.5">
              <label htmlFor="monthlyIncome" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Monthly Net Income ($)</label>
              <input
                id="monthlyIncome"
                type="number"
                aria-label="Monthly Net Income"
                value={input.monthlyIncome}
                onChange={(e) => setInput({ ...input, monthlyIncome: Number(e.target.value) || 0 })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="space-y-1">
                <label htmlFor="housing" className="text-[11px] text-slate-500 font-semibold">Rent / Housing ($)</label>
                <input
                  id="housing"
                  type="number"
                  aria-label="Rent or Housing Expenses"
                  value={input.housing}
                  onChange={(e) => setInput({ ...input, housing: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border text-xs font-semibold"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="food" className="text-[11px] text-slate-500 font-semibold">Food & Groceries ($)</label>
                <input
                  id="food"
                  type="number"
                  aria-label="Food and Groceries Expenses"
                  value={input.food}
                  onChange={(e) => setInput({ ...input, food: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border text-xs font-semibold"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="transport" className="text-[11px] text-slate-500 font-semibold">Transportation ($)</label>
                <input
                  id="transport"
                  type="number"
                  aria-label="Transportation Expenses"
                  value={input.transport}
                  onChange={(e) => setInput({ ...input, transport: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border text-xs font-semibold"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="savingsInvestment" className="text-[11px] text-slate-500 font-semibold">Monthly Savings ($)</label>
                <input
                  id="savingsInvestment"
                  type="number"
                  aria-label="Monthly Savings and Investment"
                  value={input.savingsInvestment}
                  onChange={(e) => setInput({ ...input, savingsInvestment: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border text-xs font-semibold text-emerald-600"
                />
              </div>
            </div>
          </GlassCard>

          <div className="lg:col-span-6 space-y-6">
            <GlassCard gradient className="p-8 text-center border-2 border-indigo-500/20">
              <div className="text-xs font-bold uppercase tracking-widest text-[#6D5DF6]">Monthly Savings Rate</div>
              <div className="text-4xl sm:text-5xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">
                <AnimatedNumber value={result.savingsRatePercent} formatFn={(val) => `${val.toFixed(1)}%`} />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Remaining Unallocated Cash: <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(result.remainingCash, currency)}</span>
              </p>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Smart Financial Recommendations</h3>
              <div className="space-y-2">
                {result.recommendations.map((rec, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6D5DF6] shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      }
    />
  );
}
