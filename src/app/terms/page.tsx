import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";

export default function TermsPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white">Terms of Service</h1>
        <p className="text-xs text-slate-400">Effective Date: July 24, 2026</p>
      </div>

      <GlassCard className="p-8 prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-4">
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing ValuePilot Finance, you agree to comply with and be bound by these Terms of Service. If you disagree with any part of these terms, you must discontinue website usage immediately.</p>

        <h2>2. Educational Calculations Only</h2>
        <p>ValuePilot Finance calculators provide mathematical estimations based on standardized formulas. They do not constitute a formal loan commitment, mortgage pre-approval, or certified financial advice.</p>
      </GlassCard>
    </div>
  );
}
