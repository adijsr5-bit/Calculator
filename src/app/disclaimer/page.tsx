import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ShieldAlert } from "lucide-react";

export default function DisclaimerPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 text-xs font-bold">
          <ShieldAlert className="w-4 h-4" /> Legal Financial Notice
        </div>
        <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white">Financial Disclaimer</h1>
      </div>

      <GlassCard className="p-8 prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-4">
        <h2>No Financial or Investment Advice</h2>
        <p>ValuePilot Finance is an independent educational tool publisher. The content, calculation outputs, amortization schedules, and guides presented across this website are provided strictly for informational purposes.</p>
        <p>We are not a licensed financial institution, mortgage broker, CPA, or registered investment advisor (RIA). Before making major financial commitments, consult a qualified Certified Financial Planner (CFP®) or tax professional.</p>
      </GlassCard>
    </div>
  );
}
