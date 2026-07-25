"use client";

import React, { useState } from "react";
import { Sparkles, X, Send, Bot, User, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function AIAssistantModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: "user" | "ai"; text: string; link?: string; linkText?: string }>>([
    {
      sender: "ai",
      text: "Hello! I'm your ValuePilot AI Financial Assistant. Ask me anything about mortgages, debt avalanche strategies, tax brackets, or retirement planning!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    { label: "Which mortgage term saves interest?", query: "Is 15-year or 30-year mortgage better?" },
    { label: "Snowball vs Avalanche debt?", query: "Explain debt snowball versus avalanche method" },
    { label: "How to maximize 401(k) match?", query: "How does 401k employer match work?" },
    { label: "How to estimate tax refund?", query: "How to calculate tax refund estimate?" },
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { sender: "user" as const, text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let replyText = "Based on current financial principles, optimizing your debt interest and maximizing tax-advantaged accounts like a Roth IRA or 401(k) builds the strongest compound wealth over time.";
      let link = "/calculators/mortgage";
      let linkText = "Try Mortgage Calculator";

      const q = query.toLowerCase();
      if (q.includes("mortgage") || q.includes("15-year") || q.includes("house")) {
        replyText = "A 15-year mortgage has higher monthly payments but significantly lower interest rates and saves tens of thousands in interest over 30 years.";
        link = "/calculators/mortgage";
        linkText = "Open Mortgage Calculator";
      } else if (q.includes("snowball") || q.includes("avalanche") || q.includes("debt")) {
        replyText = "The Debt Avalanche strategy targets highest-interest debts first to save the maximum interest money, while Debt Snowball targets smallest balances for psychological momentum.";
        link = "/calculators/debt-payoff";
        linkText = "Calculate Debt Payoff";
      } else if (q.includes("401") || q.includes("ira") || q.includes("retire")) {
        replyText = "Always contribute at least up to your full employer match—it is 100% immediate return on investment!";
        link = "/calculators/401k";
        linkText = "Open 401(k) Calculator";
      } else if (q.includes("tax") || q.includes("deduction") || q.includes("refund")) {
        replyText = "Itemized deductions are worth taking only if your total qualifying expenses exceed the 2024 standard deduction ($14,600 Single / $29,200 Married).";
        link = "/calculators/tax-refund";
        linkText = "Estimate Tax Refund";
      }

      setMessages((prev) => [...prev, { sender: "ai", text: replyText, link, linkText }]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#6D5DF6] hover:bg-[#583ef0] text-white font-medium text-sm shadow-purple shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 group"
      >
        <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
        <span className="hidden sm:inline">AI Finance Advisor</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end p-0 sm:p-6 bg-slate-950/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full sm:max-w-md h-[90vh] sm:h-[650px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-[#6D5DF6] flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight">TruePath AI Advisor</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Instant financial calculations & guidance</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages Body */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-2.5 ${m.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                        m.sender === "user"
                          ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                          : "bg-[#6D5DF6] text-white"
                      }`}
                    >
                      {m.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-2xl p-3.5 ${
                        m.sender === "user"
                          ? "bg-[#6D5DF6] text-white rounded-tr-none"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none"
                      }`}
                    >
                      <p className="leading-relaxed">{m.text}</p>
                      {m.link && (
                        <Link
                          href={m.link}
                          onClick={() => setIsOpen(false)}
                          className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#6D5DF6] dark:text-indigo-400 bg-white/80 dark:bg-slate-900/80 px-3 py-1.5 rounded-lg hover:underline"
                        >
                          {m.linkText} <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-2 text-xs text-slate-400 pl-9">
                    <span className="w-2 h-2 rounded-full bg-[#6D5DF6] animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-[#6D5DF6] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-[#6D5DF6] animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}
              </div>

              {/* Quick Prompt Pills */}
              <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto border-t border-slate-100 dark:border-slate-800/50 no-scrollbar">
                {quickPrompts.map((qp, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(qp.query)}
                    className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-[#6D5DF6] transition-colors"
                  >
                    {qp.label}
                  </button>
                ))}
              </div>

              {/* Input Bar */}
              <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask financial question..."
                  className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6D5DF6]"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="p-2.5 rounded-xl bg-[#6D5DF6] hover:bg-[#583ef0] disabled:opacity-50 text-white transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
