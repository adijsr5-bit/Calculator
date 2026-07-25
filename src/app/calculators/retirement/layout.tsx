import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Retirement Calculator & Nest Egg Estimator | ValuePilot",
  description:
    "Calculate how much money you need to retire comfortably. Adjust for annual inflation, investment returns, and monthly savings goals.",
  keywords: [
    "retirement calculator",
    "retirement savings calculator",
    "how much do i need to retire",
    "retirement nest egg estimator",
    "early retirement calculator FIRE",
    "inflation adjusted retirement planner",
  ],
  alternates: {
    canonical: "https://valuepilot.vercel.app/retirement-calculator",
  },
  openGraph: {
    title: "Retirement Calculator & Nest Egg Estimator | ValuePilot",
    description: "Plan your retirement nest egg with inflation adjustments and compound growth.",
    url: "https://valuepilot.vercel.app/retirement-calculator",
    siteName: "ValuePilot",
    type: "website",
  },
};

export default function RetirementLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://valuepilot.vercel.app/retirement-calculator/#webapp",
        "name": "ValuePilot Retirement Calculator",
        "url": "https://valuepilot.vercel.app/retirement-calculator",
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
