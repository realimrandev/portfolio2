"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { ThemeProvider } from "@/components/ThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TooltipProvider delayDuration={200}>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
