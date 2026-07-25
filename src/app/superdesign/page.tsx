"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Star, ArrowRight, ArrowUpRight } from "lucide-react";

export default function SuperdesignPage() {
  const [scrolled, setScrolled] = useState(false);
  const [timeString, setTimeString] = useState("");
  const [heroOffset, setHeroOffset] = useState(0);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [scrollOffsetY, setScrollOffsetY] = useState(0);

  useEffect(() => {
    // 1. Update Time Clock for NYC
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "America/New_York",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      setTimeString(new Intl.DateTimeFormat("en-US", options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);

    // 2. Scroll Handlers for Parallax & Navbar
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollOffsetY(scrollY);

      if (scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (scrollY < 1000) {
        setHeroOffset(scrollY * 0.4);
        setHeroOpacity(Math.max(0, 1 - scrollY / 600));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#FF4500] selection:text-white relative overflow-x-hidden font-sans">
      {/* Global Noise Overlay */}
      <div className="noise-overlay" />

      {/* Navigation Header */}
      <nav
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-4 bg-[#050505]/85 backdrop-blur-md border-b border-white/10"
            : "py-8 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/superdesign" id="nav-logo-link" className="text-2xl font-bold tracking-tighter font-serif">
            Superdesign.
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#expertise" id="nav-expertise-link" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
              Expertise
            </a>
            <a href="#works" id="nav-works-link" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
              Selected Works
            </a>
            <a href="#perspectives" id="nav-perspectives-link" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
              Perspectives
            </a>
            <Link href="/" className="text-sm text-[#FF4500] font-semibold hover:underline">
              ← Return to ValuePilot
            </Link>
          </div>

          <a
            href="#contact"
            id="nav-cta-link"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium bg-white text-black hover:scale-105 hover:bg-gray-100 transition-all duration-300"
          >
            Start Project
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 bg-[#050505]">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <div className="absolute top-0 left-0 w-full h-full opacity-60 mix-blend-screen">
            <img
              src="https://framerusercontent.com/images/9zvwRJAavKKacVyhFCwHyXW1U.png?width=1536&height=1024"
              alt="Atmosphere"
              className="w-full h-full object-cover object-center opacity-80"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505] z-10" />
        </div>

        {/* Floating Surrealist Hand Left */}
        <div className="absolute -left-[10%] top-[-10%] md:left-[-5%] md:top-[-15%] w-[50vw] md:w-[40vw] max-w-[800px] z-10 pointer-events-none mix-blend-hard-light opacity-80 animate-float-left">
          <img
            src="https://framerusercontent.com/images/KNhiA5A2ykNYqNkj04Hk6BVg5A.png?width=1540&height=1320"
            alt="Hand Reaching"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Floating Surrealist Hand Right */}
        <div className="absolute -right-[10%] bottom-[-10%] md:right-[-5%] md:bottom-[-5%] w-[45vw] md:w-[35vw] max-w-[700px] z-10 pointer-events-none mix-blend-hard-light opacity-80 animate-float-right">
          <img
            src="https://framerusercontent.com/images/X89VFCABCEjjZ4oLGa3PjbOmsA.png?width=1542&height=1002"
            alt="Hand Receiving"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Hero Content */}
        <div
          className="container mx-auto px-6 relative z-20 text-center flex flex-col items-center justify-center h-full transition-transform duration-75"
          style={{ transform: `translateY(${heroOffset}px)`, opacity: heroOpacity }}
        >
          <div id="hero-content-wrapper" className="max-w-4xl mx-auto space-y-6">
            <div>
              <h1
                className="text-5xl md:text-7xl font-medium leading-[1.1] tracking-tight mb-6 text-[#ffe0e0] mix-blend-overlay font-serif"
                style={{ textShadow: "0 0 12px rgba(255,255,255,0.71)" }}
              >
                Superdesign. <br />
                <span className="italic font-light text-[#ffe0e0]">The design agent.</span>
              </h1>
            </div>

            <div>
              <p
                className="text-base md:text-lg text-[#ffe0e0]/90 max-w-lg mx-auto mb-12 font-light tracking-wide leading-relaxed mix-blend-overlay"
                style={{ textShadow: "0 0 12px rgba(255,255,255,0.71)" }}
              >
                We turn the unseen into the unforgettable. A design agency for those who dare to disappear to be found.
              </p>
            </div>

            <div className="flex flex-col items-center gap-6 pt-4">
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-[#FF4500]/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-2.5 rounded-full flex items-center gap-3 text-xs md:text-sm text-white/90 uppercase tracking-widest hover:bg-white/10 transition-colors duration-300">
                  <span>Enter the Void</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[10px] md:text-xs text-white/40 uppercase tracking-widest mt-8 font-mono">
                <span id="current-time">{timeString || "11:11 PM"}</span>
                <span className="w-px h-3 bg-white/20" />
                <span>NYC, USA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="expertise" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl lg:text-6xl leading-tight text-white/90 font-serif">
              We design the negative space where your brand truly lives.
            </h2>
            <p className="text-xl md:text-2xl text-gray-500 leading-relaxed font-light">
              Elegance is refusal. We remove the noise so your message resonates with absolute clarity.
            </p>
          </div>

          {/* Logo Grid */}
          <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="font-bold text-xl tracking-widest text-white">VOGUE</div>
            <div className="font-bold text-xl tracking-widest text-white">TESLA</div>
            <div className="font-bold text-xl tracking-widest text-white">MOOMA</div>
            <div className="font-bold text-xl tracking-widest text-white">AESOP</div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section id="works" className="py-40 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-24 text-center">
            <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight">
              Define your <br />
              <span className="italic font-light">digital presence</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card 1 - Red */}
            <div style={{ transform: `translateY(${scrollOffsetY * 0.03}px)` }} className="transition-transform duration-300">
              <div className="bg-[#FF4500] rounded-3xl p-8 md:p-12 aspect-[4/5] flex flex-col justify-between shadow-2xl hover:shadow-[0_20px_50px_rgba(255,69,0,0.4)] transition-all duration-500 group cursor-pointer">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                    <Star className="w-6 h-6 text-black fill-current" />
                  </div>
                  <span className="text-black font-medium text-sm border border-black/20 px-3.5 py-1 rounded-full">01</span>
                </div>

                <div>
                  <h3 className="text-4xl md:text-5xl text-black mb-4 leading-none tracking-tight font-serif font-medium">
                    Emerging <br />Talent
                  </h3>
                  <p className="text-black/70 text-lg leading-snug">
                    You have the spark. We provide the atmosphere for it to ignite into a blazing reality.
                  </p>
                </div>

                <div className="w-full h-px bg-black/10 mt-8" />
              </div>
            </div>

            {/* Card 2 - Black */}
            <div style={{ transform: `translateY(${scrollOffsetY * -0.03}px)` }} className="md:mt-24 transition-transform duration-300">
              <div className="bg-[#111] border border-white/10 rounded-3xl p-8 md:p-12 aspect-[4/5] flex flex-col justify-between shadow-2xl group cursor-pointer hover:border-[#FF4500]/60 transition-all duration-500">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <ArrowUpRight className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white/50 font-medium text-sm border border-white/10 px-3.5 py-1 rounded-full">02</span>
                </div>

                <div>
                  <h3 className="text-4xl md:text-5xl text-white mb-4 leading-none tracking-tight font-serif font-medium">
                    Evolving <br />Legacy
                  </h3>
                  <p className="text-gray-400 text-lg leading-snug">
                    You&apos;ve arrived. Now let&apos;s make sure you never leave their minds. Permanence is our craft.
                  </p>
                </div>

                <div className="w-full h-px bg-white/10 mt-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Background Radial Dots Pattern */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #555 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/10 bg-[#050505] relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <div className="w-full md:w-auto">
              <h2 className="text-[10vw] leading-[0.8] tracking-tighter text-white/10 font-bold select-none pointer-events-none font-serif">
                SUPERDESIGN.
              </h2>
            </div>

            <div className="flex flex-col gap-8 text-right">
              <div className="flex flex-col gap-4 text-gray-400 text-sm font-medium">
                <a href="#" id="footer-ig-link" className="hover:text-white transition-colors">
                  Instagram
                </a>
                <a href="#" id="footer-tw-link" className="hover:text-white transition-colors">
                  Twitter
                </a>
                <a href="#" id="footer-li-link" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
              </div>
              <p className="text-xs text-gray-600">© 2024 Superdesign. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
