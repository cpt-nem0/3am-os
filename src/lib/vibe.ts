export type Vibe = "light" | "midnight";
const KEY = "3amos-vibe";

export function getInitialVibe(): Vibe {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "light" || v === "midnight") return v;
  } catch {}
  return "midnight";
}

export function applyVibe(v: Vibe): void {
  document.documentElement.dataset.vibe = v;
  try {
    localStorage.setItem(KEY, v);
  } catch {}
}

export function toggleVibe(): Vibe {
  const current = document.documentElement.dataset.vibe === "light" ? "light" : "midnight";
  const next: Vibe = current === "midnight" ? "light" : "midnight";
  applyVibe(next);
  return next;
}
