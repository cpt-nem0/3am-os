"use client";
import { useEffect, useRef, useState } from "react";
import { getApp } from "@/apps/registry";
import { useWindowStore } from "@/lib/windowStore";
import { writeDeepLink } from "@/lib/deepLink";
import { toggleVibe, getInitialVibe, type Vibe } from "@/lib/vibe";
import { StartMenu } from "@/components/taskbar/StartMenu";
import { Clock } from "@/components/taskbar/Clock";

export function Taskbar({ onShutdown, onRestart, menuDirection = "down" }: {
  onShutdown: () => void; onRestart: () => void; menuDirection?: "down" | "up";
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [vibe, setVibe] = useState<Vibe | null>(null);
  const startAreaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: hydration-safe client-only state (SSR must render the null branch)
    setVibe(getInitialVibe());
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!startAreaRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);
  const windows = useWindowStore((s) => s.windows);
  const { restore, focus, open } = useWindowStore();

  return (
    <div className="bevel-raised relative z-[10000] flex h-10 items-center gap-2 px-1" style={{ fontFamily: "var(--font-plex-mono)" }}>
      <div ref={startAreaRef} className="contents">
        <button
          className="bevel-raised rounded-full px-3 py-1 text-sm font-bold active:bevel-sunken"
          aria-label="Start"
          onClick={() => setMenuOpen((v) => !v)}
        >
          ▞ Start
        </button>
        {menuOpen && (
          <StartMenu
            onClose={() => setMenuOpen(false)}
            onShutdown={onShutdown}
            onRestart={onRestart}
            onOpenManifesto={() => { open("manifesto", { mode: "windowed" }); writeDeepLink("manifesto"); }}
            direction={menuDirection}
          />
        )}
      </div>
      <div className="flex flex-1 gap-1 overflow-x-auto">
        {Object.values(windows).map((w) => {
          const app = getApp(w.appId);
          if (!app) return null;
          const minimized = w.mode === "minimized";
          return (
            <button key={w.appId}
              className={`${minimized ? "bevel-raised" : "bevel-sunken"} max-w-40 truncate px-2 py-0.5 text-xs`}
              onClick={() => (minimized ? restore(w.appId) : focus(w.appId))}>
              {app.icon} {app.title.split(" [")[0]}
            </button>
          );
        })}
      </div>
      <button className="bevel-raised px-2 py-1 text-xs active:bevel-sunken" aria-label="Vibe toggle" onClick={() => setVibe(toggleVibe())}>
        {vibe === "light" ? "☀ Vibe: Light Surf" : "☾ Vibe: Midnight Surf"}
      </button>
      <Clock />
    </div>
  );
}
