"use client";
import { Suspense } from "react";
import { useWindowStore } from "@/lib/windowStore";
import { getApp } from "@/apps/registry";

export function MobileStack() {
  const windows = useWindowStore((s) => s.windows);
  const { close, minimize } = useWindowStore();
  return (
    <div className="flex flex-col gap-3 overflow-y-auto p-2 pb-16">
      {Object.values(windows)
        .filter((w) => w.mode !== "minimized")
        .map((w) => {
          const app = getApp(w.appId);
          if (!app) return null;
          const Body = app.component;
          return (
            <section key={w.appId} className="bevel-raised">
              <header className="sticky top-0 flex items-center justify-between px-2 py-1"
                style={{ background: "var(--title-bar)", color: "var(--title-text)", fontFamily: "var(--font-plex-mono)" }}>
                <span className="truncate text-sm font-bold">{app.title}</span>
                <span className="flex gap-1">
                  <button aria-label="Minimize" className="bevel-raised h-5 w-5 text-xs" style={{ color: "var(--text)" }} onClick={() => minimize(w.appId)}>_</button>
                  <button aria-label="Close" className="bevel-raised h-5 w-5 text-xs" style={{ color: "var(--text)" }} onClick={() => close(w.appId)}>✕</button>
                </span>
              </header>
              <div style={{ background: "var(--window-bg)" }}>
                <Suspense fallback={<p className="p-4 text-xs">loading…</p>}><Body /></Suspense>
              </div>
            </section>
          );
        })}
    </div>
  );
}
