"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Mail, MessageSquare, Send, CheckCircle2, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-[#6D5DF6] text-xs font-semibold">
          <Mail className="w-4 h-4" /> Support & Inquiries
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          Get in Touch
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          Have a feature request, calculation inquiry, or partnership question? Send us a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <GlassCard className="lg:col-span-7 p-8 space-y-6">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">Send Us a Message</h2>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 space-y-2 text-center border border-emerald-200">
              <CheckCircle2 className="w-8 h-8 mx-auto" />
              <h3 className="font-bold text-lg">Message Sent Successfully!</h3>
              <p className="text-xs">Our financial team will review your inquiry and respond within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm font-semibold outline-none focus:ring-2 focus:ring-[#6D5DF6]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm font-semibold outline-none focus:ring-2 focus:ring-[#6D5DF6]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm font-semibold outline-none focus:ring-2 focus:ring-[#6D5DF6]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm font-semibold outline-none focus:ring-2 focus:ring-[#6D5DF6]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#6D5DF6] hover:bg-[#583ef0] text-white font-bold text-sm shadow-purple transition-all flex items-center justify-center gap-2"
              >
                Submit Message <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </GlassCard>

        {/* Right Info */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard className="p-6 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Contact Information</h3>
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#6D5DF6]" />
                <span>support@valuepilotfinance.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#6D5DF6]" />
                <span>+1 (800) 555-TRUE</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#6D5DF6]" />
                <span>100 Financial Plaza, Suite 400, New York, NY 10005</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
