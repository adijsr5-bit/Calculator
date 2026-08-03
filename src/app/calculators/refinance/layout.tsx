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
    canonical: "https://valuepilot.vercel.app/calculators/refinance",
  },
  openGraph: {
    title: "Mortgage Refinance Calculator & Break-Even Analysis | ValuePilot",
    description:
      "Calculate your break-even month, total interest savings, and new monthly payment when refinancing your home mortgage.",
    url: "https://valuepilot.vercel.app/calculators/refinance",
    siteName: "ValuePilot",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mortgage Refinance Calculator | ValuePilot",
    description: "Accurate mortgage refinance break-even estimator.",
  },
};

export default function RefinanceLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://valuepilot.vercel.app/calculators/refinance/#webapp",
        "name": "ValuePilot Mortgage Refinance Calculator",
        "url": "https://valuepilot.vercel.app/calculators/refinance",
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
