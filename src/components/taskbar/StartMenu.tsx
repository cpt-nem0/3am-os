"use client";
import { registry } from "@/apps/registry";
import { useWindowStore } from "@/lib/windowStore";
import { writeDeepLink } from "@/lib/deepLink";

export function StartMenu({ onClose, onShutdown, onRestart, onOpenManifesto, direction = "down" }: {
  onClose: () => void; onShutdown: () => void; onRestart: () => void; onOpenManifesto: () => void;
  direction?: "down" | "up";
}) {
  const open = useWindowStore((s) => s.open);
  return (
    <nav
      role="menu"
      className={`bevel-raised absolute left-1 z-[10000] w-64 py-1 ${direction === "up" ? "bottom-full" : "top-full"}`}
      style={{ fontFamily: "var(--font-plex-mono)" }}
    >
      {registry.filter((a) => !a.hidden).map((app) => (
        <MenuItem key={app.id} onClick={() => { open(app.id, { mode: app.defaultMode }); writeDeepLink(app.id); onClose(); }}>
          {app.icon} {app.title.split(" [")[0]}
        </MenuItem>
      ))}
      <hr className="my-1" style={{ borderColor: "var(--bevel-lo)" }} />
      <MenuItem onClick={() => { onOpenManifesto(); onClose(); }}>📄 Read Manifesto</MenuItem>
      <MenuItem onClick={() => { onRestart(); onClose(); }}>🔄 Restart...</MenuItem>
      <MenuItem onClick={() => { onShutdown(); onClose(); }}>⏻ Shut Down...</MenuItem>
    </nav>
  );
}

function MenuItem({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button role="menuitem" onClick={onClick}
      className="block w-full px-3 py-1.5 text-left text-sm hover:bg-[color:var(--title-bar)] hover:text-[color:var(--title-text)]">
      {children}
    </button>
  );
}
