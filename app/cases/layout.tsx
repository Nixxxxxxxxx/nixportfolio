import type { ReactNode } from "react";

import { CasesShell } from "@/components/site/cases-shell";

export default function CasesLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return <CasesShell>{children}</CasesShell>;
}
