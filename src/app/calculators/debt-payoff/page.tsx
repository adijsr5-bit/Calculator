"use client";

import React, { useState, useMemo } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { useCurrency } from "@/context/CurrencyContext";
import { formatCurrency } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import {
  CreditCard,
  Plus,
  Trash2,
  Zap,
  Award,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  ChevronRight,
  DollarSign,
  X,
} from "lucide-react";
import Link from "next/link";

export interface DebtItem {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minPayment: number;
}

export default function DebtPayoffPlannerPage() {
  const { currency } = useCurrency();

  const [debts, setDebts] = useState<DebtItem[]>([
    { id: "1", name: "Credit Card", balance: 5450, interestRate: 23.99, minPayment: 160 },
    { id: "2", name: "Personal Loan", balance: 8200, interestRate: 14.50, minPayment: 220 },
    { id: "3", name: "Car Loan", balance: 7800, interestRate: 6.99, minPayment: 270 },
    { id: "4", name: "Student Loan", balance: 3200, interestRate: 4.50, minPayment: 200 },
  ]);

  const [extraPayment, setExtraPayment] = useState<number>(200);
  const [lumpSumPayment, setLumpSumPayment] = useState<number>(0);
  const [selectedStrategy, setSelectedStrategy] = useState<"avalanche" | "snowball">("avalanche");
  
  // Modals State
  const [showViewDetailsModal, setShowViewDetailsModal] = useState(false);
  const [showLumpSumModal, setShowLumpSumModal] = useState(false);
  const [tempLumpSumInput, setTempLumpSumInput] = useState<string>("1000");

  // Smooth scroll to planner section
  const scrollToPlanner = () => {
    document.getElementById("planner-section")?.scrollIntoView({ behavior: "smooth" });
  };

  // Full Mathematical Simulation Engine
  const simulation = useMemo(() => {
    if (debts.length === 0) {
      return {
        months: 0,
        totalInterestPaid: 0,
        debtFreeDateStr: "N/A",
        yearlyBalances: [],
        payoffOrder: [],
        interestSaved: 0,
      };
    }

    const runSimulation = (strat: "snowball" | "avalanche", applyLumpSum = 0) => {
      let list = debts.map((d) => ({ ...d }));

      // Apply lump sum payment upfront to top priority debt
      if (applyLumpSum > 0) {
        list.sort((a, b) => (strat === "snowball" ? a.balance - b.balance : b.interestRate - a.interestRate));
        let remainingLump = applyLumpSum;
        for (const item of list) {
          if (item.balance > 0 && remainingLump > 0) {
            const pay = Math.min(item.balance, remainingLump);
            item.balance -= pay;
            remainingLump -= pay;
          }
        }
      }

      let months = 0;
      let totalInterest = 0;
      const yearlyMap: Record<number, number> = {};
      const startYear = new Date().getFullYear();

      const totalInitialBalance = list.reduce((acc, curr) => acc + curr.balance, 0);
      yearlyMap[startYear] = totalInitialBalance;

      while (list.some((d) => d.balance > 0) && months < 360) {
        months++;
        list.sort((a, b) => (strat === "snowball" ? a.balance - b.balance : b.interestRate - a.interestRate));

        let extraBudget = extraPayment;

        // Apply monthly interest & min payments
        for (const d of list) {
          if (d.balance > 0) {
            const mInterest = (d.balance * (d.interestRate / 100)) / 12;
            d.balance += mInterest;
            totalInterest += mInterest;

            const mPay = Math.min(d.balance, d.minPayment);
            d.balance -= mPay;
          }
        }

        // Apply extra budget to top debt
        for (const d of list) {
          if (d.balance > 0 && extraBudget > 0) {
            const extraPay = Math.min(d.balance, extraBudget);
            d.balance -= extraPay;
            extraBudget -= extraPay;
          }
        }

        const currentYr = startYear + Math.floor(months / 12);
        const currentBalSum = list.reduce((acc, curr) => acc + curr.balance, 0);
        if (!yearlyMap[currentYr] || currentBalSum < yearlyMap[currentYr]) {
          yearlyMap[currentYr] = Math.round(currentBalSum);
        }
      }

      return { months, totalInterest: Math.round(totalInterest), yearlyMap };
    };

    // Active Strategy Simulation with lump sum
    const active = runSimulation(selectedStrategy, lumpSumPayment);

    // Minimum Only Simulation (Baseline comparison)
    const minOnly = runSimulation("avalanche", 0);

    // Compute exact target date string
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + active.months);
    const debtFreeDateStr = futureDate.toLocaleDateString("en-US", { month: "short", year: "numeric" });

    // Format chart curve data array
    const yearlyBalances = Object.keys(active.yearlyMap).map((yr) => ({
      year: yr,
      balance: active.yearlyMap[Number(yr)],
    }));

    // Payoff Order priority list
    const sortedList = [...debts].sort((a, b) =>
      selectedStrategy === "snowball" ? a.balance - b.balance : b.interestRate - a.interestRate
    );

    return {
      months: active.months,
      totalInterestPaid: active.totalInterest,
      debtFreeDateStr,
      yearlyBalances,
      payoffOrder: sortedList,
      interestSaved: Math.max(0, minOnly.totalInterest - active.totalInterest),
    };
  }, [debts, extraPayment, selectedStrategy, lumpSumPayment]);

  const totalDebt = debts.reduce((sum, d) => sum + d.balance, 0);
  const totalMinPayment = debts.reduce((sum, d) => sum + d.minPayment, 0);
  const totalMonthlyCommitment = totalMinPayment + extraPayment;

  const addDebt = () => {
    const newId = (debts.length + 1).toString();
    setDebts([
      ...debts,
      { id: newId, name: `Debt #${newId}`, balance: 3000, interestRate: 12.0, minPayment: 100 },
    ]);
  };

  const removeDebt = (id: string) => {
    setDebts(debts.filter((d) => d.id !== id));
  };

  const updateDebt = (id: string, field: keyof DebtItem, val: string | number) => {
    setDebts(
      debts.map((d) => (d.id === id ? { ...d, [field]: typeof val === "number" ? val : val } : d))
    );
  };

  const handleApplyLumpSum = () => {
    const amount = Number(tempLumpSumInput) || 0;
    setLumpSumPayment(amount);
    setShowLumpSumModal(false);
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <Link href="/" className="hover:text-[#6D5DF6]">Home</Link>
        <span>/</span>
        <span>Calculators</span>
        <span>/</span>
        <span className="text-[#6D5DF6]">Debt Payoff Planner</span>
      </div>

      {/* TOP HERO DASHBOARD BANNER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-[#6D5DF6] text-xs font-bold">
            Plan Smarter. Pay Off Faster.
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
            Debt Freedom <br />
            <span className="text-[#6D5DF6]">Starts Today.</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg font-medium">
            Create a smart payoff strategy using Snowball or Avalanche methods and become debt free faster.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Start Planning Scroll Button */}
            <button
              onClick={scrollToPlanner}
              className="px-7 py-4 rounded-full bg-[#6D5DF6] hover:bg-[#583ef0] text-white font-bold text-sm shadow-purple flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Start Planning <ArrowRight className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => setShowLumpSumModal(true)}
              className="px-6 py-4 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 text-emerald-600 dark:text-emerald-400 font-bold text-sm hover:bg-emerald-100 transition-all flex items-center gap-2"
            >
              <DollarSign className="w-4 h-4" /> Add One-Time Pay Now
            </button>
          </div>

          <div className="flex items-center gap-3 pt-2 text-xs text-slate-500 font-medium">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#6D5DF6] text-white font-bold flex items-center justify-center border-2 border-white text-xs">JS</div>
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center border-2 border-white text-xs">AK</div>
              <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center border-2 border-white text-xs">MP</div>
            </div>
            <div>
              <div className="text-amber-500 font-bold">★★★★★ 4.9/5</div>
              <span>Trusted by 250K+ users</span>
            </div>
          </div>
        </div>

        {/* Right Header Widget: Debt Overview */}
        <GlassCard className="lg:col-span-6 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 dark:text-white text-sm">Your Debt Overview</span>
            <span className="text-xs text-slate-400 font-semibold bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">Active Planner</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#F5F3FF] dark:bg-slate-800/60">
              <div className="text-xs text-slate-400 font-medium">Total Remaining Debt</div>
              <div className="text-2xl font-extrabold text-slate-950 dark:text-white mt-1">
                <AnimatedNumber value={totalDebt} formatFn={(val) => formatCurrency(val, currency)} />
              </div>
              <div className="text-[11px] font-bold text-emerald-600 flex items-center mt-1">↓ 12% vs last month</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F5F3FF] dark:bg-slate-800/60">
              <div className="text-xs text-slate-400 font-medium">Monthly Commitment</div>
              <div className="text-2xl font-extrabold text-slate-950 dark:text-white mt-1">
                <AnimatedNumber value={totalMonthlyCommitment} formatFn={(val) => formatCurrency(val, currency)} />
              </div>
              <div className="text-[11px] font-bold text-[#6D5DF6] flex items-center mt-1">Includes ${extraPayment}/mo Extra</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-purple-100 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-4 border-[#6D5DF6] flex items-center justify-center font-bold text-xs text-[#6D5DF6]">
                {simulation.months > 0 ? `${Math.round((1 - simulation.months / 60) * 100)}%` : "100%"}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">Debt Freedom Target</div>
                <div className="text-[11px] text-slate-400">Est. Freedom Date: <span className="font-bold text-[#6D5DF6]">{simulation.debtFreeDateStr}</span></div>
              </div>
            </div>
            <button
              onClick={() => setShowViewDetailsModal(true)}
              className="px-3.5 py-1.5 rounded-full bg-[#6D5DF6] text-white text-xs font-bold shadow-purple hover:bg-[#583ef0] transition-colors"
            >
              View Schedule
            </button>
          </div>
        </GlassCard>
      </div>

      {/* CORE CALCULATOR SECTION */}
      <div id="planner-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
        {/* Left Side: Your Debts Input List & Sliders */}
        <GlassCard className="lg:col-span-5 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#6D5DF6]" /> Your Debts Input
            </h2>
            <button
              onClick={addDebt}
              className="flex items-center gap-1 text-xs font-bold text-white bg-[#6D5DF6] hover:bg-[#583ef0] px-3 py-1.5 rounded-xl transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Add Debt
            </button>
          </div>

          {/* Extra Monthly Payment Budget Slider */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40 space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-900 dark:text-white">
              <span>Extra Monthly Payoff Budget</span>
              <span className="text-[#6D5DF6] font-extrabold">{formatCurrency(extraPayment, currency)}/mo</span>
            </div>
            <input
              type="range"
              aria-label="Extra Monthly Payoff Budget Slider"
              min="0"
              max="2000"
              step="25"
              value={extraPayment}
              onChange={(e) => setExtraPayment(Number(e.target.value))}
              className="w-full accent-[#6D5DF6] cursor-pointer"
            />
          </div>

          {/* Lump Sum Applied Indicator */}
          {lumpSumPayment > 0 && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-xs flex items-center justify-between text-emerald-700 dark:text-emerald-400">
              <span className="font-bold">One-Time Lump Sum Applied: {formatCurrency(lumpSumPayment, currency)}</span>
              <button onClick={() => setLumpSumPayment(0)} className="text-emerald-600 underline font-semibold">Remove</button>
            </div>
          )}

          {/* Debts Table Inputs */}
          <div className="space-y-3.5 max-h-[440px] overflow-y-auto pr-1">
            {debts.map((debt, idx) => {
              const badgeColors = [
                "bg-purple-100 text-[#6D5DF6] dark:bg-purple-950/60 dark:text-purple-300",
                "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
                "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
                "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
              ];
              const badgeStyle = badgeColors[idx % badgeColors.length];

              return (
                <div
                  key={debt.id}
                  className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${badgeStyle}`}>
                        Account #{idx + 1}
                      </span>
                      <input
                        type="text"
                        value={debt.name}
                        onChange={(e) => updateDebt(debt.id, "name", e.target.value)}
                        className="font-extrabold text-slate-900 dark:text-white text-sm bg-transparent border-b border-transparent focus:border-[#6D5DF6] outline-none"
                      />
                    </div>
                    <button
                      onClick={() => removeDebt(debt.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      title="Remove debt"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 text-xs">
                    {/* Balance Input with cute $ badge */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold block">Balance</label>
                      <div className="relative flex items-center group">
                        <div className="absolute left-2 w-5 h-5 rounded-lg bg-purple-100 dark:bg-purple-950/80 text-[#6D5DF6] font-black text-[10px] flex items-center justify-center pointer-events-none group-focus-within:bg-[#6D5DF6] group-focus-within:text-white transition-colors">
                          $
                        </div>
                        <input
                          type="number"
                          value={debt.balance === 0 ? "" : debt.balance}
                          onChange={(e) => updateDebt(debt.id, "balance", Number(e.target.value) || 0)}
                          className="w-full bg-[#F5F3FF]/70 dark:bg-slate-800/60 pl-8 pr-2 py-2 rounded-2xl border-2 border-purple-100/80 dark:border-slate-700/80 font-black text-slate-900 dark:text-white text-xs hover:border-[#6D5DF6]/40 focus:outline-none focus:border-[#6D5DF6] focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-[#6D5DF6]/15 transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    {/* APR Input with cute % badge */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold block">APR</label>
                      <div className="relative flex items-center group">
                        <input
                          type="number"
                          step="0.01"
                          value={debt.interestRate === 0 ? "" : debt.interestRate}
                          onChange={(e) => updateDebt(debt.id, "interestRate", Number(e.target.value) || 0)}
                          className="w-full bg-[#F5F3FF]/70 dark:bg-slate-800/60 pl-2.5 pr-8 py-2 rounded-2xl border-2 border-purple-100/80 dark:border-slate-700/80 font-black text-slate-900 dark:text-white text-xs hover:border-[#6D5DF6]/40 focus:outline-none focus:border-[#6D5DF6] focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-[#6D5DF6]/15 transition-all shadow-sm"
                        />
                        <div className="absolute right-2 w-5 h-5 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 font-black text-[10px] flex items-center justify-center pointer-events-none group-focus-within:bg-amber-500 group-focus-within:text-white transition-colors">
                          %
                        </div>
                      </div>
                    </div>

                    {/* Min Pay Input with cute $ badge */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold block">Min Pay</label>
                      <div className="relative flex items-center group">
                        <div className="absolute left-2 w-5 h-5 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 font-black text-[10px] flex items-center justify-center pointer-events-none group-focus-within:bg-emerald-500 group-focus-within:text-white transition-colors">
                          $
                        </div>
                        <input
                          type="number"
                          value={debt.minPayment === 0 ? "" : debt.minPayment}
                          onChange={(e) => updateDebt(debt.id, "minPayment", Number(e.target.value) || 0)}
                          className="w-full bg-[#F5F3FF]/70 dark:bg-slate-800/60 pl-8 pr-2 py-2 rounded-2xl border-2 border-purple-100/80 dark:border-slate-700/80 font-black text-slate-900 dark:text-white text-xs hover:border-[#6D5DF6]/40 focus:outline-none focus:border-[#6D5DF6] focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-[#6D5DF6]/15 transition-all shadow-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={addDebt}
            className="w-full py-3 rounded-2xl border-2 border-dashed border-purple-200 dark:border-indigo-800 text-[#6D5DF6] font-bold text-xs hover:bg-[#F5F3FF] transition-colors flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Another Debt
          </button>
        </GlassCard>

        {/* Right Side: VIBRANT PURPLE PAYOFF PLAN CARD */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl p-6 sm:p-8 purple-gradient-card shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/20 pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-purple-200">Your Payoff Plan</span>
                <h3 className="text-xl font-bold text-white capitalize">{selectedStrategy} Strategy</h3>
              </div>

              {/* Strategy Selector Dropdown */}
              <select
                value={selectedStrategy}
                onChange={(e) => setSelectedStrategy(e.target.value as any)}
                className="px-3.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30 outline-none cursor-pointer"
              >
                <option value="avalanche" className="text-slate-900">Avalanche (Highest APR First) ▼</option>
                <option value="snowball" className="text-slate-900">Snowball (Lowest Balance First) ▼</option>
              </select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-purple-200 font-medium">Total Debt</div>
                <div className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  <AnimatedNumber value={totalDebt} formatFn={(val) => formatCurrency(val, currency)} />
                </div>
              </div>
              <div>
                <div className="text-xs text-purple-200 font-medium">Monthly Payment</div>
                <div className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  <AnimatedNumber value={totalMonthlyCommitment} formatFn={(val) => formatCurrency(val, currency)} />
                </div>
              </div>
              <div>
                <div className="text-xs text-purple-200 font-medium">Debt Free Date</div>
                <div className="text-xl sm:text-2xl font-extrabold text-white mt-1">{simulation.debtFreeDateStr}</div>
              </div>
              <div>
                <div className="text-xs text-purple-200 font-medium">Interest Saved</div>
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-300 mt-1">
                  <AnimatedNumber value={simulation.interestSaved} formatFn={(val) => formatCurrency(val, currency)} />
                </div>
              </div>
            </div>

            {/* Dynamic Balance Over Time Area Chart */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs text-purple-200 font-medium">
                <span>Balance Over Time</span>
                <button
                  onClick={() => setShowViewDetailsModal(true)}
                  className="text-white font-bold hover:underline bg-white/20 px-3 py-1 rounded-full"
                >
                  View Details
                </button>
              </div>
              <div className="h-48 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={simulation.yearlyBalances}>
                    <defs>
                      <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ffffff" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="year" stroke="#E2DDFE" tick={{ fontSize: 10 }} />
                    <YAxis stroke="#E2DDFE" tick={{ fontSize: 10 }} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                    <Tooltip
                      formatter={(v: any) => [formatCurrency(Number(v || 0), currency), "Balance"]}
                      labelFormatter={(label) => `Year ${label}`}
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
                    <Area type="monotone" dataKey="balance" stroke="#ffffff" strokeWidth={3} fill="url(#purpleGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Strategy Toggle Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setSelectedStrategy("avalanche")}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedStrategy === "avalanche"
                  ? "bg-[#F5F3FF] border-[#6D5DF6] ring-2 ring-[#6D5DF6]/20"
                  : "bg-white dark:bg-slate-900 border-slate-200"
              }`}
            >
              <div className="font-bold text-slate-900 dark:text-white text-xs flex items-center justify-between">
                <span>Avalanche Method</span>
                {selectedStrategy === "avalanche" && <CheckCircle2 className="w-4 h-4 text-[#6D5DF6]" />}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Saves max interest money ({formatCurrency(simulation.totalInterestPaid, currency)} total interest)</div>
            </button>

            <button
              onClick={() => setSelectedStrategy("snowball")}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedStrategy === "snowball"
                  ? "bg-[#F5F3FF] border-[#6D5DF6] ring-2 ring-[#6D5DF6]/20"
                  : "bg-white dark:bg-slate-900 border-slate-200"
              }`}
            >
              <div className="font-bold text-slate-900 dark:text-white text-xs flex items-center justify-between">
                <span>Snowball Method</span>
                {selectedStrategy === "snowball" && <CheckCircle2 className="w-4 h-4 text-[#6D5DF6]" />}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Pay smallest balance first for fast behavioral wins</div>
            </button>
          </div>
        </div>
      </div>

      {/* SMART INSIGHTS GRID */}
      <section className="space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-base">Smart Insights & Milestones</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <GlassCard className="p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-medium">Highest Interest Target</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                {simulation.payoffOrder[0]?.name || "None"} ({simulation.payoffOrder[0]?.interestRate || 0}%)
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#6D5DF6] flex items-center justify-center shrink-0 font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-medium">Extra Payoff Budget</div>
              <div className="text-sm font-bold text-[#6D5DF6]">+{formatCurrency(extraPayment, currency)} / month</div>
            </div>
          </GlassCard>

          <GlassCard className="p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-medium">Payoff Timeframe</div>
              <div className="text-sm font-bold text-emerald-600">{simulation.months} Months Total</div>
            </div>
          </GlassCard>

          <GlassCard className="p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-medium">Freedom Date</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">{simulation.debtFreeDateStr}</div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* MODAL 1: VIEW DETAILS BREAKDOWN MODAL */}
      {showViewDetailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Payoff Schedule Details</h3>
                <p className="text-xs text-slate-400">Step-by-step target execution plan ({selectedStrategy.toUpperCase()})</p>
              </div>
              <button onClick={() => setShowViewDetailsModal(false)} className="p-2 rounded-xl text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Priority Payoff Order</h4>
              {simulation.payoffOrder.map((debt, idx) => (
                <div key={debt.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#6D5DF6] text-white font-bold flex items-center justify-center text-xs">
                      #{idx + 1}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{debt.name}</div>
                      <div className="text-slate-400">{debt.interestRate}% APR</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900 dark:text-white">{formatCurrency(debt.balance, currency)}</div>
                    <div className="text-emerald-500 font-semibold">Priority Target</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-xs space-y-1">
              <div className="font-bold text-[#6D5DF6]">Summary Insight</div>
              <p className="text-slate-600 dark:text-slate-300">
                By maintaining your ${totalMinPayment}/month minimum payments and adding ${extraPayment}/month extra budget, your debt will be completely eliminated by <span className="font-bold text-slate-900 dark:text-white">{simulation.debtFreeDateStr}</span>!
              </p>
            </div>

            <button
              onClick={() => setShowViewDetailsModal(false)}
              className="w-full py-3 rounded-2xl bg-slate-900 text-white font-bold text-xs"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD ONE-TIME EXTRA LUMP SUM PAYMENT MODAL */}
      {showLumpSumModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-500" /> One-Time Extra Lump Sum
              </h3>
              <button onClick={() => setShowLumpSumModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Simulate applying an extra lump-sum payment (such as a tax refund, work bonus, or savings cash) directly to your debt principal today.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Lump Sum Amount ($)</label>
              <input
                type="number"
                value={tempLumpSumInput}
                onChange={(e) => setTempLumpSumInput(e.target.value)}
                placeholder="e.g. 1000"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border text-base font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-[#6D5DF6]"
              />
            </div>

            <div className="flex gap-2">
              {[500, 1000, 2500, 5000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setTempLumpSumInput(amt.toString())}
                  className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-indigo-50 hover:text-[#6D5DF6]"
                >
                  +${amt}
                </button>
              ))}
            </div>

            <button
              onClick={handleApplyLumpSum}
              className="w-full py-3.5 rounded-2xl bg-[#6D5DF6] hover:bg-[#583ef0] text-white font-bold text-sm shadow-purple"
            >
              Apply Extra Payment Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
