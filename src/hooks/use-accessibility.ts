import { useEffect, useState } from "react";

export function useAccessibility() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const s = parseFloat(localStorage.getItem("ncb-scale") || "1");
    setScale(isNaN(s) ? 1 : s);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--font-scale", String(scale));
    localStorage.setItem("ncb-scale", String(scale));
  }, [scale]);

  return {
    scale,
    setScale,
    decrease: () => setScale((s) => Math.max(0.85, +(s - 0.1).toFixed(2))),
    increase: () => setScale((s) => Math.min(1.3, +(s + 0.1).toFixed(2))),
    reset: () => setScale(1),
  };
}

