import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Tax Refund Calculator & Federal Bracket Estimator | ValuePilot",
  description:
    "Estimate your federal income tax refund or liability based on updated 2026 IRS tax brackets, standard deductions, and income.",
  keywords: [
    "tax refund calculator",
    "income tax calculator",
    "federal tax refund estimator",
    "2026 tax bracket calculator",
    "estimate tax refund IRS",
    "w4 tax withholding calculator",
  ],
  alternates: {
    canonical: "https://valuepilot.vercel.app/tax-refund-calculator",
  },
  openGraph: {
    title: "Tax Refund Calculator & Federal Bracket Estimator | ValuePilot",
    description: "Estimate your 2026 federal income tax refund and effective tax rate.",
    url: "https://valuepilot.vercel.app/tax-refund-calculator",
    siteName: "ValuePilot",
    type: "website",
  },
};

export default function TaxRefundLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://valuepilot.vercel.app/tax-refund-calculator/#webapp",
        "name": "ValuePilot Tax Refund Calculator",
        "url": "https://valuepilot.vercel.app/tax-refund-calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
