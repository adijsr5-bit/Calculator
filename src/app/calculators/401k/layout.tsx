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
    canonical: "https://valuepilot.vercel.app/calculators/401k",
  },
  openGraph: {
    title: "401(k) Match & Retirement Growth Calculator | ValuePilot",
    description: "Calculate employer 401(k) match, compound growth, and total retirement balance.",
    url: "https://valuepilot.vercel.app/calculators/401k",
    siteName: "ValuePilot",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "401(k) Match Calculator | ValuePilot",
    description: "Calculate employer 401k match and retirement growth.",
  },
};

export default function FourOhOneKLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://valuepilot.vercel.app/calculators/401k/#webapp",
        "name": "ValuePilot 401k Calculator",
        "url": "https://valuepilot.vercel.app/calculators/401k",
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
