import type { Metadata } from "next";
import type { ReactNode } from "react";

import { PageTransition } from "@/components/animations/page-transition";

import { rootFontClassName, rootFontStyle } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Nix Portfolio",
    template: "%s | Nix Portfolio"
  },
  description:
    "Личное портфолио с сильной визуальной подачей, точной версткой по Figma и плавной анимацией."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={rootFontClassName} style={rootFontStyle}>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
