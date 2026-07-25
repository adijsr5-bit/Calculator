import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type CurrencyCode = "USD" | "EUR" | "GBP" | "INR" | "CAD" | "AUD";

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  CAD: "CA$",
  AUD: "A$",
};

export function formatCurrency(amount: number, currency: CurrencyCode = "USD"): string {
  const symbol = CURRENCY_SYMBOLS[currency] || "$";
  const formattedNumber = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(Math.round(amount));

  return `${symbol}${formattedNumber}`;
}

export function formatPercent(val: number): string {
  return `${val.toFixed(2)}%`;
}

// LocalStorage history & favorites management
export interface SavedCalculation {
  id: string;
  type: string;
  title: string;
  timestamp: number;
  data: Record<string, any>;
  summary: string;
}

export function saveCalculationToStorage(calc: Omit<SavedCalculation, "id" | "timestamp">) {
  if (typeof window === "undefined") return;
  try {
    const existing = getCalculationHistory();
    const newItem: SavedCalculation = {
      ...calc,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
    };
    const updated = [newItem, ...existing.filter((item) => item.title !== calc.title)].slice(0, 20);
    localStorage.setItem("valuepilot_calc_history", JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to save calculation history", e);
  }
}

export function getCalculationHistory(): SavedCalculation[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("valuepilot_calc_history");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function toggleFavoriteTool(toolId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const favs = getFavoriteTools();
    let updated: string[];
    let isFav = false;
    if (favs.includes(toolId)) {
      updated = favs.filter((id) => id !== toolId);
      isFav = false;
    } else {
      updated = [...favs, toolId];
      isFav = true;
    }
    localStorage.setItem("valuepilot_favorites", JSON.stringify(updated));
    return isFav;
  } catch (e) {
    return false;
  }
}

export function getFavoriteTools(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("valuepilot_favorites");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

// Schema JSON-LD Generators for SEO
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ValuePilot",
    url: "https://valuepilot.vercel.app",
    logo: "https://valuepilot.vercel.app/logo.png",
    description: "Free institutional-grade financial calculators, debt payoff tools, and wealth planning guides.",
    sameAs: [
      "https://twitter.com/valuepilotapp",
      "https://linkedin.com/company/valuepilot",
      "https://facebook.com/valuepilotapp"
    ],
  };
}

export function generateCalculatorSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: name,
    description: description,
    url: url,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0.00",
      priceCurrency: "USD",
    },
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateArticleSchema(title: string, description: string, url: string, datePublished: string, authorName = "ValuePilot Financial Advisory Team") {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": "Organization",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "ValuePilot",
      logo: {
        "@type": "ImageObject",
        url: "https://valuepilot.vercel.app/logo.png",
      },
    },
    datePublished: datePublished,
    dateModified: datePublished,
  };
}
