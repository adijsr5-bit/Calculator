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
    canonical: "https://valuepilot.vercel.app/budget-planner",
  },
  openGraph: {
    title: "Free 50/30/20 Budget Calculator & Monthly Planner | ValuePilot",
    description: "Manage monthly expenses with 50/30/20 rule budgeting and total privacy.",
    url: "https://valuepilot.vercel.app/budget-planner",
    siteName: "ValuePilot",
    type: "website",
  },
};

export default function BudgetLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://valuepilot.vercel.app/budget-planner/#webapp",
        "name": "ValuePilot 50/30/20 Budget Calculator",
        "url": "https://valuepilot.vercel.app/budget-planner",
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
