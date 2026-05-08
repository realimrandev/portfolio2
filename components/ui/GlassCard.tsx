"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  glow?: boolean;
  tint?: "emerald" | "sunset" | "neutral";
  children?: ReactNode;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, glow = false, tint = "neutral", ...rest }, ref) => {
    const tintClass =
      tint === "emerald"
        ? "before:bg-emerald-glow/10"
        : tint === "sunset"
        ? "before:bg-sunset/10"
        : "before:bg-white/5";

    return (
      <motion.div
        ref={ref}
        className={cn(
          "group relative isolate overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl transition-all duration-500",
          "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition before:duration-500 hover:before:opacity-100",
          tintClass,
          glow && "shadow-[0_0_40px_-10px_rgba(52,245,182,0.35)]",
          "hover:border-white/20 hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]",
          className,
        )}
        {...rest}
      >
        <div className="pointer-events-none absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-emerald-glow/40 to-transparent opacity-60" />
        {children}
      </motion.div>
    );
  },
);
GlassCard.displayName = "GlassCard";
