"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  highlight?: string;
}

const items: TimelineItem[] = [
  {
    year: "2023",
    title: "Started the Journey",
    description:
      "Began the Web Development course at Corvit Systems — built foundations in HTML, CSS, and the DOM.",
    highlight: "Corvit",
  },
  {
    year: "2024 · Q1",
    title: "First Production Builds",
    description:
      "Shipped Typing Test, Active User dashboard, and a Mini Project sandbox to GitHub Pages.",
    highlight: "Vanilla JS",
  },
  {
    year: "2024 · Q3",
    title: "Tools & Apps",
    description:
      "Designed Expense Tracker with localStorage, animated charts, and a mobile-first dashboard.",
    highlight: "UX",
  },
  {
    year: "2025",
    title: "Cinematic Web",
    description:
      "Going deep on React, Next.js, Three.js and motion design — building cinematic interactive experiences.",
    highlight: "Now",
  },
];

export function Timeline() {
  return (
    <ol className="relative space-y-10 border-l border-white/10 pl-8">
      <span className="pointer-events-none absolute left-0 top-0 h-full w-px bg-gradient-to-b from-emerald-glow/60 via-emerald-glow/20 to-transparent" />
      {items.map((item, i) => (
        <TimelineRow key={item.year} item={item} index={i} />
      ))}
    </ol>
  );
}

function TimelineRow({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <span className="absolute -left-[37px] top-1.5 grid h-5 w-5 place-items-center rounded-full border border-emerald-glow/40 bg-midnight-deep">
        <span className="h-2 w-2 rounded-full bg-emerald-glow shadow-[0_0_12px_rgba(52,245,182,0.7)]" />
      </span>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-glow/80">
          {item.year}
        </span>
        {item.highlight && (
          <span className={cn(
            "rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-white/50",
          )}>
            {item.highlight}
          </span>
        )}
      </div>
      <h4 className="mt-2 font-display text-2xl font-light text-white">
        {item.title}
      </h4>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-white/60">
        {item.description}
      </p>
    </motion.li>
  );
}
