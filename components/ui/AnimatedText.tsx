"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  staggerWords?: boolean;
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  as = "p",
  staggerWords = false,
}: AnimatedTextProps) {
  const Tag = motion[as];
  const tokens = staggerWords ? text.split(" ") : text.split("");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerWords ? 0.06 : 0.025,
        delayChildren: delay,
      },
    },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: "60%", filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <Tag
      className={cn("inline-block", className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      <span className="sr-only">{text}</span>
      {tokens.map((token, i) => (
        <span
          key={i}
          aria-hidden
          className="relative inline-block overflow-hidden align-bottom"
          style={{ marginRight: staggerWords ? "0.25em" : undefined }}
        >
          <motion.span variants={childVariants} className="inline-block">
            {token === " " ? "\u00A0" : token}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
