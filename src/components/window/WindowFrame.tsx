"use client";
import { motion, useMotionValue, useDragControls } from "motion/react";
import { useEffect, type ReactNode, type RefObject } from "react";
import type { DesktopApp } from "@/apps/types";
import { useWindowStore, type WindowEntry } from "@/lib/windowStore";

// Taskbar is h-10 (40px, border-box) + the Ticker strip mounted below it in
// Task 8 (~21px) = 61px total, so fullscreen windows sit exactly below both.
export const TASKBAR_HEIGHT = 61;

export function WindowFrame({ app, entry, children, dragConstraintsRef }: {
  app: DesktopApp; entry: WindowEntry; children: ReactNode; dragConstraintsRef?: RefObject<HTMLElement | null>;
}) {
  const { close, minimize, focus, move, toggleFullscreen } = useWindowStore();
  const x = useMotionValue(entry.position.x);
  const y = useMotionValue(entry.position.y);
  const controls = useDragControls();
  const fullscreen = entry.mode === "fullscreen";

  useEffect(() => {
    x.set(entry.position.x);
    y.set(entry.position.y);
  }, [entry.position.x, entry.position.y, x, y]);

  return (
    <motion.section
      layout
      drag={!fullscreen}
      dragMomentum={false}
      dragListener={false}
      dragControls={controls}
      dragConstraints={dragConstraintsRef}
      style={
        fullscreen
          ? { position: "fixed", top: TASKBAR_HEIGHT, left: 0, right: 0, bottom: 0, zIndex: entry.zIndex }
          : { position: "absolute", x, y, width: app.defaultSize.width, height: app.defaultSize.height, zIndex: entry.zIndex }
      }
      onPointerDown={() => focus(app.id)}
      onDragEnd={() => move(app.id, { x: x.get(), y: y.get() })}
      className="bevel-raised flex flex-col"
      aria-label={app.title}
    >
      <TitleBar
        app={app}
        fullscreen={fullscreen}
        onDragStart={(e) => controls.start(e)}
        onMinimize={() => minimize(app.id)}
        onToggleFullscreen={() => toggleFullscreen(app.id)}
        onClose={() => close(app.id)}
      />
      <div className="flex-1 overflow-auto" style={{ background: "var(--window-bg)" }}>
        {children}
      </div>
    </motion.section>
  );
}

function TitleBar({ app, fullscreen, onDragStart, onMinimize, onToggleFullscreen, onClose }: {
  app: DesktopApp; fullscreen: boolean;
  onDragStart: (e: React.PointerEvent) => void;
  onMinimize: () => void; onToggleFullscreen: () => void; onClose: () => void;
}) {
  return (
    <header
      className="flex cursor-move select-none items-center justify-between px-2 py-1"
      style={{ background: "var(--title-bar)", color: "var(--title-text)", fontFamily: "var(--font-plex-mono)" }}
      onPointerDown={onDragStart}
      onDoubleClick={onToggleFullscreen}
    >
      <span className="text-sm font-bold">{app.title}</span>
      <span className="flex gap-1">
        <TitleButton label="Minimize" onClick={onMinimize}>_</TitleButton>
        <TitleButton label="Maximize" onClick={onToggleFullscreen}>{fullscreen ? "❐" : "□"}</TitleButton>
        <TitleButton label="Close" onClick={onClose}>✕</TitleButton>
      </span>
    </header>
  );
}

function TitleButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      aria-label={label}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onDoubleClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      className="bevel-raised h-5 w-5 text-xs leading-none active:bevel-sunken"
      style={{ color: "var(--text)" }}
    >
      {children}
    </button>
  );
}
