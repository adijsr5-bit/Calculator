"use client";

import React, { useState, useRef } from "react";
import { Download, Printer, Share2, Bookmark, Check, HelpCircle, FileText, ChevronDown, Sparkles, BookOpen, ShieldCheck } from "lucide-react";
import { saveCalculationToStorage, toggleFavoriteTool, getFavoriteTools, generateCalculatorSchema, generateFAQSchema } from "@/lib/utils";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Link from "next/link";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RelatedTool {
  name: string;
  href: string;
  desc: string;
}

interface CalculatorWrapperProps {
  id: string;
  title: string;
  subtitle: string;
  calculatorNode: React.ReactNode;
  summaryText: string;
  formulaTitle: string;
  formulaContent: React.ReactNode;
  howItWorksContent: React.ReactNode;
  exampleContent: React.ReactNode;
  prosAndCons: { pros: string[]; cons: string[] };
  faqs: FAQItem[];
  relatedTools: RelatedTool[];
  lastUpdated?: string;
}

export function CalculatorWrapper({
  id,
  title,
  subtitle,
  calculatorNode,
  summaryText,
  formulaTitle,
  formulaContent,
  howItWorksContent,
  exampleContent,
  prosAndCons,
  faqs,
  relatedTools,
  lastUpdated = "July 24, 2026",
}: CalculatorWrapperProps) {
  const printRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isFav, setIsFav] = useState(() => {
    return typeof window !== "undefined" ? getFavoriteTools().includes(id) : false;
  });
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveLocal = () => {
    saveCalculationToStorage({
      type: id,
      title: title,
      data: {},
      summary: summaryText,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleToggleFav = () => {
    const updatedFavState = toggleFavoriteTool(id);
    setIsFav(updatedFavState);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    try {
      setIsExportingPdf(true);
      const reportTitle = title;
      const reportId = id;
      const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#FFFFFF",
        onclone: (clonedDoc) => {
          // 1. Replace all interactive inputs with crisp static text elements to prevent text clipping
          const inputs = clonedDoc.querySelectorAll("input, select");
          inputs.forEach((input) => {
            const el = input as HTMLInputElement | HTMLSelectElement;
            const textVal = el.value || el.getAttribute("placeholder") || "-";
            const valDiv = clonedDoc.createElement("div");
            valDiv.className =
              "px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-extrabold text-slate-900 dark:text-white text-xs border border-slate-200 dark:border-slate-700 min-h-[36px] flex items-center";
            valDiv.textContent = textVal;
            if (el.parentNode) {
              el.parentNode.replaceChild(valDiv, el);
            }
          });

          // 2. Hide interactive buttons & triggers inside PDF output
          const buttons = clonedDoc.querySelectorAll("button, .no-pdf");
          buttons.forEach((btn) => {
            (btn as HTMLElement).style.display = "none";
          });

          // 3. Prepend Executive ValuePilot Branded Header
          const target = clonedDoc.querySelector(".printable-area");
          if (target) {
            const header = clonedDoc.createElement("div");
            header.style.cssText =
              "padding: 20px; margin-bottom: 20px; background-color: #0F172A; border-radius: 16px; color: #FFFFFF; display: flex; justify-content: space-between; align-items: center; border-bottom: 4px solid #6D5DF6;";
            header.innerHTML = `
              <div>
                <div style="font-size: 22px; font-weight: 800; color: #FFFFFF;">ValuePilot<span style="color: #6D5DF6;">.</span></div>
                <div style="font-size: 11px; font-weight: 700; color: #94A3B8; text-transform: uppercase; letter-spacing: 1px; margin-top: 2px;">${reportTitle} — Executive Financial Report</div>
              </div>
              <div style="text-align: right; font-size: 11px; color: #94A3B8;">
                <div>Date: <strong style="color: #FFFFFF;">${currentDate}</strong></div>
                <div>Source: <strong style="color: #A5B4FC;">ValuePilot (https://valuepilot.app)</strong></div>
              </div>
            `;
            target.insertBefore(header, target.firstChild);
          }
        },
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, Math.min(imgHeight, 260));
      pdf.setFontSize(8);
      pdf.setTextColor(120, 120, 120);
      pdf.text("Generated by ValuePilot | Source: ValuePilot (https://valuepilot.app) | 100% Client-Side Private Calculation", 10, 287);
      pdf.save(`${id}-valuepilot-report.pdf`);
    } catch (e) {
      console.error("PDF Export error", e);
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Generate Schemas
  const calcSchema = generateCalculatorSchema(title, subtitle, `https://truepathfinance.com/calculators/${id}`);
  const faqSchema = generateFAQSchema(faqs);

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* JSON-LD Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([calcSchema, faqSchema]) }}
      />

      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-[#6D5DF6] dark:text-indigo-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> High Precision Calculator
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          {title}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          {subtitle}
        </p>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <button
            onClick={handleDownloadPDF}
            disabled={isExportingPdf}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#6D5DF6] transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-[#6D5DF6]" />
            {isExportingPdf ? "Generating PDF..." : "Export PDF"}
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#6D5DF6] transition-all shadow-sm"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            Print Results
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#6D5DF6] transition-all shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />}
            {copied ? "Link Copied!" : "Share Tool"}
          </button>

          <button
            onClick={handleSaveLocal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#6D5DF6] transition-all shadow-sm"
          >
            {saved ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <FileText className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />}
            {saved ? "Saved to History!" : "Save History"}
          </button>

          <button
            onClick={handleToggleFav}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border transition-all shadow-sm ${
              isFav
                ? "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 text-[#6D5DF6]"
                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isFav ? "fill-current" : ""}`} />
            {isFav ? "Favorited" : "Favorite"}
          </button>
        </div>
      </div>

      {/* Main Interactive Calculator Grid */}
      <div ref={printRef} className="printable-area space-y-4">
        {calculatorNode}
        <div className="hidden print:block text-center text-xs text-slate-500 pt-6 border-t border-slate-200 mt-6 font-semibold">
          Generated by ValuePilot | Source: ValuePilot (https://valuepilot.app)
        </div>
      </div>

      {/* 1,200+ Word Editorial Content (AdSense & SEO Optimized) */}
      <article className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800 max-w-4xl mx-auto space-y-12 text-slate-800 dark:text-slate-200">
        {/* Author / Metadata Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#6D5DF6] text-white flex items-center justify-center font-bold">
              TP
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Written by ValuePilot Financial Advisory Team</div>
              <div className="text-slate-500">Reviewed by Certified Financial Planners (CFP®)</div>
            </div>
          </div>
          <div className="text-slate-400">
            Last Updated: <span className="font-semibold text-slate-700 dark:text-slate-300">{lastUpdated}</span>
          </div>
        </div>

        {/* Section 1: Overview & How it works */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#6D5DF6]" /> Comprehensive Guide: How {title} Works
          </h2>
          <div className="prose dark:prose-invert max-w-none space-y-4 leading-relaxed text-sm sm:text-base">
            {howItWorksContent}
          </div>
        </section>

        {/* Section 2: Mathematical Formula */}
        <section className="space-y-4 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" /> {formulaTitle}
          </h3>
          <div className="text-sm leading-relaxed text-slate-300 space-y-3">
            {formulaContent}
          </div>
        </section>

        {/* Section 3: Practical Real-World Example */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-950 dark:text-white">
            Real-World Calculation Example
          </h3>
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm leading-relaxed space-y-3">
            {exampleContent}
          </div>
        </section>

        {/* Section 4: Pros and Cons */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 space-y-3">
            <h4 className="font-bold text-emerald-700 dark:text-emerald-400 text-base">Key Advantages & Benefits</h4>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              {prosAndCons.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 space-y-3">
            <h4 className="font-bold text-amber-700 dark:text-amber-400 text-base">Important Considerations</h4>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              {prosAndCons.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 5: Frequently Asked Questions Accordion */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-950 dark:text-white">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-5 text-left font-semibold text-slate-900 dark:text-white flex items-center justify-between gap-4 text-sm sm:text-base hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                      openFaq === index ? "rotate-180 text-[#6D5DF6]" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="p-5 pt-0 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Related Tools Grid */}
        <section className="space-y-4 pt-4">
          <h3 className="text-xl font-bold text-slate-950 dark:text-white">
            Explore Related Financial Calculators
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedTools.map((rt, idx) => (
              <Link
                key={idx}
                href={rt.href}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#6D5DF6] transition-all group"
              >
                <div className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#6D5DF6] transition-colors">
                  {rt.name}
                </div>
                <div className="text-xs text-slate-500 mt-1 line-clamp-2">{rt.desc}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 7: Academic References & Citations (E-E-A-T Quality Signal) */}
        <section className="p-6 rounded-2xl bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-xs space-y-2">
          <div className="font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#6D5DF6]" /> References & Academic Citations (E-E-A-T Verified):
          </div>
          <ul className="list-disc pl-5 text-slate-500 dark:text-slate-400 space-y-1">
            <li>Consumer Financial Protection Bureau (CFPB) — Loan Amortization Regulations & Truth in Lending Act (TILA).</li>
            <li>Federal Reserve Board — Consumer Credit & Interest Rate Benchmarks (H.15 Release).</li>
            <li>Internal Revenue Service (IRS) — 2026 Marginal Tax Brackets & Standard Deduction Guidelines.</li>
          </ul>
        </section>
      </article>
    </div>
  );
}
