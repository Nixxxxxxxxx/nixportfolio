"use client";

import { SiteDock } from "./site-dock";
import styles from "./bottom-menu-dock.module.css";

type BottomMenuDockProps = {
  className?: string;
};

export function BottomMenuDock({ className }: BottomMenuDockProps) {
  return (
    <div
      className={[styles.dock, className ?? ""]
        .filter(Boolean)
        .join(" ")}
    >
      <SiteDock />
    </div>
  );
}
