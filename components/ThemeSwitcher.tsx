"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Palette, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useThemeMode } from "@/components/ThemeContext";
import type { ThemeDefinition } from "@/lib/themes";

export function ThemeSwitcher() {
  const { themeId, theme, themes, setTheme } = useThemeMode();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest("[data-theme-switcher]")) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" data-theme-switcher>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change theme"
        className="group relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur transition hover:border-emerald-glow/40 hover:text-emerald-glow"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60 transition group-hover:opacity-100"
          style={{
            background: mounted
              ? `conic-gradient(from 0deg, ${theme.palette[0]}, ${theme.palette[1]}, ${theme.palette[2]}, ${theme.palette[0]})`
              : undefined,
            filter: "blur(6px)",
          }}
        />
        <Palette className="relative h-4 w-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-12 z-[70] w-72 overflow-hidden rounded-2xl border border-white/10 bg-midnight-deep/90 p-2 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
          >
            <p className="px-3 pb-2 pt-2 text-[10px] uppercase tracking-[0.3em] text-white/50">
              Cinematic Themes
            </p>
            <ul className="flex flex-col gap-1">
              {themes.map((t, i) => (
                <ThemeOption
                  key={t.id}
                  theme={t}
                  active={themeId === t.id}
                  index={i}
                  onSelect={() => {
                    setTheme(t.id);
                    setOpen(false);
                  }}
                />
              ))}
            </ul>
            <p className="px-3 pb-2 pt-3 text-[10px] leading-relaxed text-white/40">
              Every theme remixes colors, particles &amp; scene lighting in real time.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ThemeOption({
  theme,
  active,
  index,
  onSelect,
}: {
  theme: ThemeDefinition;
  active: boolean;
  index: number;
  onSelect: () => void;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
    >
      <button
        type="button"
        role="menuitemradio"
        aria-checked={active}
        onClick={onSelect}
        className={cn(
          "group flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-left transition",
          active
            ? "border-emerald-glow/30 bg-emerald-glow/10"
            : "hover:border-white/10 hover:bg-white/5",
        )}
      >
        <span
          aria-hidden
          className="relative grid h-9 w-9 flex-none place-items-center overflow-hidden rounded-full ring-1 ring-white/10"
          style={{
            background: `conic-gradient(from 0deg, ${theme.palette[0]}, ${theme.palette[1]}, ${theme.palette[2]}, ${theme.palette[0]})`,
          }}
        >
          <span className="absolute inset-1 rounded-full bg-midnight-deep/60" />
          <span
            className="relative h-3 w-3 rounded-full"
            style={{
              background: theme.palette[0],
              boxShadow: `0 0 12px ${theme.palette[0]}`,
            }}
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-white">
            {theme.label}
          </span>
          <span className="block truncate text-[10px] uppercase tracking-[0.22em] text-white/45">
            {theme.tag}
          </span>
        </span>
        <AnimatePresence>
          {active && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="grid h-5 w-5 place-items-center rounded-full bg-emerald-glow/20 text-emerald-glow"
            >
              <Check className="h-3 w-3" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </motion.li>
  );
}
