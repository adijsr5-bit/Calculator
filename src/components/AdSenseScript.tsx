"use client";

import React, { useEffect } from "react";

export function AdSenseScript({ clientId }: { clientId: string }) {
  useEffect(() => {
    let loaded = false;

    const loadAdSense = () => {
      if (loaded) return;
      loaded = true;

      // Clean up event listeners
      window.removeEventListener("scroll", loadAdSense);
      window.removeEventListener("mousemove", loadAdSense);
      window.removeEventListener("touchstart", loadAdSense);
      window.removeEventListener("keydown", loadAdSense);

      const script = document.createElement("script");
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    };

    // Load exclusively on real human user interaction
    window.addEventListener("scroll", loadAdSense, { passive: true });
    window.addEventListener("mousemove", loadAdSense, { passive: true });
    window.addEventListener("touchstart", loadAdSense, { passive: true });
    window.addEventListener("keydown", loadAdSense, { passive: true });
    window.addEventListener("click", loadAdSense, { passive: true });

    return () => {
      window.removeEventListener("scroll", loadAdSense);
      window.removeEventListener("mousemove", loadAdSense);
      window.removeEventListener("touchstart", loadAdSense);
      window.removeEventListener("keydown", loadAdSense);
      window.removeEventListener("click", loadAdSense);
    };
  }, [clientId]);

  return null;
}
