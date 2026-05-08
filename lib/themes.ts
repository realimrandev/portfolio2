/**
 * 5 cinematic themes for the portfolio.
 * Each theme defines CSS variables (HSL triplets so Tailwind <alpha-value> still works),
 * a unique particle mode, and a palette triad for the theme switcher preview.
 */

export type ThemeId = "forest" | "aurora" | "sunset" | "ocean" | "cosmos";

export type ParticleMode = "leaves" | "aurora" | "embers" | "bubbles" | "stars";

export interface ThemeDefinition {
  id: ThemeId;
  label: string;
  tag: string;
  palette: [string, string, string];
  particle: ParticleMode;
  /** Forest-scene lighting + atmosphere cues consumed by R3F scenes. */
  scene: {
    background: string;
    fog: string;
    ambient: string;
    sun: string;
    sunGlow: string;
    hemiTop: string;
    hemiBottom: string;
    stars: boolean;
  };
}

export const THEMES: Record<ThemeId, ThemeDefinition> = {
  forest: {
    id: "forest",
    label: "Emerald Forest",
    tag: "Moss · Fireflies · Moonlight",
    palette: ["#34f5b6", "#10b981", "#065f46"],
    particle: "leaves",
    scene: {
      background: "#03110d",
      fog: "#04231a",
      ambient: "#5cb89e",
      sun: "#ffd5a8",
      sunGlow: "#ffb37a",
      hemiTop: "#7be3c4",
      hemiBottom: "#02110b",
      stars: true,
    },
  },
  aurora: {
    id: "aurora",
    label: "Aurora Borealis",
    tag: "Cyan · Violet · Starlight",
    palette: ["#7aeaff", "#b985ff", "#66f5c5"],
    particle: "aurora",
    scene: {
      background: "#06081f",
      fog: "#0a0d3a",
      ambient: "#8a7dff",
      sun: "#d6aaff",
      sunGlow: "#8a7dff",
      hemiTop: "#7aeaff",
      hemiBottom: "#1b0a3d",
      stars: true,
    },
  },
  sunset: {
    id: "sunset",
    label: "Desert Sunset",
    tag: "Amber · Coral · Embers",
    palette: ["#ffb37a", "#ff6a3d", "#ff4865"],
    particle: "embers",
    scene: {
      background: "#180805",
      fog: "#3a1008",
      ambient: "#ff9966",
      sun: "#ffd08a",
      sunGlow: "#ff6a3d",
      hemiTop: "#ffa36b",
      hemiBottom: "#180805",
      stars: false,
    },
  },
  ocean: {
    id: "ocean",
    label: "Ocean Abyss",
    tag: "Aqua · Deep · Bubbles",
    palette: ["#5ad7ff", "#3b82f6", "#1e3a8a"],
    particle: "bubbles",
    scene: {
      background: "#020a1c",
      fog: "#052042",
      ambient: "#6bc8ff",
      sun: "#b6e8ff",
      sunGlow: "#5ad7ff",
      hemiTop: "#5ad7ff",
      hemiBottom: "#020a1c",
      stars: false,
    },
  },
  cosmos: {
    id: "cosmos",
    label: "Galactic Cosmos",
    tag: "Magenta · Nebula · Stars",
    palette: ["#e078ff", "#ff6bc8", "#9b5de5"],
    particle: "stars",
    scene: {
      background: "#050216",
      fog: "#1a0033",
      ambient: "#c57aff",
      sun: "#ffb0f0",
      sunGlow: "#e078ff",
      hemiTop: "#e078ff",
      hemiBottom: "#050216",
      stars: true,
    },
  },
};

export const THEME_IDS: ThemeId[] = ["forest", "aurora", "sunset", "ocean", "cosmos"];

export const DEFAULT_THEME: ThemeId = "forest";

export const THEME_STORAGE_KEY = "imran-portfolio-theme";

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === "string" && (THEME_IDS as string[]).includes(value);
}
