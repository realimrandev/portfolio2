"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ScrollIndicator({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.8 }}
      className={cn(
        "flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/50",
        className,
      )}
    >
      <span>Scroll</span>
      <span className="relative h-12 w-px overflow-hidden bg-white/10">
        <motion.span
          className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-emerald-glow to-transparent"
          animate={{ y: ["-100%", "300%"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
    </motion.div>
  );
}
