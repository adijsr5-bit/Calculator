import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Effective Date: July 24, 2026</p>
      </div>

      <GlassCard className="p-8 prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-4">
        <h2>1. Information We Collect</h2>
        <p>ValuePilot Finance prioritizes user privacy. All mathematical calculations, mortgage numbers, and debt entries are processed locally inside your web browser. We do not store or sell your sensitive financial input parameters on external database servers.</p>

        <h2>2. Cookies & Local Storage</h2>
        <p>We utilize standard browser LocalStorage to persist calculation history and user UI preferences (such as dark mode and currency choices) directly on your device.</p>

        <h2>3. Google AdSense & Third-Party Advertising</h2>
        <p>We may display Google AdSense advertisements. Google uses cookies to serve ads based on user prior visits to our website. Users may opt out of personalized advertising by visiting Google Ad Settings.</p>
      </GlassCard>
    </div>
  );
}
