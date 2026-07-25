"use client";

import React, { useState, useMemo } from "react";
import { CalculatorWrapper } from "@/components/calculators/CalculatorWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { calculateRetirement, RetirementInput } from "@/lib/calculators";
import { useCurrency } from "@/context/CurrencyContext";
import { formatCurrency } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { PiggyBank, TrendingUp, ShieldCheck, Sun } from "lucide-react";

export default function RetirementCalculatorPage() {
  const { currency } = useCurrency();

  const [input, setInput] = useState<RetirementInput>({
    currentAge: 30,
    retirementAge: 65,
    currentSavings: 25000,
    monthlyInvestment: 1000,
    expectedAnnualReturn: 8.0,
    expectedInflation: 2.5,
  });

  const result = useMemo(() => calculateRetirement(input), [input]);

  return (
    <CalculatorWrapper
      id="retirement"
      title="Retirement Growth Calculator"
      subtitle="Project compound investment growth, inflation-adjusted purchasing power, and year-by-year nest egg wealth trajectories."
      summaryText={`Retirement Nest Egg: ${formatCurrency(result.nominalFutureValue, currency)} at age ${input.retirementAge} (${formatCurrency(result.realInflationAdjustedValue, currency)} inflation adjusted)`}
      formulaTitle="Compound Wealth Accumulation Formula"
      formulaContent={
        <div>
          <p className="font-mono bg-slate-950 text-indigo-300 p-3 rounded-xl mb-2 text-center text-xs sm:text-sm">
            FV = PV(1 + r)ⁿ + PMT [ ((1 + r)ⁿ - 1) / r ]
          </p>
          <p className="text-xs text-slate-300">
            Where <strong>PV</strong> = Current Savings (${input.currentSavings.toLocaleString()}), <strong>PMT</strong> = Monthly Contribution (${input.monthlyInvestment.toLocaleString()}), <strong>r</strong> = Monthly Return Rate ({(input.expectedAnnualReturn / 12).toFixed(3)}%), and <strong>n</strong> = Months ({result.totalYears * 12}).
          </p>
        </div>
      }
      howItWorksContent={
        <div className="space-y-4">
          <p>
            Compound interest is often referred to as the eighth wonder of the world. By starting early and consistently investing monthly capital into index funds or diversified portfolios, small contributions scale exponentially over decades.
          </p>
          <p>
            ValuePilot&apos;s retirement calculator factors in <strong>Real Purchasing Power</strong>. Inflation erodes nominal cash values over time. By discounting future balances against expected annual inflation (e.g. 2.5%), you see your true equivalent standard of living.
          </p>
        </div>
      }
      exampleContent={
        <div>
          <p className="font-semibold text-slate-900 dark:text-white mb-2">Example: Age 30 to 65 (35 Year Horizon)</p>
          <p>
            Investing $1,000/month at an 8.0% annual average stock market return with $25,000 starting principal:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Total Out-of-Pocket</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">{formatCurrency(result.totalOutofPocketInvested, currency)}</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Compound Growth Earned</div>
              <div className="text-sm font-bold text-emerald-600">{formatCurrency(result.totalCompoundInterestEarned, currency)}</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Nominal Nest Egg</div>
              <div className="text-sm font-bold text-[#6D5DF6]">{formatCurrency(result.nominalFutureValue, currency)}</div>
            </div>
          </div>
        </div>
      }
      prosAndCons={{
        pros: [
          "Demonstrates the extreme exponential power of compound interest over long horizons.",
          "Real inflation adjustment provides clear purchasing power targets.",
        ],
        cons: [
          "Market returns fluctuate year-to-year; calculations assume average annual compound rates.",
        ],
      }}
      faqs={[
        {
          question: "What annual return rate should I assume for retirement planning?",
          answer: "Historically, the S&P 500 has averaged ~10% annual returns before inflation over multi-decade periods. A conservative planning estimate is 7% to 8%.",
        },
      ]}
      relatedTools={[
        { name: "401(k) Match Calculator", href: "/calculators/401k", desc: "Calculate employer match contribution boost" },
        { name: "Traditional vs Roth IRA", href: "/calculators/ira", desc: "Determine tax free retirement withdrawals" },
        { name: "Net Worth Tracker", href: "/calculators/net-worth", desc: "Track investment asset balance" },
      ]}
      calculatorNode={
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <GlassCard className="lg:col-span-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <PiggyBank className="w-5 h-5 text-[#6D5DF6]" /> Retirement Timeline & Savings
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] text-slate-500 font-semibold">Current Age</label>
                <input
                  type="number"
                  value={input.currentAge}
                  onChange={(e) => setInput({ ...input, currentAge: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border text-xs font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-slate-500 font-semibold">Retirement Target Age</label>
                <input
                  type="number"
                  value={input.retirementAge}
                  onChange={(e) => setInput({ ...input, retirementAge: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border text-xs font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] text-slate-500 font-semibold">Current Savings Balance ($)</label>
                <input
                  type="number"
                  value={input.currentSavings}
                  onChange={(e) => setInput({ ...input, currentSavings: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border text-xs font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-slate-500 font-semibold">Monthly Investment ($)</label>
                <input
                  type="number"
                  value={input.monthlyInvestment}
                  onChange={(e) => setInput({ ...input, monthlyInvestment: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border text-xs font-bold text-[#6D5DF6]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] text-slate-500 font-semibold">Expected Return (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={input.expectedAnnualReturn}
                  onChange={(e) => setInput({ ...input, expectedAnnualReturn: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border text-xs font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-slate-500 font-semibold">Expected Inflation (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={input.expectedInflation}
                  onChange={(e) => setInput({ ...input, expectedInflation: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border text-xs font-bold text-slate-400"
                />
              </div>
            </div>
          </GlassCard>

          <div className="lg:col-span-6 space-y-6">
            <GlassCard gradient className="p-8 text-center border-2 border-indigo-500/20">
              <div className="text-xs font-bold uppercase tracking-widest text-[#6D5DF6]">Estimated Retirement Balance</div>
              <div className="text-4xl sm:text-5xl font-extrabold text-slate-950 dark:text-white mt-2">
                <AnimatedNumber value={result.nominalFutureValue} formatFn={(val) => formatCurrency(val, currency)} />
              </div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-2">
                Real Purchasing Power (Today&apos;s Dollars): {formatCurrency(result.realInflationAdjustedValue, currency)}
              </p>
            </GlassCard>

            {/* Growth Chart */}
            <GlassCard className="p-5">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-3">Wealth Growth Trajectory</h3>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={result.growthSchedule}>
                    <defs>
                      <linearGradient id="colorNominal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6D5DF6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#6D5DF6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="age" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} />
                    <Tooltip
                      formatter={(val: number) => [formatCurrency(val, currency), "Portfolio Value"]}
                      labelFormatter={(label) => `Age ${label}`}
                      contentStyle={{
                        backgroundColor: "#0F172A",
                        borderColor: "#334155",
                        borderRadius: "12px",
                        color: "#FFFFFF",
                        fontSize: "12px",
                        fontWeight: "bold",
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)",
                        padding: "8px 12px",
                      }}
                      itemStyle={{ color: "#A5B4FC", fontWeight: "bold" }}
                      labelStyle={{ color: "#94A3B8", fontWeight: "bold", marginBottom: "2px" }}
                    />
                    <Area type="monotone" dataKey="nominalBalance" stroke="#6D5DF6" fillOpacity={1} fill="url(#colorNominal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </div>
        </div>
      }
    />
  );
}
