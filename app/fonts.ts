import type { CSSProperties } from "react";

const sfProStack =
  '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export const rootFontClassName = "";

export const rootFontStyle = {
  "--font-display": sfProStack,
  "--font-sans": sfProStack
} as CSSProperties;
