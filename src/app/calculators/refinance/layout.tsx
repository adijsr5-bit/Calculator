import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Mortgage Refinance Calculator & Break-Even Analysis | ValuePilot",
  description:
    "Determine if refinancing your mortgage will save you money. Calculate monthly payment savings, total interest savings, and exact break-even timeline.",
  keywords: [
    "refinance calculator",
    "mortgage refinance calculator",
    "refi calculator",
    "refinance break even calculator",
    "should i refinance my mortgage",
    "lower monthly mortgage payment",
  ],
  alternates: {
    canonical: "https://valuepilot.vercel.app/refinance-calculator",
  },
  openGraph: {
    title: "Mortgage Refinance Calculator & Break-Even Analysis | ValuePilot",
    description: "Calculate monthly refi savings and break-even timeline instantly.",
    url: "https://valuepilot.vercel.app/refinance-calculator",
    siteName: "ValuePilot",
    type: "website",
  },
};

export default function RefinanceLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://valuepilot.vercel.app/refinance-calculator/#webapp",
        "name": "ValuePilot Refinance Calculator",
        "url": "https://valuepilot.vercel.app/refinance-calculator",
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
