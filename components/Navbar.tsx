"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { SoundToggle } from "@/components/SoundToggle";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <div
        className={cn(
          "mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl border border-white/5 px-4 transition-all duration-500 sm:px-6",
          scrolled
            ? "bg-midnight-deep/70 backdrop-blur-2xl shadow-[0_8px_30px_-10px_rgba(0,0,0,0.5)] border-white/10"
            : "bg-white/[0.02] backdrop-blur-md",
        )}
      >
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-display text-lg tracking-tight text-white"
        >
          <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-emerald-glow/30 to-forest-700/30 ring-1 ring-emerald-glow/40 transition-all duration-500 group-hover:ring-emerald-glow/80 group-hover:shadow-[0_0_20px_-2px_rgba(52,245,182,0.6)]">
            <Image
              src={siteConfig.avatar}
              alt={siteConfig.name}
              fill
              sizes="36px"
              className="object-cover"
            />
          </span>
          <span className="font-medium">
            Imran<span className="text-emerald-glow">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {siteConfig.nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-white"
                    : "text-white/60 hover:text-white",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/10 ring-1 ring-emerald-glow/30"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <SoundToggle />
            <ThemeSwitcher />
          </div>
          <div className="hidden md:block">
            <AnimatedButton href="/contact" size="sm" variant="primary">
              Hire Me
            </AnimatedButton>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur lg:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm">
              <div className="flex h-full flex-col gap-8 pt-12">
                <AnimatePresence>
                  <motion.nav
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: { transition: { staggerChildren: 0.05 } },
                    }}
                    className="flex flex-col gap-2"
                  >
                    {siteConfig.nav.map((item) => (
                      <motion.div
                        key={item.href}
                        variants={{
                          hidden: { opacity: 0, x: 20 },
                          visible: { opacity: 1, x: 0 },
                        }}
                      >
                        <Link
                          onClick={() => setOpen(false)}
                          href={item.href}
                          className="group flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-5 py-4 text-base font-medium text-white/80 transition hover:border-emerald-glow/30 hover:bg-emerald-glow/5 hover:text-white"
                        >
                          {item.label}
                          <span className="text-xs text-emerald-glow opacity-0 transition group-hover:opacity-100">
                            →
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.nav>
                </AnimatePresence>
                <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-6">
                  <SoundToggle />
                  <ThemeSwitcher />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
