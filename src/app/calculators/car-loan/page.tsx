"use client";

import React, { useState, useMemo } from "react";
import { CalculatorWrapper } from "@/components/calculators/CalculatorWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { calculateCarLoan, CarLoanInput } from "@/lib/calculators";
import { useCurrency } from "@/context/CurrencyContext";
import { formatCurrency } from "@/lib/utils";
import { Car, DollarSign, Percent, Calendar, ShieldCheck } from "lucide-react";

export default function CarLoanCalculatorPage() {
  const { currency } = useCurrency();

  const [input, setInput] = useState<CarLoanInput>({
    vehiclePrice: 35000,
    downPayment: 5000,
    tradeInValue: 3000,
    salesTaxPercent: 7.0,
    interestRate: 5.9,
    loanTermMonths: 60,
  });

  const result = useMemo(() => calculateCarLoan(input), [input]);

  return (
    <CalculatorWrapper
      id="car-loan"
      title="Car Loan Calculator"
      subtitle="Calculate monthly auto loan payments, sales tax, trade-in credit, and total interest cost for new and used vehicles."
      summaryText={`Monthly EMI: ${formatCurrency(result.monthlyEMI, currency)} for vehicle priced at ${formatCurrency(input.vehiclePrice, currency)}`}
      formulaTitle="Auto Loan Monthly Payment Formula"
      formulaContent={
        <div>
          <p className="font-mono bg-slate-950 text-indigo-300 p-3 rounded-xl mb-2 text-center text-xs sm:text-sm">
            EMI = [ P × r × (1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]
          </p>
          <p className="text-xs text-slate-300">
            Where <strong>P</strong> = Net Financed Amount (${result.totalLoanAmount.toLocaleString()}), <strong>r</strong> = Monthly Interest Rate ({(input.interestRate / 12).toFixed(4)}%), and <strong>n</strong> = Loan Term in Months ({input.loanTermMonths} months).
          </p>
        </div>
      }
      howItWorksContent={
        <div className="space-y-4">
          <p>
            Automobile financing differs from mortgages due to trade-in valuation, state-level sales tax adjustments, and shorter loan repayment periods (typically 36 to 84 months).
          </p>
          <p>
            When trading in an existing car, your state tax is calculated only on the net difference between the purchase price and your trade-in allowance in most states, saving significant upfront tax cash.
          </p>
        </div>
      }
      exampleContent={
        <div>
          <p className="font-semibold text-slate-900 dark:text-white mb-2">Example: $35,000 Vehicle Purchase</p>
          <p>
            With $5,000 cash down payment, $3,000 trade-in credit, and 7% sales tax, your net loan is {formatCurrency(result.totalLoanAmount, currency)} over 60 months at 5.9% APR.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Monthly EMI</div>
              <div className="text-sm font-bold text-[#6D5DF6]">{formatCurrency(result.monthlyEMI, currency)}</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Sales Tax</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">{formatCurrency(result.salesTaxAmount, currency)}</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Total Interest</div>
              <div className="text-sm font-bold text-amber-600">{formatCurrency(result.totalInterestPaid, currency)}</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-xs text-slate-400">Total Cost</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">{formatCurrency(result.totalCostOfVehicle, currency)}</div>
            </div>
          </div>
        </div>
      }
      prosAndCons={{
        pros: [
          "Lowers out-of-pocket cash requirements through trade-in credits.",
          "Fixed predictable monthly payment schedule over 36 to 72 months.",
        ],
        cons: [
          "Vehicles depreciate quickly (15%-20% in year one), creating potential underwater loan risk.",
          "Long 72 or 84 month terms significantly increase overall interest expense.",
        ],
      }}
      faqs={[
        {
          question: "Is it better to put more money down on a car loan?",
          answer: "Yes! Putting 20% down minimizes total interest, prevents negative equity ('being underwater'), and qualifies you for better lender APR tiers.",
        },
        {
          question: "Should I choose a 48, 60, or 72 month auto loan?",
          answer: "A 60-month loan offers a healthy balance between manageable monthly payments and reasonable total interest. Avoid 72 or 84 month loans when possible.",
        },
      ]}
      relatedTools={[
        { name: "Mortgage Calculator", href: "/calculators/mortgage", desc: "Calculate home loan options" },
        { name: "Debt Payoff Planner", href: "/calculators/debt-payoff", desc: "Pay off auto loans early" },
        { name: "Budget Planner", href: "/calculators/budget", desc: "Determine how much car payment fits your budget" },
      ]}
      calculatorNode={
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <GlassCard className="lg:col-span-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <Car className="w-5 h-5 text-[#6D5DF6]" /> Auto Loan Details
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Vehicle Price ($)</label>
              <input
                type="number"
                value={input.vehiclePrice}
                onChange={(e) => setInput({ ...input, vehiclePrice: Number(e.target.value) || 0 })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Cash Down ($)</label>
                <input
                  type="number"
                  value={input.downPayment}
                  onChange={(e) => setInput({ ...input, downPayment: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-900 dark:text-white text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Trade-In Allowance ($)</label>
                <input
                  type="number"
                  value={input.tradeInValue}
                  onChange={(e) => setInput({ ...input, tradeInValue: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-900 dark:text-white text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Sales Tax (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={input.salesTaxPercent}
                  onChange={(e) => setInput({ ...input, salesTaxPercent: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-900 dark:text-white text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Interest APR (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={input.interestRate}
                  onChange={(e) => setInput({ ...input, interestRate: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-900 dark:text-white text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Term (Months)</label>
                <select
                  value={input.loanTermMonths}
                  onChange={(e) => setInput({ ...input, loanTermMonths: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-900 dark:text-white text-sm"
                >
                  <option value={36}>36 Mos</option>
                  <option value={48}>48 Mos</option>
                  <option value={60}>60 Mos</option>
                  <option value={72}>72 Mos</option>
                  <option value={84}>84 Mos</option>
                </select>
              </div>
            </div>
          </GlassCard>

          <div className="lg:col-span-6 space-y-6">
            <GlassCard gradient className="p-8 text-center border-2 border-indigo-500/20">
              <div className="text-xs font-bold uppercase tracking-widest text-[#6D5DF6]">Estimated Monthly EMI</div>
              <div className="text-4xl sm:text-5xl font-extrabold text-slate-950 dark:text-white mt-2">
                <AnimatedNumber value={result.monthlyEMI} formatFn={(val) => `${formatCurrency(val, currency)}/mo`} />
              </div>
            </GlassCard>

            <div className="grid grid-cols-2 gap-4">
              <GlassCard className="p-5 text-center">
                <div className="text-xs text-slate-400 font-semibold">Net Loan Financed</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">{formatCurrency(result.totalLoanAmount, currency)}</div>
              </GlassCard>

              <GlassCard className="p-5 text-center">
                <div className="text-xs text-slate-400 font-semibold">Total Interest Paid</div>
                <div className="text-lg font-bold text-amber-600 mt-1">{formatCurrency(result.totalInterestPaid, currency)}</div>
              </GlassCard>
            </div>
          </div>
        </div>
      }
    />
  );
}
