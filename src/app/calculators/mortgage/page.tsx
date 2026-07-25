"use client";

import React, { useState, useMemo } from "react";
import { CalculatorWrapper } from "@/components/calculators/CalculatorWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { calculateMortgage, MortgageInput } from "@/lib/calculators";
import { useCurrency } from "@/context/CurrencyContext";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Home, Percent, Calendar, DollarSign, Shield, Info, Table } from "lucide-react";

export default function MortgageCalculatorPage() {
  const { currency } = useCurrency();

  const [input, setInput] = useState<MortgageInput>({
    housePrice: 450000,
    downPaymentPercent: 20,
    interestRate: 6.75,
    loanTermYears: 30,
    propertyTaxAnnual: 5400,
    homeInsuranceAnnual: 1800,
    hoaMonthly: 150,
  });

  const [showAmortization, setShowAmortization] = useState(false);

  const result = useMemo(() => calculateMortgage(input), [input]);

  const pieData = [
    { name: "Principal & Interest", value: result.monthlyPrincipalAndInterest, color: "#6D5DF6" },
    { name: "Property Tax", value: result.monthlyPropertyTax, color: "#10B981" },
    { name: "Home Insurance", value: result.monthlyInsurance, color: "#F59E0B" },
    { name: "HOA Fees", value: result.monthlyHOA, color: "#EC4899" },
    ...(result.monthlyPMI > 0 ? [{ name: "PMI Insurance", value: result.monthlyPMI, color: "#6366F1" }] : []),
  ];

  return (
    <CalculatorWrapper
      id="mortgage"
      title="Mortgage Calculator"
      subtitle="Calculate your total monthly mortgage payment, interest rates, property taxes, HOA fees, and view full 30-year amortization schedules."
      summaryText={`Monthly payment: ${formatCurrency(result.totalMonthlyPayment, currency)} for home priced at ${formatCurrency(input.housePrice, currency)}`}
      formulaTitle="Mortgage Payment Formula (P&I)"
      formulaContent={
        <div>
          <p className="font-mono bg-slate-950 text-indigo-300 p-3 rounded-xl mb-2 text-center text-sm sm:text-base">
            M = P × [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]
          </p>
          <p className="text-xs text-slate-300">
            Where <strong>M</strong> = Monthly Principal & Interest payment, <strong>P</strong> = Principal Loan Balance (${result.loanAmount.toLocaleString()}), <strong>r</strong> = Monthly Interest Rate ({(input.interestRate / 12).toFixed(4)}%), and <strong>n</strong> = Total number of monthly payments ({input.loanTermYears * 12} months).
          </p>
        </div>
      }
      howItWorksContent={
        <div className="space-y-4">
          <p>
            When purchasing real estate, your monthly housing expenditure extends beyond the primary mortgage loan balance. A standard PITI payment model includes <strong>Principal, Interest, Taxes, and Insurance</strong>.
          </p>
          <p>
            By entering your target home purchase price, down payment capital, annual fixed rate interest percentage, and property location taxes into ValuePilot&apos;s mortgage calculator, you receive instant transparent clarity on your true monthly obligation.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Principal:</strong> The portion of your monthly payment directly paying down your loan balance.</li>
            <li><strong>Interest:</strong> The fee charged by your lender for borrowing mortgage capital.</li>
            <li><strong>Property Taxes:</strong> Municipal taxes assessed by local county authorities to fund public services.</li>
            <li><strong>Homeowners Insurance:</strong> Required policy protecting the physical structure against damages.</li>
            <li><strong>PMI (Private Mortgage Insurance):</strong> Required by conventional lenders if your down payment is under 20%.</li>
          </ul>
        </div>
      }
      exampleContent={
        <div>
          <p className="font-semibold text-slate-900 dark:text-white mb-2">Example Scenario: $450,000 Purchase Price</p>
          <p>
            With a 20% down payment (${(450000 * 0.2).toLocaleString()}), your primary loan principal is $360,000. At a 6.75% fixed interest rate over 30 years:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Monthly P&I</div>
              <div className="text-sm font-bold text-[#6D5DF6]">{formatCurrency(result.monthlyPrincipalAndInterest, currency)}</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Taxes & Ins.</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">{formatCurrency(result.monthlyPropertyTax + result.monthlyInsurance, currency)}</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Total Monthly</div>
              <div className="text-sm font-bold text-emerald-600">{formatCurrency(result.totalMonthlyPayment, currency)}</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Total Interest</div>
              <div className="text-sm font-bold text-amber-600">{formatCurrency(result.totalInterestPaid, currency)}</div>
            </div>
          </div>
        </div>
      }
      prosAndCons={{
        pros: [
          "Building equity in a real estate asset that historically appreciates over long horizons.",
          "Fixed-rate mortgages shield you from rising rental market inflation.",
          "Mortgage interest and property tax deductions may lower federal income taxes.",
        ],
        cons: [
          "Illiquid commitment with significant upfront closing costs (2% to 5% of home price).",
          "Ongoing responsibility for structural maintenance, property taxes, and insurance.",
        ],
      }}
      faqs={[
        {
          question: "How much down payment do I need to buy a home?",
          answer: "While 20% down avoids Private Mortgage Insurance (PMI), conventional mortgage loans permit down payments as low as 3% for first-time buyers, and FHA loans require 3.5%.",
        },
        {
          question: "What is PMI and how can I avoid it?",
          answer: "Private Mortgage Insurance protects lenders against default. You can avoid PMI by putting down at least 20% upfront or requesting cancellation once your home equity reaches 20%.",
        },
        {
          question: "Should I choose a 15-year or 30-year loan term?",
          answer: "A 15-year mortgage offers lower interest rates and saves vast interest, but requires higher monthly payments. A 30-year loan keeps monthly payments manageable while giving flexibility.",
        },
      ]}
      relatedTools={[
        { name: "Refinance Calculator", href: "/calculators/refinance", desc: "Compare new rates and break-even point" },
        { name: "Car Loan Calculator", href: "/calculators/car-loan", desc: "Calculate vehicle loan interest & EMI" },
        { name: "Net Worth Tracker", href: "/calculators/net-worth", desc: "Track real estate equity in total assets" },
      ]}
      calculatorNode={
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Inputs */}
          <GlassCard className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
                <Home className="w-5 h-5 text-[#6D5DF6]" /> Mortgage Details
              </h2>
              <span className="text-xs text-slate-400">Live Instant Update</span>
            </div>

            {/* Input 1: House Price */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300">
                <label htmlFor="housePrice">Home Purchase Price</label>
                <span className="text-[#6D5DF6] font-bold">{formatCurrency(input.housePrice, currency)}</span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
                <input
                  id="housePrice"
                  type="number"
                  min="50000"
                  max="10000000"
                  step="5000"
                  value={input.housePrice}
                  onChange={(e) => setInput({ ...input, housePrice: Number(e.target.value) || 0 })}
                  className="w-full pl-8 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#6D5DF6] outline-none"
                />
              </div>
            </div>

            {/* Input 2: Down Payment */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300">
                <label htmlFor="downPayment">Down Payment ({input.downPaymentPercent}%)</label>
                <span className="text-slate-500 font-normal">{formatCurrency(result.downPaymentAmount, currency)}</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={input.downPaymentPercent}
                  onChange={(e) => setInput({ ...input, downPaymentPercent: Number(e.target.value) })}
                  className="flex-1 accent-[#6D5DF6] cursor-pointer"
                />
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={input.downPaymentPercent}
                  onChange={(e) => setInput({ ...input, downPaymentPercent: Number(e.target.value) || 0 })}
                  className="w-20 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-bold text-slate-900 dark:text-white text-sm"
                />
              </div>
            </div>

            {/* Input 3 & 4: Rate & Term */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="interestRate" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5 text-[#6D5DF6]" /> Interest Rate (%)
                </label>
                <input
                  id="interestRate"
                  type="number"
                  step="0.05"
                  min="1"
                  max="15"
                  value={input.interestRate}
                  onChange={(e) => setInput({ ...input, interestRate: Number(e.target.value) || 0 })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#6D5DF6] outline-none"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="loanTerm" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#6D5DF6]" /> Loan Term (Years)
                </label>
                <select
                  id="loanTerm"
                  value={input.loanTermYears}
                  onChange={(e) => setInput({ ...input, loanTermYears: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#6D5DF6] outline-none"
                >
                  <option value={30}>30 Years Fixed</option>
                  <option value={20}>20 Years Fixed</option>
                  <option value={15}>15 Years Fixed</option>
                  <option value={10}>10 Years Fixed</option>
                </select>
              </div>
            </div>

            {/* Input 5 & 6: Property Tax & Insurance */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Annual Tax ($)</label>
                <input
                  type="number"
                  value={input.propertyTaxAnnual}
                  onChange={(e) => setInput({ ...input, propertyTaxAnnual: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Annual Ins. ($)</label>
                <input
                  type="number"
                  value={input.homeInsuranceAnnual}
                  onChange={(e) => setInput({ ...input, homeInsuranceAnnual: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">HOA Monthly ($)</label>
                <input
                  type="number"
                  value={input.hoaMonthly}
                  onChange={(e) => setInput({ ...input, hoaMonthly: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </GlassCard>

          {/* Right Results & Charts */}
          <div className="lg:col-span-6 space-y-6">
            <GlassCard gradient className="text-center p-8 border-2 border-indigo-500/20">
              <div className="text-xs font-bold uppercase tracking-widest text-[#6D5DF6]">Estimated Monthly Payment</div>
              <div className="text-4xl sm:text-5xl font-extrabold text-slate-950 dark:text-white mt-2">
                <AnimatedNumber value={result.totalMonthlyPayment} formatFn={(val) => formatCurrency(val, currency)} />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Includes ${result.monthlyPrincipalAndInterest.toLocaleString()} Principal & Interest + ${result.monthlyPropertyTax + result.monthlyInsurance + result.monthlyHOA + result.monthlyPMI} Taxes/HOA
              </p>
            </GlassCard>

            {/* Pie Chart Breakdown */}
            <GlassCard className="p-6">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Payment Allocation Breakdown</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={4}>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: any) => formatCurrency(Number(val || 0), currency)}
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
                    <Legend iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400">Total Loan Amount:</span>
                  <div className="font-bold text-slate-900 dark:text-white">{formatCurrency(result.loanAmount, currency)}</div>
                </div>
                <div>
                  <span className="text-slate-400">Total 30-Yr Interest:</span>
                  <div className="font-bold text-amber-600">{formatCurrency(result.totalInterestPaid, currency)}</div>
                </div>
              </div>
            </GlassCard>

            {/* Toggle Amortization Table Button */}
            <button
              onClick={() => setShowAmortization(!showAmortization)}
              className="w-full py-3.5 rounded-2xl bg-slate-900 dark:bg-slate-100 hover:bg-[#6D5DF6] dark:hover:bg-[#6D5DF6] text-white dark:text-slate-900 dark:hover:text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Table className="w-4 h-4" />
              {showAmortization ? "Hide Amortization Table" : "View Annual Amortization Table"}
            </button>
          </div>

          {/* Amortization Table Full Width Drawer */}
          {showAmortization && (
            <div className="lg:col-span-12">
              <GlassCard className="p-6 overflow-x-auto">
                <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-4">30-Year Amortization Schedule</h3>
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-semibold">
                      <th className="pb-3">Year</th>
                      <th className="pb-3">Principal Paid</th>
                      <th className="pb-3">Interest Paid</th>
                      <th className="pb-3">Total Interest</th>
                      <th className="pb-3">Remaining Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {result.amortizationSchedule.map((row) => (
                      <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="py-2.5 font-bold text-slate-900 dark:text-white">{row.year}</td>
                        <td className="py-2.5 text-emerald-600 font-semibold">{formatCurrency(row.principalPaid, currency)}</td>
                        <td className="py-2.5 text-amber-600">{formatCurrency(row.interestPaid, currency)}</td>
                        <td className="py-2.5 text-slate-500">{formatCurrency(row.totalInterestPaid, currency)}</td>
                        <td className="py-2.5 font-bold text-slate-900 dark:text-white">{formatCurrency(row.remainingBalance, currency)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </GlassCard>
            </div>
          )}
        </div>
      }
    />
  );
}
