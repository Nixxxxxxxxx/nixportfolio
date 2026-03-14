"use client";

import { SiteMenu } from "./site-menu";
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
      <SiteMenu placement="above" align="center" />
    </div>
  );
}
