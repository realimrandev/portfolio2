"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const total = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / total);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] grid place-items-center bg-midnight-deep"
        >
          <div className="absolute inset-0 bg-radial-glow opacity-60" />
          <div className="absolute inset-0 bg-grid-emerald bg-[size:48px_48px] opacity-[0.07]" />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center gap-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="relative h-24 w-24"
            >
              <div className="absolute inset-0 rounded-full border border-emerald-glow/30" />
              <div className="absolute inset-2 rounded-full border border-emerald-glow/20" />
              <div className="absolute inset-4 rounded-full border-2 border-transparent border-t-emerald-glow border-r-emerald-glow/40 shadow-[0_0_30px_rgba(52,245,182,0.3)]" />
              <div className="absolute inset-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-glow" />
            </motion.div>

            <div className="flex flex-col items-center gap-3">
              <p className="font-display text-2xl tracking-tight text-white">
                {siteConfig.name}
              </p>
              <p className="text-[10px] uppercase tracking-[0.5em] text-emerald-glow/80">
                Entering the world
              </p>
            </div>

            <div className="h-px w-72 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-glow/40 via-emerald-glow to-emerald-glow/40"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            <p className="font-mono text-[10px] tracking-widest text-white/40">
              {Math.round(progress * 100).toString().padStart(3, "0")}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
