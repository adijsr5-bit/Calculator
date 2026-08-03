import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Free Car Loan Calculator & Auto Payment Estimator | ValuePilot",
  description:
    "Estimate monthly car loan payments with interest rates, loan terms, and down payment options. Compare 36, 48, 60, and 72-month auto financing terms.",
  keywords: [
    "car loan calculator",
    "auto loan calculator",
    "car payment calculator",
    "auto loan payment estimator",
    "car financing calculator",
    "calculate monthly car payment",
    "auto loan amortization schedule",
  ],
  alternates: {
    canonical: "https://valuepilot.vercel.app/calculators/car-loan",
  },
  openGraph: {
    title: "Auto Loan Calculator | ValuePilot",
    description: "Calculate your monthly car payment, total interest, and trade-in value.",
    url: "https://valuepilot.vercel.app/calculators/car-loan",
    siteName: "ValuePilot",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Auto Loan Calculator | ValuePilot",
    description: "Calculate monthly car payments and total loan cost.",
  },
};

export default function CarLoanLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://valuepilot.vercel.app/calculators/car-loan/#webapp",
        "name": "ValuePilot Auto Loan Calculator",
        "url": "https://valuepilot.vercel.app/calculators/car-loan",
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
