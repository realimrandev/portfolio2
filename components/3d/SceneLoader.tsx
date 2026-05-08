"use client";

import { Html, useProgress } from "@react-three/drei";

export function SceneLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2 text-center text-white">
        <div className="h-px w-32 overflow-hidden bg-white/10">
          <div
            className="h-full bg-emerald-glow transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="font-mono text-[10px] tracking-widest text-emerald-glow/80">
          Loading scene · {Math.floor(progress)}%
        </p>
      </div>
    </Html>
  );
}
