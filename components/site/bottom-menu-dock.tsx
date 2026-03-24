"use client";

import { SiteDock } from "./site-dock";
import styles from "./bottom-menu-dock.module.css";

type BottomMenuDockProps = {
  className?: string;
  placement?: "bottom" | "top";
};

export function BottomMenuDock({
  className,
  placement = "top"
}: BottomMenuDockProps) {
  return (
    <div
      className={[
        styles.dock,
        placement === "top" ? styles.dockTop : "",
        className ?? ""
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <SiteDock />
    </div>
  );
}
