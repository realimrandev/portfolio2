"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_THEME,
  THEMES,
  THEME_IDS,
  THEME_STORAGE_KEY,
  type ThemeDefinition,
  type ThemeId,
  isThemeId,
} from "@/lib/themes";

interface ThemeContextValue {
  themeId: ThemeId;
  theme: ThemeDefinition;
  setTheme: (id: ThemeId) => void;
  cycleTheme: () => void;
  themes: ThemeDefinition[];
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyThemeClass(id: ThemeId) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  THEME_IDS.forEach((t) => html.classList.remove(`theme-${t}`));
  html.classList.add(`theme-${id}`);
  html.setAttribute("data-theme", id);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeIdState] = useState<ThemeId>(DEFAULT_THEME);

  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? window.localStorage.getItem(THEME_STORAGE_KEY)
        : null;
    const initial: ThemeId = isThemeId(stored) ? stored : DEFAULT_THEME;
    setThemeIdState(initial);
    applyThemeClass(initial);
  }, []);

  const setTheme = useCallback((id: ThemeId) => {
    setThemeIdState(id);
    applyThemeClass(id);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, id);
      } catch {
        /* ignore storage errors */
      }
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("themechange", { detail: id }));
    }
  }, []);

  const cycleTheme = useCallback(() => {
    const idx = THEME_IDS.indexOf(themeId);
    const next = THEME_IDS[(idx + 1) % THEME_IDS.length];
    setTheme(next);
  }, [themeId, setTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      themeId,
      theme: THEMES[themeId],
      setTheme,
      cycleTheme,
      themes: THEME_IDS.map((id) => THEMES[id]),
    }),
    [themeId, setTheme, cycleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeMode(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    // Safe fallback so non-wrapped components (e.g. error boundaries) don't crash.
    return {
      themeId: DEFAULT_THEME,
      theme: THEMES[DEFAULT_THEME],
      setTheme: () => {},
      cycleTheme: () => {},
      themes: THEME_IDS.map((id) => THEMES[id]),
    };
  }
  return ctx;
}
