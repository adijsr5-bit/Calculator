import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIAssistantModal } from "@/components/ui/AIAssistantModal";
import { CookieBanner } from "@/components/ui/CookieBanner";

export const metadata: Metadata = {
  title: {
    default: "Free Financial Calculators & Money Planning Tools | Budget, Mortgage, Debt & Retirement | ValuePilot",
    template: "%s | ValuePilot",
  },
  description:
    "Use free financial calculators to plan your mortgage, budget, debt payoff, retirement, taxes, car loans and net worth. Accurate, fast and easy-to-use money tools.",
  keywords: [
    "financial calculators",
    "money calculator",
    "finance calculator",
    "personal finance tools",
    "money planning tools",
    "financial planning calculator",
    "budget calculator",
    "free financial calculator",
    "ValuePilot",
    "Mortgage Calculator",
    "Refinance Calculator",
    "Debt Payoff Planner",
    "Car Loan Calculator",
    "401k Match Calculator",
    "Budget Planner",
    "Tax Refund Estimator",
    "Credit Score Guide",
    "Net Worth Calculator",
  ],
  authors: [{ name: "ValuePilot Team" }],
  metadataBase: new URL("https://valuepilot.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://valuepilot.vercel.app",
    title: "Free Financial Calculators & Money Planning Tools | ValuePilot",
    description:
      "Use free financial calculators to plan your mortgage, budget, debt payoff, retirement, taxes, car loans and net worth. Accurate, fast and easy-to-use money tools.",
    siteName: "ValuePilot",
  },
  twitter: {
    card: "summary_large_image",
    title: "ValuePilot | Free Financial Calculators & Money Planning Tools",
    description: "Use free financial calculators to plan your mortgage, budget, debt payoff, retirement, taxes, car loans and net worth.",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  verification: {
    google: "ZbuthJm7kqi-5-WV6Z8Dvlvo_udMkHgFFfSTDfuS2uA",
  },
  other: {
    "google-adsense-account": "ca-pub-9657690036702429",
  },
};

import Script from "next/script";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-9657690036702429";

  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="ZbuthJm7kqi-5-WV6Z8Dvlvo_udMkHgFFfSTDfuS2uA" />
        <meta name="google-adsense-account" content="ca-pub-9657690036702429" />
        <meta name="agentic-browsing-enabled" content="true" />
        <meta name="webmcp-compliant" content="true" />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased selection:bg-[#6D5DF6] selection:text-white max-w-full overflow-x-hidden relative">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#6D5DF6] focus:text-white focus:rounded-xl text-xs font-bold"
        >
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <CurrencyProvider>
            <header role="banner">
              <Navbar />
            </header>
            <main id="main-content" tabIndex={-1} role="main" className="flex-1 w-full max-w-full overflow-x-hidden outline-none">
              {children}
            </main>
            <footer role="contentinfo">
              <Footer />
            </footer>
            <AIAssistantModal />
            <CookieBanner />
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
