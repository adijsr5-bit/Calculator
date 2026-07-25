import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Roth IRA & Traditional IRA Growth Calculator | ValuePilot",
  description:
    "Calculate potential tax-free growth with a Roth IRA or tax-deferred growth with a Traditional IRA. Plan your annual maximum contributions.",
  keywords: [
    "ira calculator",
    "roth ira calculator",
    "traditional ira calculator",
    "roth ira growth calculator",
    "ira contribution limit 2026",
    "roth vs traditional ira",
  ],
  alternates: {
    canonical: "https://valuepilot.vercel.app/ira-calculator",
  },
  openGraph: {
    title: "Roth IRA & Traditional IRA Growth Calculator | ValuePilot",
    description: "Compare tax-free Roth IRA growth vs Traditional IRA tax deductions.",
    url: "https://valuepilot.vercel.app/ira-calculator",
    siteName: "ValuePilot",
    type: "website",
  },
};

export default function IRALayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://valuepilot.vercel.app/ira-calculator/#webapp",
        "name": "ValuePilot IRA Calculator",
        "url": "https://valuepilot.vercel.app/ira-calculator",
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
