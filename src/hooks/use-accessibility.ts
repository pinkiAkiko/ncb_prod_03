import { useEffect, useState } from "react";

export function useAccessibility() {
  const [scale, setScale] = useState(1);
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const s = parseFloat(localStorage.getItem("ncb-scale") || "1");
    setScale(isNaN(s) ? 1 : s);
    
    const t = localStorage.getItem("ncb-theme");
    setTheme(t);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--font-scale", String(scale));
    localStorage.setItem("ncb-scale", String(scale));
  }, [scale]);

  useEffect(() => {
    // Remove all theme classes first
    document.documentElement.classList.remove("theme-ocean");
    
    if (theme) {
      document.documentElement.classList.add(theme);
      localStorage.setItem("ncb-theme", theme);
    } else {
      localStorage.removeItem("ncb-theme");
    }
  }, [theme]);

  return {
    scale,
    setScale,
    decrease: () => setScale((s) => Math.max(0.85, +(s - 0.1).toFixed(2))),
    increase: () => setScale((s) => Math.min(1.3, +(s + 0.1).toFixed(2))),
    reset: () => setScale(1),
    theme,
    setTheme,
  };
}
