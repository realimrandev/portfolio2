"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface VideoSectionProps {
  src: string;
  poster?: string;
  overlay?: React.ReactNode;
  className?: string;
  parallax?: boolean;
}

export function VideoSection({
  src,
  poster,
  overlay,
  className,
  parallax = true,
}: VideoSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], parallax ? ["-12%", "12%"] : ["0%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full overflow-hidden rounded-3xl border border-white/10",
        className,
      )}
    >
      <motion.video
        style={{ y, scale }}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        className="h-full w-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </motion.video>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-midnight-deep/30 via-transparent to-midnight-deep/70" />
      {overlay && (
        <div className="absolute inset-0 grid place-items-center p-6">{overlay}</div>
      )}
    </div>
  );
}
