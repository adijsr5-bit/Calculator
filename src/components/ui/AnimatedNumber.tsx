"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  formatFn?: (val: number) => string;
  className?: string;
}

export function AnimatedNumber({ value, formatFn, className }: AnimatedNumberProps) {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const [displayValue, setDisplayValue] = useState<string>("");

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (formatFn) {
        setDisplayValue(formatFn(latest));
      } else {
        setDisplayValue(Math.round(latest).toLocaleString());
      }
    });
  }, [spring, formatFn]);

  return <span className={className}>{displayValue || (formatFn ? formatFn(value) : value.toLocaleString())}</span>;
}
