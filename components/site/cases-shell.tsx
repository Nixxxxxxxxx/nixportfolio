"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { SiteMenu } from "./site-menu";
import styles from "./cases-shell.module.css";

type CasesShellProps = {
  children: ReactNode;
};

const contentVariants = {
  initial: { opacity: 0, y: 4 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    y: 0,
    transition: {
      duration: 0.14,
      ease: [0.22, 1, 0.36, 1]
    }
  }
} as const;

const reducedMotionVariants = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 1 }
} as const;

function BackArrowIcon() {
  return (
    <svg className={styles.backIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.5 6L8.5 12L14.5 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CasesShell({ children }: CasesShellProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const backHref = pathname === "/cases" ? "/" : "/cases";

  return (
    <div className={styles.shell}>
      <div className={styles.topBarLayer}>
        <div className={styles.topBar}>
          <Link href={backHref} className={styles.backButton} aria-label="Назад">
            <BackArrowIcon />
          </Link>

          <SiteMenu placement="below" align="end" />
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          className={styles.content}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={reduceMotion ? reducedMotionVariants : contentVariants}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
