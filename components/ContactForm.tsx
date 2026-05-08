"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Loader2, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "sending" | "sent";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    // Fallback: open the user's mail client with a prepared draft.
    const mailto = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
      form.subject || "New project enquiry",
    )}&body=${encodeURIComponent(
      `${form.message}\n\n— ${form.name}\n${form.email}`,
    )}`;
    setTimeout(() => {
      window.location.href = mailto;
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 4000);
    }, 800);
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Your name</Label>
          <Input
            id="name"
            required
            placeholder="Jane Doe"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="jane@studio.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          placeholder="Cinematic landing page for our SaaS"
          value={form.subject}
          onChange={(e) => update("subject", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          required
          placeholder="Tell me about your project, timeline, and goals..."
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          rows={6}
        />
      </div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-white/40">
          Or DM me on <a href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="text-emerald-glow hover:underline">WhatsApp</a> for a faster reply.
        </p>
        <button
          type="submit"
          disabled={status !== "idle"}
          className="group inline-flex h-12 items-center gap-2 rounded-full bg-emerald-glow px-6 text-sm font-medium text-midnight-deep shadow-[0_0_20px_rgba(52,245,182,0.4)] transition hover:shadow-[0_0_40px_rgba(52,245,182,0.6)] disabled:opacity-70"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : status === "sent" ? (
            <>
              <Check className="h-4 w-4" />
              Sent!
            </>
          ) : (
            <>
              <Send className="h-4 w-4 transition group-hover:translate-x-0.5" />
              Send message
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
}
