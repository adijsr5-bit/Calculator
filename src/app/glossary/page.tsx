"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Search, BookMarked } from "lucide-react";

export default function GlossaryPage() {
  const [search, setSearch] = useState("");

  const terms = [
    { term: "Amortization", def: "The schedule of paying off a debt with fixed regular payments over time, divided between principal and interest." },
    { term: "APR (Annual Percentage Rate)", def: "The annual cost of borrowing money, including interest rate and lender origination fees expressed as a percentage." },
    { term: "Compound Interest", def: "Interest calculated on both the initial principal balance and the accumulated interest of previous periods." },
    { term: "Debt Avalanche", def: "Debt payoff strategy prioritizing extra payments toward the highest interest rate APR debt target." },
    { term: "Debt Snowball", def: "Debt payoff strategy focusing extra payments on the smallest balance debt first to build momentum." },
    { term: "FICO Score", def: "The standard 300 to 850 credit rating model used by 90%+ of major financial institutions." },
    { term: "PMI (Private Mortgage Insurance)", def: "Insurance required on conventional mortgages when down payments are under 20%." },
    { term: "Roth IRA", def: "Individual retirement account funded with after-tax dollars offering 100% tax-free growth and withdrawals." },
    { term: "Zero-Based Budget", def: "Budgeting technique where income minus all expenses, savings, and debt equals exactly zero." },
  ];

  const filtered = terms.filter(
    (t) =>
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.def.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-[#6D5DF6] text-xs font-semibold">
          <BookMarked className="w-3.5 h-3.5" /> Financial Dictionary
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          Financial Terms Glossary
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          Plain-English definitions of essential financial terms, formulas, and investment terminology.
        </p>

        <div className="relative max-w-md mx-auto pt-2">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search financial terms..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border font-semibold text-sm outline-none focus:ring-2 focus:ring-[#6D5DF6]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, idx) => (
          <GlassCard key={idx} className="p-6 space-y-2">
            <h3 className="font-bold text-[#6D5DF6] text-lg">{item.term}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.def}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
