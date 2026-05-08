"use client";

import { useEffect, useState } from "react";

export interface MousePosition {
  x: number;
  y: number;
  /** Normalized to -1..1 around viewport center. */
  nx: number;
  ny: number;
}

export function useMouse() {
  const [mouse, setMouse] = useState<MousePosition>({ x: 0, y: 0, nx: 0, ny: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setMouse({
        x: e.clientX,
        y: e.clientY,
        nx: (e.clientX / w) * 2 - 1,
        ny: (e.clientY / h) * 2 - 1,
      });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return mouse;
}
