import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Free Net Worth Calculator & Financial Health Tracker | ValuePilot",
  description:
    "Calculate your total net worth by combining liquid assets, real estate, investments, and liabilities. 100% private client-side processing.",
  keywords: [
    "net worth calculator",
    "calculate net worth",
    "personal net worth tracker",
    "assets minus liabilities calculator",
    "average net worth by age",
    "financial health score",
  ],
  alternates: {
    canonical: "https://valuepilot.vercel.app/net-worth-calculator",
  },
  openGraph: {
    title: "Free Net Worth Calculator & Financial Health Tracker | ValuePilot",
    description: "Track total assets, liabilities, and overall financial health score.",
    url: "https://valuepilot.vercel.app/net-worth-calculator",
    siteName: "ValuePilot",
    type: "website",
  },
};

export default function NetWorthLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://valuepilot.vercel.app/net-worth-calculator/#webapp",
        "name": "ValuePilot Net Worth Calculator",
        "url": "https://valuepilot.vercel.app/net-worth-calculator",
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
