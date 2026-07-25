import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Mortgage Calculator with Taxes, Insurance & PMI | ValuePilot",
  description:
    "Calculate exact monthly mortgage payments including principal, interest, property taxes, home insurance, and PMI. Free 30-year amortization schedule.",
  keywords: [
    "mortgage calculator",
    "mortgage payment calculator",
    "monthly mortgage calculator",
    "house payment calculator",
    "mortgage calculator with pmi and taxes",
    "home loan calculator",
    "mortgage affordability calculator",
    "how much house can i afford",
    "mortgage amortization schedule",
  ],
  alternates: {
    canonical: "https://valuepilot.app/mortgage-calculator",
  },
  openGraph: {
    title: "Mortgage Calculator with Taxes & Amortization | ValuePilot",
    description:
      "Accurate 30-year and 15-year mortgage payment calculations with breakdown of P&I, taxes, insurance, HOA, and PMI.",
    url: "https://valuepilot.app/mortgage-calculator",
    siteName: "ValuePilot",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mortgage Calculator with Taxes & Amortization | ValuePilot",
    description: "Accurate mortgage payment estimator with full amortization schedules.",
  },
};

export default function MortgageLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://valuepilot.app/mortgage-calculator/#webapp",
        "name": "ValuePilot Mortgage Payment Calculator",
        "url": "https://valuepilot.app/mortgage-calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
        "description":
          "Calculate monthly house payments with taxes, insurance, PMI, and amortization schedule.",
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
            "name": "Mortgage Calculator",
            "item": "https://valuepilot.app/mortgage-calculator",
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
