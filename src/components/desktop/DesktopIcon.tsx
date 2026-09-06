"use client";
import type { DesktopApp } from "@/apps/types";

export function DesktopIcon({
  app,
  x,
  y,
  onOpen,
  openOn = "doubleClick",
  mobile = false,
}: {
  app: DesktopApp;
  x: number;
  y: number;
  onOpen: () => void;
  openOn?: "click" | "doubleClick";
  mobile?: boolean;
}) {
  return (
    <button
      className={
        mobile
          ? "flex w-20 flex-col items-center gap-1 p-1 text-center text-xs hover:bg-[color:var(--title-bar)]/20"
          : "absolute flex w-20 flex-col items-center gap-1 p-1 text-center text-xs hover:bg-[color:var(--title-bar)]/20"
      }
      style={mobile ? { fontFamily: "var(--font-plex-mono)" } : { left: x, top: y, fontFamily: "var(--font-plex-mono)" }}
      onClick={openOn === "click" ? onOpen : undefined}
      onDoubleClick={openOn === "doubleClick" ? onOpen : undefined}
      aria-label={app.title}
    >
      <span className="text-3xl">{app.icon}</span>
      <span className="w-full break-words">{app.title.split(" [")[0]}</span>
    </button>
  );
}
