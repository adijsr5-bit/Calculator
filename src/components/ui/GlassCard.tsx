"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  purpleTint?: boolean;
}

export function GlassCard({ children, className, gradient = false, purpleTint = false, ...props }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative rounded-3xl p-6 sm:p-8 transition-all duration-300",
        "bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-purple-100/90 dark:border-slate-800/90",
        "shadow-card shadow-purple-500/5 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-purple-300 dark:hover:border-indigo-500/40",
        purpleTint && "bg-[#F5F3FF]/90 dark:bg-indigo-950/30 border-purple-200/80 dark:border-indigo-800/40",
        gradient && "bg-gradient-to-br from-white via-[#F8F7FF] to-indigo-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
