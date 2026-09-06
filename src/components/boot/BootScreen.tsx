"use client";
import { useEffect, useState } from "react";

const BIOS_LINES = [
  "3AM OS BIOS v3.0.1998",
  "CPU: DAYDREAM CORE @ 33MHz ... OK",
  "MEMORY CHECK: 64MB VAPOR RAM ... OK",
  "VIBE MODULE: LOADED",
  "SNACKS.SYS: FOUND",
  "REALITY.DLL: NOT FOUND (SKIPPING)",
  "BUFFER: 99.4% WEIRD",
];

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const lineTimer = setInterval(() => setVisibleLines((n) => Math.min(n + 1, BIOS_LINES.length)), 350);
    const progressTimer = setInterval(() => setProgress((p) => Math.min(p + 7, 100)), 400);
    const onKey = () => onDone();
    window.addEventListener("keydown", onKey);
    return () => {
      clearInterval(lineTimer);
      clearInterval(progressTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, [onDone]);

  return (
    <div data-testid="boot-screen" onPointerDown={onDone}
      className="fixed inset-0 z-[30000] cursor-pointer bg-black p-6"
      style={{ fontFamily: "var(--font-plex-mono)" }}>
      <div className="text-sm" style={{ color: "#E0FFFF" }}>
        {BIOS_LINES.slice(0, visibleLines).map((l) => <p key={l}>{l}</p>)}
      </div>
      <div className="bevel-raised mx-auto mt-16 w-96 max-w-[90vw] p-1" style={{ background: "#C0C0C0" }}>
        <div className="px-2 py-1 text-xs font-bold" style={{ background: "#000080", color: "#fff" }}>
          DIAL-UP NETWORKING — Connecting to 3am.quest
        </div>
        <div className="p-3 text-xs text-black">
          <p className="mb-2">Dialing... verifying vibes... handshake at 56k</p>
          <div className="bevel-sunken h-4 w-full bg-white">
            <div className="h-full" style={{ width: `${progress}%`, background: "#FF85B3" }} />
          </div>
        </div>
      </div>
      <p className="mt-10 animate-pulse text-center font-bold" style={{ color: "#39FF14", fontFamily: "var(--font-silkscreen)" }}>
        PRESS ANY KEY TO ENTER THE OS ▮
      </p>
      <p className="absolute bottom-3 right-4 text-[10px] text-white/40">© 1998–2026 3AM OS · os.3am.quest</p>
    </div>
  );
}
