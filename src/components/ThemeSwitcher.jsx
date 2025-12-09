import React, { useEffect } from "react";
import { useStore } from "../store/useStore";

/**
 * ThemeSwitcher — toggles data-theme on documentElement
 * themes: light, dark, sunset
 */
const THEMES = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "sunset", label: "Sunset" },
];

export default function ThemeSwitcher() {
  const theme = useStore((s) => s.theme);
  const setTheme = useStore((s) => s.setTheme);

  useEffect(() => {
    // set data-theme attribute on root; CSS in index.css will react to it
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <div className="flex items-center gap-2">
      {THEMES.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`px-3 py-1 rounded text-sm border ${
            theme === t.id ? "shadow-md" : "opacity-80"
          }`}
          title={`Switch to ${t.label}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
