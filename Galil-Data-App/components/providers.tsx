"use client";

import {ThemeProvider} from "@/components/theme-provider";
import {DirectionProvider} from "@radix-ui/react-direction";

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <DirectionProvider dir="rtl">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </DirectionProvider>
  );
}
