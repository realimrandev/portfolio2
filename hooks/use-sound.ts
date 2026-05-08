"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Lazily-loaded ambient audio with mute toggle.
 * Audio is gated by user gesture to satisfy autoplay policies.
 */
export function useSound(src: string, { volume = 0.35, loop = true } = {}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio(src);
    audio.preload = "auto";
    audio.loop = loop;
    audio.volume = volume;
    audio.oncanplaythrough = () => setReady(true);
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [src, loop, volume]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (enabled) {
      audio.pause();
      setEnabled(false);
    } else {
      void audio.play().catch(() => {});
      setEnabled(true);
    }
  }, [enabled]);

  return { enabled, ready, toggle };
}
