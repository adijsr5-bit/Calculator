import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Free 401(k) Calculator with Employer Match | ValuePilot",
  description:
    "Project your 401(k) balance at retirement. Factor in salary growth, employee contributions, employer match, and compound interest.",
  keywords: [
    "401k calculator",
    "401k growth calculator",
    "401k employer match calculator",
    "calculate 401k balance at retirement",
    "401k contribution planner",
    "max out 401k",
  ],
  alternates: {
    canonical: "https://valuepilot.vercel.app/401k-calculator",
  },
  openGraph: {
    title: "Free 401(k) Calculator with Employer Match | ValuePilot",
    description: "Calculate compound 401(k) growth with employer match contributions.",
    url: "https://valuepilot.vercel.app/401k-calculator",
    siteName: "ValuePilot",
    type: "website",
  },
};

export default function FourZeroOneKLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://valuepilot.vercel.app/401k-calculator/#webapp",
        "name": "ValuePilot 401(k) Calculator",
        "url": "https://valuepilot.vercel.app/401k-calculator",
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
