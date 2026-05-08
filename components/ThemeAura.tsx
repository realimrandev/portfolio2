"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useThemeMode } from "@/components/ThemeContext";
import type { ThemeId } from "@/lib/themes";

/**
 * Animated atmosphere overlay — rendered fixed full-screen behind all content.
 * Each theme has its own unique kinetic "aura" to make the site feel alive.
 */
export function ThemeAura() {
  const { themeId } = useThemeMode();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-[9] overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={themeId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <AuraForTheme themeId={themeId} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function AuraForTheme({ themeId }: { themeId: ThemeId }) {
  switch (themeId) {
    case "aurora":
      return <AuroraAura />;
    case "sunset":
      return <SunsetAura />;
    case "ocean":
      return <OceanAura />;
    case "cosmos":
      return <CosmosAura />;
    case "forest":
    default:
      return <ForestAura />;
  }
}

/* ----------------------------- Forest ----------------------------- */
function ForestAura() {
  return (
    <>
      <motion.div
        className="absolute -left-[10%] top-[-20%] h-[60vh] w-[60vw] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(52,245,182,0.22), transparent 60%)",
        }}
        animate={{ x: [0, 40, -20, 0], y: [0, 20, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-10%] top-[40%] h-[55vh] w-[55vw] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.18), transparent 60%)",
        }}
        animate={{ x: [0, -30, 20, 0], y: [0, -20, 10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

/* ----------------------------- Aurora ----------------------------- */
function AuroraAura() {
  return (
    <>
      <AuroraRibbon color1="#7aeaff" color2="#b985ff" top="6%" delay={0} />
      <AuroraRibbon color1="#66f5c5" color2="#7aeaff" top="22%" delay={1.2} />
      <AuroraRibbon color1="#b985ff" color2="#ff7ad9" top="42%" delay={2.4} />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[50vh] blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(122,234,255,0.22), transparent 70%)",
        }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

function AuroraRibbon({
  color1,
  color2,
  top,
  delay,
}: {
  color1: string;
  color2: string;
  top: string;
  delay: number;
}) {
  return (
    <motion.svg
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className="absolute left-0 h-[40vh] w-[140%] -translate-x-[10%] blur-2xl"
      style={{ top }}
      animate={{ x: ["-10%", "5%", "-10%"] }}
      transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <defs>
        <linearGradient id={`aurora-g-${top}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor={color1} stopOpacity="0" />
          <stop offset="45%" stopColor={color1} stopOpacity="0.55" />
          <stop offset="65%" stopColor={color2} stopOpacity="0.55" />
          <stop offset="100%" stopColor={color2} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        fill={`url(#aurora-g-${top})`}
        animate={{
          d: [
            "M0,160 C240,80 480,240 720,160 C960,80 1200,220 1440,140 L1440,320 L0,320 Z",
            "M0,180 C240,260 480,100 720,200 C960,280 1200,120 1440,200 L1440,320 L0,320 Z",
            "M0,160 C240,80 480,240 720,160 C960,80 1200,220 1440,140 L1440,320 L0,320 Z",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay }}
      />
    </motion.svg>
  );
}

/* ----------------------------- Sunset ----------------------------- */
function SunsetAura() {
  return (
    <>
      <motion.div
        className="absolute left-1/2 top-[-10%] h-[70vh] w-[70vw] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,138,61,0.35), rgba(255,72,101,0.15) 45%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 0.95, 0.7] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[40vh]"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(255,72,101,0.18))",
        }}
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[10%] top-[45%] h-[35vh] w-[35vw] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,179,122,0.22), transparent 60%)",
        }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

/* ----------------------------- Ocean ----------------------------- */
function OceanAura() {
  return (
    <>
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(90,215,255,0.22), transparent 60%)",
        }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-x-0 top-0 h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(180,235,255,0.45), transparent)",
            transform: `skewY(${-2 + i}deg)`,
          }}
          animate={{ y: ["-10vh", "110vh"] }}
          transition={{
            duration: 9 + i * 2,
            delay: i * 1.3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      <motion.div
        className="absolute bottom-[-15%] left-[20%] h-[45vh] w-[55vw] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.28), transparent 60%)",
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

/* ----------------------------- Cosmos ----------------------------- */
function CosmosAura() {
  return (
    <>
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, rgba(224,120,255,0.10), rgba(155,93,229,0.14), rgba(255,107,200,0.10), rgba(224,120,255,0.10))",
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute left-[20%] top-[10%] h-[45vh] w-[45vw] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(224,120,255,0.28), transparent 60%)",
        }}
        animate={{ x: [0, 40, -20, 0], y: [0, 20, 10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[10%] top-[50%] h-[35vh] w-[35vw] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,200,0.22), transparent 60%)",
        }}
        animate={{ x: [0, -30, 20, 0], y: [0, -20, 0, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {[0, 1, 2, 3].map((i) => (
        <ShootingStar key={i} delay={i * 2.3} top={`${10 + i * 18}%`} />
      ))}
    </>
  );
}

function ShootingStar({ delay, top }: { delay: number; top: string }) {
  return (
    <motion.div
      className="absolute h-[2px] w-[180px]"
      style={{
        top,
        background:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), rgba(224,120,255,0.8), transparent)",
        filter: "drop-shadow(0 0 6px rgba(224,120,255,0.8))",
      }}
      initial={{ x: "-20vw", opacity: 0 }}
      animate={{ x: "120vw", opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 2.4,
        delay,
        repeat: Infinity,
        repeatDelay: 6,
        ease: "easeOut",
      }}
    />
  );
}
