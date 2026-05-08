"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-72 overflow-hidden rounded-2xl border border-emerald-glow/30 bg-midnight-deep/95 p-5 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-glow/20">
                <MessageCircle className="h-5 w-5 text-emerald-glow" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{siteConfig.name}</p>
                <p className="text-xs text-emerald-glow/80">Online — replies fast</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Hey! 👋 Got a project in mind or just want to say hi? Drop a message
              and I&apos;ll get back to you within hours.
            </p>
            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-full bg-emerald-glow text-sm font-medium text-midnight-deep transition hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" />
              Open WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.1 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-emerald-glow text-midnight-deep shadow-[0_0_30px_rgba(52,245,182,0.5)]"
        aria-label={open ? "Close chat" : "Open WhatsApp chat"}
      >
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-emerald-glow/40 [animation-duration:2.4s]" />
        <span className="absolute inset-0 -z-10 rounded-full bg-emerald-glow/30 blur-xl" />
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
