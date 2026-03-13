"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  offset?: number;
  animatePosition?: boolean;
};

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.48,
  offset = 10,
  animatePosition = true
}: FadeInProps) {
  const reduceMotion = useReducedMotion();
  const initialState =
    reduceMotion
      ? { opacity: 1 }
      : animatePosition
        ? { opacity: 0, y: offset }
        : { opacity: 0 };
  const animateState =
    reduceMotion
      ? undefined
      : animatePosition
        ? { opacity: 1, y: 0 }
        : { opacity: 1 };

  return (
    <motion.div
      className={className}
      initial={initialState}
      whileInView={animateState}
      viewport={{ once: true, amount: 0.16 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
}
