"use client";

import React from "react";
import { useCurrency } from "@/context/CurrencyContext";
import { CurrencyCode, CURRENCY_SYMBOLS } from "@/lib/utils";
import { DollarSign } from "lucide-react";

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  const options: { code: CurrencyCode; label: string }[] = [
    { code: "USD", label: "$ USD" },
    { code: "EUR", label: "€ EUR" },
    { code: "GBP", label: "£ GBP" },
    { code: "INR", label: "₹ INR" },
    { code: "CAD", label: "CA$ CAD" },
    { code: "AUD", label: "A$ AUD" },
  ];

  return (
    <div className="relative inline-flex items-center">
      <label htmlFor="global-currency-select" className="sr-only">
        Select Currency
      </label>
      <select
        id="global-currency-select"
        value={currency}
        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
        className="appearance-none cursor-pointer bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 text-slate-900 dark:text-slate-100 text-xs font-semibold py-2 pl-3 pr-7 rounded-xl border border-slate-200/60 dark:border-slate-700 transition-all outline-none focus:ring-2 focus:ring-[#6D5DF6]"
        aria-label="Select Currency"
      >
        {options.map((opt) => (
          <option key={opt.code} value={opt.code} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            {opt.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2 text-slate-500 text-xs">▼</span>
    </div>
  );
}
