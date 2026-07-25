"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 space-y-2 text-center border border-emerald-200">
        <CheckCircle2 className="w-8 h-8 mx-auto" />
        <h3 className="font-bold text-lg">Message Sent Successfully!</h3>
        <p className="text-xs">Our financial team will review your inquiry and respond within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your Name</label>
          <input
            type="text"
            required
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#6D5DF6]"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
          <input
            type="email"
            required
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#6D5DF6]"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Subject</label>
        <input
          type="text"
          required
          placeholder="Calculation Inquiry / Feedback"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#6D5DF6]"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Message</label>
        <textarea
          rows={4}
          required
          placeholder="How can our financial team assist you today?"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#6D5DF6]"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3.5 rounded-2xl bg-[#6D5DF6] hover:bg-[#583ef0] text-white font-bold text-sm shadow-purple transition-all flex items-center justify-center gap-2"
      >
        Submit Message <Send className="w-4 h-4" />
      </button>
    </form>
  );
}
