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
    canonical: "https://valuepilot.vercel.app/car-loan-calculator",
  },
  openGraph: {
    title: "Free Car Loan Calculator & Auto Payment Estimator | ValuePilot",
    description: "Calculate auto payments and compare 36 to 72 month auto loan terms.",
    url: "https://valuepilot.vercel.app/car-loan-calculator",
    siteName: "ValuePilot",
    type: "website",
  },
};

export default function CarLoanLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://valuepilot.vercel.app/car-loan-calculator/#webapp",
        "name": "ValuePilot Car Loan Calculator",
        "url": "https://valuepilot.vercel.app/car-loan-calculator",
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
