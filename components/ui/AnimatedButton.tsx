"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "glass" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: React.ReactNode;
  external?: boolean;
}

export function AnimatedButton({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className,
  icon,
  external,
}: AnimatedButtonProps) {
  const sizeStyles = {
    sm: "h-10 px-5 text-xs",
    md: "h-12 px-7 text-sm",
    lg: "h-14 px-9 text-base",
  }[size];

  const variantStyles = {
    primary:
      "bg-emerald-glow text-midnight-deep shadow-[0_0_20px_rgba(52,245,182,0.3)] hover:shadow-[0_0_40px_rgba(52,245,182,0.55)]",
    glass:
      "border border-white/10 bg-white/5 text-white backdrop-blur-xl hover:bg-white/10 hover:border-emerald-glow/40",
    outline:
      "border border-emerald-glow/40 text-emerald-glow hover:bg-emerald-glow/10",
  }[variant];

  const inner = (
    <motion.span
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      className={cn(
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-full font-medium tracking-wide transition-all duration-300",
        sizeStyles,
        variantStyles,
        className,
      )}
    >
      <span className="absolute inset-0 -z-10 translate-x-[-110%] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[110%]" />
      <span>{children}</span>
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        {icon ?? <ArrowRight className="h-4 w-4" />}
      </span>
    </motion.span>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className="inline-block">
        {inner}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className="inline-block bg-transparent p-0">
      {inner}
    </button>
  );
}
