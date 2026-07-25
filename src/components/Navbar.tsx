"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  TrendingUp,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { CurrencySelector } from "@/components/ui/CurrencySelector";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setToolsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setToolsDropdownOpen(false);
    }, 250); // 250ms buffer prevents accidental closing when moving cursor
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setToolsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const calculatorLinks = [
    { name: "Mortgage Calculator", href: "/calculators/mortgage", desc: "Principal, Interest, Tax & HOA" },
    { name: "Refinance Calculator", href: "/calculators/refinance", desc: "Break-even & rate comparison" },
    { name: "Car Loan Calculator", href: "/calculators/car-loan", desc: "Trade-in, Tax & Monthly EMI" },
    { name: "Debt Payoff Planner", href: "/calculators/debt-payoff", desc: "Snowball vs Avalanche strategies" },
    { name: "Budget Planner", href: "/calculators/budget", desc: "50/30/20 rule & expense breakdown" },
    { name: "Tax Refund Estimator", href: "/calculators/tax-refund", desc: "Federal tax brackets & deductions" },
    { name: "Retirement Growth", href: "/calculators/retirement", desc: "Inflation adjusted compound growth" },
    { name: "401(k) Match Calculator", href: "/calculators/401k", desc: "Employer match & salary increase" },
    { name: "Traditional vs Roth IRA", href: "/calculators/ira", desc: "Tax savings now vs retirement" },
    { name: "Net Worth Tracker", href: "/calculators/net-worth", desc: "Assets vs Liabilities balance sheet" },
  ];

  return (
    <header className="fixed top-2 sm:top-4 left-0 right-0 z-50 px-2.5 sm:px-6 lg:px-8 w-full max-w-full">
      <div className="max-w-6xl mx-auto rounded-2xl sm:rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-purple-100/90 dark:border-slate-800 shadow-lg shadow-purple-500/5 px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all w-full">
        {/* Brand Logo */}
        <Link href="/" aria-label="ValuePilot Home" className="flex items-center gap-2 group">
          <img
            src="/logo.png"
            alt="ValuePilot - Plan Better. Calculate Smarter."
            width={140}
            height={36}
            decoding="async"
            className="h-8 sm:h-9 w-auto object-contain group-hover:scale-105 transition-transform"
          />
        </Link>

        {/* Desktop Nav Items */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-700 dark:text-slate-200">
          <Link href="/" className="hover:text-[#6D5DF6] transition-colors py-2">
            Home
          </Link>

          {/* Smooth Non-Flickering Calculators Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              aria-label="Open financial calculators menu"
              aria-expanded={toolsDropdownOpen}
              className="flex items-center gap-1.5 hover:text-[#6D5DF6] transition-colors py-2 font-bold"
              onClick={() => setToolsDropdownOpen((prev) => !prev)}
            >
              Calculators
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  toolsDropdownOpen ? "rotate-180 text-[#6D5DF6]" : ""
                }`}
              />
            </button>

            {toolsDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                <div className="w-[580px] bg-white/95 dark:bg-slate-900/95 border border-purple-100 dark:border-slate-800 rounded-3xl p-4 shadow-2xl backdrop-blur-2xl grid grid-cols-2 gap-2">
                  {calculatorLinks.map((calc, i) => (
                    <Link
                      key={i}
                      href={calc.href}
                      onClick={() => setToolsDropdownOpen(false)}
                      className="p-3 rounded-2xl hover:bg-[#F5F3FF] dark:hover:bg-slate-800/60 transition-colors group/item"
                    >
                      <div className="font-bold text-slate-900 dark:text-white group-hover/item:text-[#6D5DF6] transition-colors text-xs flex items-center justify-between">
                        <span>{calc.name}</span>
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all text-[#6D5DF6]" />
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{calc.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/guides/credit-score" className="hover:text-[#6D5DF6] transition-colors py-2">
            Credit Guide
          </Link>

          <Link href="/blog" className="hover:text-[#6D5DF6] transition-colors py-2">
            Blog
          </Link>

          <Link href="/about" className="hover:text-[#6D5DF6] transition-colors py-2">
            About
          </Link>
        </nav>

        {/* Right CTA & Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <CurrencySelector />
          <ThemeToggle />
          <Link
            href="/calculators/mortgage"
            className="px-5 py-2.5 rounded-full bg-[#6D5DF6] hover:bg-[#583ef0] text-white text-xs font-bold shadow-purple transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group"
          >
            Get Started Free
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-3 h-3 text-white" />
            </span>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <nav aria-label="Mobile Navigation" role="navigation" className="md:hidden mt-2 bg-white/95 dark:bg-slate-900/95 border border-purple-100 dark:border-slate-800 rounded-3xl p-5 space-y-4 shadow-2xl backdrop-blur-2xl max-h-[80vh] overflow-y-auto animate-in fade-in slide-in-from-top-3 duration-300">
          {/* Quick Controls Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Currency:</span>
              <CurrencySelector />
            </div>
            <Link
              href="/calculators/mortgage"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-1.5 rounded-full bg-[#6D5DF6] text-white text-xs font-bold shadow-purple flex items-center gap-1"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Primary Page Navigation Pills */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 hover:bg-[#F5F3FF] dark:hover:bg-slate-700 transition-all border border-slate-100 dark:border-slate-800"
            >
              <div className="p-1.5 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-[#6D5DF6]">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <span>Home</span>
            </Link>
            <Link
              href="/guides/credit-score"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 hover:bg-[#F5F3FF] dark:hover:bg-slate-700 transition-all border border-slate-100 dark:border-slate-800"
            >
              <div className="p-1.5 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600">
                <ChevronRight className="w-3.5 h-3.5 text-[#6D5DF6]" />
              </div>
              <span>Credit Guide</span>
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 hover:bg-[#F5F3FF] dark:hover:bg-slate-700 transition-all border border-slate-100 dark:border-slate-800"
            >
              <div className="p-1.5 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <span>Blog (50 Guides)</span>
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 hover:bg-[#F5F3FF] dark:hover:bg-slate-700 transition-all border border-slate-100 dark:border-slate-800"
            >
              <div className="p-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <span>About Us</span>
            </Link>
          </div>

          {/* Financial Calculators Section */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="text-[11px] font-extrabold text-[#6D5DF6] uppercase tracking-wider">
              Financial Calculator Suite
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {calculatorLinks.map((calc, idx) => (
                <Link
                  key={idx}
                  href={calc.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 hover:bg-[#F5F3FF] dark:hover:bg-slate-800 transition-all flex items-center justify-between border border-slate-100/80 dark:border-slate-800 group"
                >
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-[#6D5DF6] transition-colors">
                      {calc.name}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                      {calc.desc}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#6D5DF6] group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
