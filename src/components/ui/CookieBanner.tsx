"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, Check, ShieldCheck } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem("valuepilot_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("valuepilot_cookie_consent", "all");
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem("valuepilot_cookie_consent", "essential");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="p-5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-[#6D5DF6]">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                Privacy & Cookies <ShieldCheck className="w-4 h-4 text-emerald-500" />
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                GDPR & CCPA Compliant Notice
              </p>
            </div>
          </div>
          <button
            onClick={handleEssentialOnly}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          ValuePilot uses essential local storage & cookies to save your currency preferences and calculation history privately. We do not sell your personal data. Read our{" "}
          <Link href="/privacy" className="text-[#6D5DF6] font-bold hover:underline">
            Privacy Policy
          </Link>.
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2.5 pt-1">
          <button
            onClick={handleAcceptAll}
            aria-label="Accept all cookies and preferences"
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#6D5DF6] hover:bg-[#5b4be0] text-white text-xs font-bold shadow-md hover:shadow-purple transition-all flex items-center justify-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" /> Accept All
          </button>
          <button
            onClick={handleEssentialOnly}
            aria-label="Accept essential cookies only"
            className="py-2.5 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all"
          >
            Essential Only
          </button>
        </div>
      </div>
    </div>
  );
}
