import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Mail, Phone, MapPin, ShieldCheck, Clock, MessageSquare } from "lucide-react";
import { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us & Support | ValuePilot",
  description: "Get in touch with the ValuePilot financial engineering team for inquiries, feedback, or partnership questions.",
  alternates: {
    canonical: "https://valuepilot.vercel.app/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-[#6D5DF6] text-xs font-semibold">
          <Mail className="w-4 h-4" /> Support & Advisory Inquiries
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          Contact ValuePilot Team
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          Have a question regarding our financial calculators, calculation methodology, or editorial policies? Reach out to our advisory team below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <GlassCard className="lg:col-span-7 p-8 space-y-6">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#6D5DF6]" /> Send Us a Direct Message
          </h2>
          <ContactForm />
        </GlassCard>

        {/* Right Info */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard className="p-6 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Contact Information</h3>
            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-[#6D5DF6]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Email Address</div>
                  <div className="text-slate-500">support@valuepilotfinance.com</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Response Time</div>
                  <div className="text-slate-500">Within 24 business hours</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Headquarters</div>
                  <div className="text-slate-500">100 Financial Plaza, Suite 400, New York, NY 10005</div>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 space-y-3 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-slate-900 dark:to-indigo-950/30">
            <div className="flex items-center gap-2 text-xs font-bold text-[#6D5DF6]">
              <ShieldCheck className="w-4 h-4" /> 100% Privacy Commitment
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              We never share or sell your email address. Inquiries submitted via this form are handled confidentially by our internal editorial team.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
