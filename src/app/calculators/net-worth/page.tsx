"use client";

import React, { useState, useMemo } from "react";
import { CalculatorWrapper } from "@/components/calculators/CalculatorWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { calculateNetWorth, NetWorthInput } from "@/lib/calculators";
import { useCurrency } from "@/context/CurrencyContext";
import { formatCurrency } from "@/lib/utils";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ShieldCheck, TrendingUp, DollarSign, Building2, Car, CreditCard } from "lucide-react";

export default function NetWorthCalculatorPage() {
  const { currency } = useCurrency();

  const [input, setInput] = useState<NetWorthInput>({
    cashSavings: 35000,
    stocksInvestments: 120000,
    cryptoVal: 15000,
    realEstateVal: 450000,
    vehiclesVal: 28000,
    otherAssetsVal: 10000,
    creditCardDebt: 2500,
    personalLoans: 0,
    mortgageDebt: 310000,
    studentLoans: 12000,
    autoLoans: 18000,
  });

  const result = useMemo(() => calculateNetWorth(input), [input]);

  const pieData = [
    { name: "Liquid Cash & Stocks", value: result.liquidAssets, color: "#6D5DF6" },
    { name: "Real Estate & Vehicles", value: input.realEstateVal + input.vehiclesVal, color: "#10B981" },
    { name: "Total Liabilities", value: result.totalLiabilities, color: "#EF4444" },
  ];

  return (
    <CalculatorWrapper
      id="net-worth"
      title="Net Worth Calculator"
      subtitle="Track your financial health by evaluating total asset valuation against cumulative liabilities and debt obligations."
      summaryText={`Net Worth: ${formatCurrency(result.netWorth, currency)} (Total Assets: ${formatCurrency(result.totalAssets, currency)}, Liabilities: ${formatCurrency(result.totalLiabilities, currency)})`}
      formulaTitle="Net Worth Equation"
      formulaContent={
        <div>
          <p className="font-mono bg-slate-950 text-indigo-300 p-3 rounded-xl mb-2 text-center text-xs sm:text-sm">
            Net Worth = Total Assets - Total Liabilities
          </p>
          <p className="text-xs text-slate-300">
            Assets include cash, home market value, stocks, and vehicles. Liabilities include mortgages, student loans, auto loans, and credit card balances.
          </p>
        </div>
      }
      howItWorksContent={
        <div className="space-y-4">
          <p>
            Net worth is the single definitive scorecard of personal financial strength. Income measures how much money flows in, but net worth measures how much wealth you retain and compound over time.
          </p>
          <p>
            Building financial independence requires systematically increasing assets while aggressively reducing high-cost liabilities.
          </p>
        </div>
      }
      exampleContent={
        <div>
          <p className="font-semibold text-slate-900 dark:text-white mb-2">Example: Total Assets vs Liabilities</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Total Assets</div>
              <div className="text-sm font-bold text-emerald-600">{formatCurrency(result.totalAssets, currency)}</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Total Liabilities</div>
              <div className="text-sm font-bold text-red-500">{formatCurrency(result.totalLiabilities, currency)}</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Calculated Net Worth</div>
              <div className="text-sm font-bold text-[#6D5DF6]">{formatCurrency(result.netWorth, currency)}</div>
            </div>
          </div>
        </div>
      }
      prosAndCons={{
        pros: [
          "Provides a holistic bird&apos;s-eye perspective of true financial independence status.",
          "Distinguishes between liquid financial assets and illiquid physical assets.",
        ],
        cons: [
          "Real estate and vehicle market valuations require periodic realistic appraisal updates.",
        ],
      }}
      faqs={[
        {
          question: "What is considered a good net worth by age?",
          answer: "A standard benchmark is: Net Worth = (Age × Pre-tax Annual Income) / 10. By age 30, aiming for 1x annual income is a healthy target.",
        },
      ]}
      relatedTools={[
        { name: "Budget Planner", href: "/calculators/budget", desc: "Increase monthly savings to grow assets" },
        { name: "Debt Payoff Planner", href: "/calculators/debt-payoff", desc: "Eliminate liabilities quickly" },
        { name: "Retirement Growth", href: "/calculators/retirement", desc: "Project net worth at age 65" },
      ]}
      calculatorNode={
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Inputs Assets & Liabilities */}
          <div className="lg:col-span-7 space-y-6">
            <GlassCard className="space-y-4">
              <h2 className="text-base font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <TrendingUp className="w-5 h-5" /> Assets (What You Own)
              </h2>

              <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
                <div>
                  <label htmlFor="cashSavings" className="text-slate-500">Cash & Checking ($)</label>
                  <input
                    id="cashSavings"
                    type="number"
                    aria-label="Cash and Checking Savings"
                    value={input.cashSavings}
                    onChange={(e) => setInput({ ...input, cashSavings: Number(e.target.value) || 0 })}
                    className="w-full mt-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border"
                  />
                </div>
                <div>
                  <label htmlFor="stocksInvestments" className="text-slate-500">Stocks & Brokerage ($)</label>
                  <input
                    id="stocksInvestments"
                    type="number"
                    aria-label="Stocks and Investment Brokerage"
                    value={input.stocksInvestments}
                    onChange={(e) => setInput({ ...input, stocksInvestments: Number(e.target.value) || 0 })}
                    className="w-full mt-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border"
                  />
                </div>
                <div>
                  <label htmlFor="realEstateVal" className="text-slate-500">Real Estate Market Val ($)</label>
                  <input
                    id="realEstateVal"
                    type="number"
                    aria-label="Real Estate Market Valuation"
                    value={input.realEstateVal}
                    onChange={(e) => setInput({ ...input, realEstateVal: Number(e.target.value) || 0 })}
                    className="w-full mt-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border"
                  />
                </div>
                <div>
                  <label htmlFor="vehiclesVal" className="text-slate-500">Vehicles Valuation ($)</label>
                  <input
                    id="vehiclesVal"
                    type="number"
                    aria-label="Vehicles Valuation"
                    value={input.vehiclesVal}
                    onChange={(e) => setInput({ ...input, vehiclesVal: Number(e.target.value) || 0 })}
                    className="w-full mt-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border"
                  />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="space-y-4">
              <h2 className="text-base font-bold text-red-500 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <CreditCard className="w-5 h-5" /> Liabilities (What You Owe)
              </h2>

              <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
                <div>
                  <label htmlFor="mortgageDebt" className="text-slate-500">Mortgage Balance ($)</label>
                  <input
                    id="mortgageDebt"
                    type="number"
                    aria-label="Mortgage Balance Liability"
                    value={input.mortgageDebt}
                    onChange={(e) => setInput({ ...input, mortgageDebt: Number(e.target.value) || 0 })}
                    className="w-full mt-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border"
                  />
                </div>
                <div>
                  <label htmlFor="creditCardDebt" className="text-slate-500">Credit Card Debt ($)</label>
                  <input
                    id="creditCardDebt"
                    type="number"
                    aria-label="Credit Card Debt Liability"
                    value={input.creditCardDebt}
                    onChange={(e) => setInput({ ...input, creditCardDebt: Number(e.target.value) || 0 })}
                    className="w-full mt-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border"
                  />
                </div>
                <div>
                  <label htmlFor="studentLoans" className="text-slate-500">Student Loans ($)</label>
                  <input
                    id="studentLoans"
                    type="number"
                    aria-label="Student Loans Liability"
                    value={input.studentLoans}
                    onChange={(e) => setInput({ ...input, studentLoans: Number(e.target.value) || 0 })}
                    className="w-full mt-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border"
                  />
                </div>
                <div>
                  <label htmlFor="autoLoans" className="text-slate-500">Auto Loans ($)</label>
                  <input
                    id="autoLoans"
                    type="number"
                    aria-label="Auto Loans Liability"
                    value={input.autoLoans}
                    onChange={(e) => setInput({ ...input, autoLoans: Number(e.target.value) || 0 })}
                    className="w-full mt-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border"
                  />
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <GlassCard gradient className="p-8 text-center border-2 border-indigo-500/20">
              <div className="text-xs font-bold uppercase tracking-widest text-[#6D5DF6]">Total Net Worth</div>
              <div className="text-4xl sm:text-5xl font-extrabold text-slate-950 dark:text-white mt-2">
                <AnimatedNumber value={result.netWorth} formatFn={(val) => formatCurrency(val, currency)} />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Liquid Assets: <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(result.liquidAssets, currency)}</span>
              </p>
            </GlassCard>
          </div>
        </div>
      }
    />
  );
}
