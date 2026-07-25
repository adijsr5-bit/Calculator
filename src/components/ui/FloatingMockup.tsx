"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck, Zap, ArrowRight, Home, CreditCard, PiggyBank, Sparkles, CheckCircle2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useCurrency } from "@/context/CurrencyContext";
import Link from "next/link";

export function FloatingMockup() {
  const { currency } = useCurrency();
  const [activeTab, setActiveTab] = useState<"mortgage" | "debt" | "wealth">("mortgage");

  // Interactive Sliders State
  const [mortgageVal, setMortgageVal] = useState<number>(400000);
  const [downPercent, setDownPercent] = useState<number>(20);

  const [debtAmount, setDebtAmount] = useState<number>(25000);
  const [extraPayment, setExtraPayment] = useState<number>(300);

  const [monthlySave, setMonthlySave] = useState<number>(750);
  const [saveYears, setSaveYears] = useState<number>(10);

  // Amortization & Growth Computations
  const loanVal = mortgageVal * (1 - downPercent / 100);
  const rMort = 0.065 / 12;
  const mortgageMonthly = Math.round((loanVal * (rMort * Math.pow(1 + rMort, 360))) / (Math.pow(1 + rMort, 360) - 1));

  const debtMonths = Math.max(6, Math.ceil(debtAmount / (500 + extraPayment)));
  const interestSaved = Math.round(debtAmount * 0.22 * (extraPayment / 250));

  const rWealth = 0.08 / 12;
  const nWealth = saveYears * 12;
  const wealthResult = Math.round(monthlySave * ((Math.pow(1 + rWealth, nWealth) - 1) / rWealth));

  return (
    <div className="relative w-full max-w-md mx-auto py-3">
      {/* Soft Purple Glow Ambient Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#6D5DF6]/20 rounded-full blur-3xl pointer-events-none" />

      {/* FLOATING STATUS BADGE 1: Top Right */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-3 -right-2 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-purple-100 dark:border-slate-800 px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-white"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[#6D5DF6]">Live Math Engine</span>
      </motion.div>

      {/* FLOATING STATUS BADGE 2: Bottom Left */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-3 -left-2 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-purple-100 dark:border-slate-800 px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300"
      >
        <ShieldCheck className="w-3.5 h-3.5 text-[#6D5DF6]" /> Bank-Grade Security
      </motion.div>

      {/* MAIN PURPLE GLASS CARD CONTAINER */}
      <div className="relative z-20 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-purple-100/90 dark:border-slate-800 p-6 shadow-xl shadow-purple-500/10 space-y-5">
        {/* Sleek Tab Navigation */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl w-full">
            <button
              onClick={() => setActiveTab("mortgage")}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                activeTab === "mortgage"
                  ? "bg-[#6D5DF6] text-white shadow-purple"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
              }`}
            >
              <Home className="w-3.5 h-3.5" /> Mortgage
            </button>
            <button
              onClick={() => setActiveTab("debt")}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                activeTab === "debt"
                  ? "bg-[#6D5DF6] text-white shadow-purple"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" /> Debt Free
            </button>
            <button
              onClick={() => setActiveTab("wealth")}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                activeTab === "wealth"
                  ? "bg-[#6D5DF6] text-white shadow-purple"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
              }`}
            >
              <PiggyBank className="w-3.5 h-3.5" /> Growth
            </button>
          </div>
        </div>

        {/* TAB 1: MORTGAGE */}
        {activeTab === "mortgage" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="p-4 rounded-2xl purple-gradient-card flex items-center justify-between shadow-md">
              <div>
                <div className="text-xs text-purple-200 font-medium">Estimated Monthly PITI</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                  {formatCurrency(mortgageMonthly, currency)}<span className="text-xs text-purple-200 font-normal">/mo</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-purple-200">Financed Loan</div>
                <div className="text-xs font-bold text-white mt-0.5">{formatCurrency(loanVal, currency)}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span>Home Purchase Price</span>
                  <span className="text-[#6D5DF6]">{formatCurrency(mortgageVal, currency)}</span>
                </div>
                <input
                  type="range"
                  min="150000"
                  max="1000000"
                  step="25000"
                  value={mortgageVal}
                  onChange={(e) => setMortgageVal(Number(e.target.value))}
                  className="w-full accent-[#6D5DF6] cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span>Down Payment ({downPercent}%)</span>
                  <span className="text-slate-500">{formatCurrency((mortgageVal * downPercent) / 100, currency)}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="5"
                  value={downPercent}
                  onChange={(e) => setDownPercent(Number(e.target.value))}
                  className="w-full accent-[#6D5DF6] cursor-pointer"
                />
              </div>
            </div>

            <Link
              href="/calculators/mortgage"
              className="w-full py-3 rounded-2xl bg-[#6D5DF6] hover:bg-[#583ef0] text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-2 group shadow-purple"
            >
              <span>Full Amortization Table</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        )}

        {/* TAB 2: DEBT PAYOFF */}
        {activeTab === "debt" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="p-4 rounded-2xl purple-gradient-card flex items-center justify-between shadow-md">
              <div>
                <div className="text-xs text-purple-200 font-medium">Debt Freedom Horizon</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                  {debtMonths} <span className="text-xs font-semibold text-purple-200">Months</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-purple-200">Interest Saved</div>
                <div className="text-xs font-bold text-emerald-300 mt-0.5">+{formatCurrency(interestSaved, currency)}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span>Total Debt Balance</span>
                  <span className="text-[#6D5DF6]">{formatCurrency(debtAmount, currency)}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="75000"
                  step="2500"
                  value={debtAmount}
                  onChange={(e) => setDebtAmount(Number(e.target.value))}
                  className="w-full accent-[#6D5DF6] cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span>Extra Payoff Budget</span>
                  <span className="text-emerald-600 font-extrabold">+{formatCurrency(extraPayment, currency)}/mo</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="50"
                  value={extraPayment}
                  onChange={(e) => setExtraPayment(Number(e.target.value))}
                  className="w-full accent-[#6D5DF6] cursor-pointer"
                />
              </div>
            </div>

            <Link
              href="/calculators/debt-payoff"
              className="w-full py-3 rounded-2xl bg-[#6D5DF6] hover:bg-[#583ef0] text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-2 group shadow-purple"
            >
              <span>Calculate Avalanche Strategy</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        )}

        {/* TAB 3: WEALTH GROWTH */}
        {activeTab === "wealth" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="p-4 rounded-2xl purple-gradient-card flex items-center justify-between shadow-md">
              <div>
                <div className="text-xs text-purple-200 font-medium">Future Wealth Pot</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                  {formatCurrency(wealthResult, currency)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-purple-200">Compound APY</div>
                <div className="text-xs font-bold text-emerald-300 mt-0.5">8.0% / year</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span>Monthly Contribution</span>
                  <span className="text-[#6D5DF6]">{formatCurrency(monthlySave, currency)}/mo</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="3000"
                  step="100"
                  value={monthlySave}
                  onChange={(e) => setMonthlySave(Number(e.target.value))}
                  className="w-full accent-[#6D5DF6] cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span>Growth Duration</span>
                  <span className="text-slate-500">{saveYears} Years</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="25"
                  step="1"
                  value={saveYears}
                  onChange={(e) => setSaveYears(Number(e.target.value))}
                  className="w-full accent-[#6D5DF6] cursor-pointer"
                />
              </div>
            </div>

            <Link
              href="/calculators/retirement"
              className="w-full py-3 rounded-2xl bg-[#6D5DF6] hover:bg-[#583ef0] text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-2 group shadow-purple"
            >
              <span>Compound Wealth Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
