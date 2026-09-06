"use client";
import { useState } from "react";
import { useTickerStore } from "@/lib/tickerStore";

export function useContextMenu() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  return {
    pos,
    onContextMenu: (e: React.MouseEvent) => { e.preventDefault(); setPos({ x: e.clientX, y: e.clientY }); },
    close: () => setPos(null),
  };
}

export function ContextMenu({ pos, close }: { pos: { x: number; y: number }; close: () => void }) {
  const next = useTickerStore((s) => s.next);
  const [quip, setQuip] = useState("");
  return (
    <nav role="menu" className="bevel-raised fixed z-[15000] w-52 py-1 text-sm" style={{ left: pos.x, top: pos.y, fontFamily: "var(--font-plex-mono)" }}>
      <Item onClick={() => { next(); close(); }}>Refresh Vibes</Item>
      <Item onClick={() => setQuip("the folder declined to exist.")}>New Folder</Item>
      <Item onClick={() => { setQuip("wallpaper picker coming soon™"); }}>Display Properties…</Item>
      {quip && <p className="px-3 py-1 text-xs opacity-60">{quip}</p>}
    </nav>
  );
}

function Item({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button role="menuitem" onClick={onClick}
      className="block w-full px-3 py-1 text-left hover:bg-[color:var(--title-bar)] hover:text-[color:var(--title-text)]">
      {children}
    </button>
  );
}
