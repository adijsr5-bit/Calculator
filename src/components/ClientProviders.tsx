"use client";

import React from "react";
import dynamic from "next/dynamic";

const AIAssistantModal = dynamic(
  () => import("@/components/ui/AIAssistantModal").then((mod) => mod.AIAssistantModal),
  { ssr: false }
);

const CookieBanner = dynamic(
  () => import("@/components/ui/CookieBanner").then((mod) => mod.CookieBanner),
  { ssr: false }
);

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <AIAssistantModal />
      <CookieBanner />
    </>
  );
}
