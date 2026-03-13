import type { CSSProperties } from "react";

// Swap this fallback for `next/font/local` once SF Pro files are added.
export const rootFontClassName = "";

export const rootFontStyle = {
  "--font-display":
    '"Neue Machina", "SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  "--font-sans":
    '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
} as CSSProperties;
