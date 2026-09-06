"use client";
export function ShutdownOverlay({ onReboot }: { onReboot: () => void }) {
  return (
    <button onClick={onReboot} className="fixed inset-0 z-[20000] bg-black text-center" aria-label="Reboot">
      <p className="text-lg" style={{ color: "#FF7F00", fontFamily: "var(--font-silkscreen)" }}>
        It is now safe to close this tab.
      </p>
      <p className="mt-2 text-xs text-white/50">(click anywhere to reboot)</p>
    </button>
  );
}
