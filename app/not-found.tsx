"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { Compass, Home } from "lucide-react";

const LostForest404 = dynamic(
  () => import("@/components/3d/LostForest404").then((m) => m.LostForest404),
  { ssr: false },
);

export default function NotFound() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-midnight-deep">
      <LostForest404 />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight-deep via-midnight-deep/20 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-glow/30 bg-emerald-glow/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.4em] text-emerald-glow"
        >
          <Compass className="h-3 w-3" /> Lost in the forest
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-6 font-display text-7xl font-light leading-none text-white sm:text-8xl"
        >
          4<span className="text-emerald-glow">0</span>4
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-6 max-w-md text-base text-white/60"
        >
          The path you&apos;re looking for has wandered off into the woods.
          Follow the lantern&apos;s light and find your way home.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-10"
        >
          <Link
            href="/"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-emerald-glow px-6 text-sm font-medium text-midnight-deep shadow-[0_0_30px_rgba(52,245,182,0.45)] transition hover:opacity-90"
          >
            <Home className="h-4 w-4" />
            Find your way home
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
