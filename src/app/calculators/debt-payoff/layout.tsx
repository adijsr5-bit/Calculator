import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Free Debt Payoff Calculator & Planner (Snowball vs Avalanche) | ValuePilot",
  description:
    "Calculate your exact debt payoff date and interest savings using Snowball and Avalanche methods. Free, 100% private, client-side calculator with custom printable PDF reports.",
  keywords: [
    "debt payoff calculator",
    "debt payoff planner",
    "debt snowball calculator",
    "debt avalanche calculator",
    "credit card payoff calculator",
    "debt repayment calculator",
    "debt reduction planner",
    "how to pay off debt fast",
    "pay off 20k debt",
  ],
  alternates: {
    canonical: "https://valuepilot.app/debt-payoff-calculator",
  },
  openGraph: {
    title: "Free Debt Payoff Calculator & Planner | ValuePilot",
    description:
      "Eliminate debt faster with Snowball vs Avalanche strategy comparisons, amortization schedules, and custom PDF exports.",
    url: "https://valuepilot.app/debt-payoff-calculator",
    siteName: "ValuePilot",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Debt Payoff Calculator & Planner | ValuePilot",
    description:
      "Calculate your exact debt freedom date and total interest saved with client-side privacy.",
  },
};

export default function DebtPayoffLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://valuepilot.app/debt-payoff-calculator/#webapp",
        "name": "ValuePilot Debt Payoff Planner",
        "url": "https://valuepilot.app/debt-payoff-calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
        "description":
          "Calculate debt payoff timelines using Snowball and Avalanche payoff methods with zero tracking.",
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://valuepilot.app",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Calculators",
            "item": "https://valuepilot.app/#calculators",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Debt Payoff Calculator",
            "item": "https://valuepilot.app/debt-payoff-calculator",
          },
        ],
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
