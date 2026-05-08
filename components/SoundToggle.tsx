"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/hooks/use-sound";

const AMBIENT_SOUND =
  "https://cdn.pixabay.com/audio/2022/03/15/audio_4b5ea96b58.mp3";

export function SoundToggle() {
  const { enabled, toggle } = useSound(AMBIENT_SOUND, { volume: 0.25 });

  return (
    <button
      onClick={toggle}
      aria-label={enabled ? "Mute ambient sound" : "Play ambient sound"}
      className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 backdrop-blur transition hover:border-emerald-glow/30 hover:text-emerald-glow"
    >
      {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );
}
