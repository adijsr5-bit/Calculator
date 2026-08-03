import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Free 50/30/20 Budget Calculator & Monthly Planner | ValuePilot",
  description:
    "Plan your income with the 50/30/20 rule. Categorize needs, wants, and savings instantly with zero data collection or email signup.",
  keywords: [
    "budget calculator",
    "budget planner",
    "50 30 20 budget calculator",
    "personal budget planner",
    "monthly budget estimator",
    "free budget spreadsheet alternative",
    "household budget breakdown",
  ],
  alternates: {
    canonical: "https://valuepilot.vercel.app/calculators/budget",
  },
  openGraph: {
    title: "50/30/20 Budget Planner Calculator | ValuePilot",
    description: "Calculate your monthly income split into Needs (50%), Wants (30%), and Savings (20%).",
    url: "https://valuepilot.vercel.app/calculators/budget",
    siteName: "ValuePilot",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "50/30/20 Budget Planner | ValuePilot",
    description: "Calculate your 50/30/20 monthly budget breakdown.",
  },
};

export default function BudgetLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://valuepilot.vercel.app/calculators/budget/#webapp",
        "name": "ValuePilot 50/30/20 Budget Planner",
        "url": "https://valuepilot.vercel.app/calculators/budget",
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
