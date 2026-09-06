"use client";
import { useEffect, useRef, useState } from "react";
import { registry, getApp } from "@/apps/registry";
import { useWindowStore } from "@/lib/windowStore";
import { parseDeepLink, writeDeepLink } from "@/lib/deepLink";
import { WindowLayer } from "@/components/window/WindowLayer";
import { DesktopIcon } from "@/components/desktop/DesktopIcon";
import { ICON_LAYOUT } from "@/components/desktop/iconLayout";
import { Taskbar } from "@/components/taskbar/Taskbar";
import { Ticker } from "@/components/taskbar/Ticker";
import { ShutdownOverlay } from "@/components/taskbar/ShutdownOverlay";
import { ContextMenu, useContextMenu } from "@/components/desktop/ContextMenu";
import { BootScreen } from "@/components/boot/BootScreen";
import { hasBooted, markBooted, clearBooted } from "@/lib/bootFlag";
import { useIsMobile } from "@/lib/useIsMobile";

export function Desktop() {
  const open = useWindowStore((s) => s.open);
  const windows = useWindowStore((s) => s.windows);
  const [shutdown, setShutdown] = useState(false);
  const [booting, setBooting] = useState<boolean | null>(null);
  const mobile = useIsMobile();
  const desktopRef = useRef<HTMLElement>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: hydration-safe client-only state (SSR must render the null branch)
    setBooting(!hasBooted());
    const id = parseDeepLink(window.location.search, registry.map((a) => a.id));
    if (id) {
      const app = getApp(id)!;
      useWindowStore.getState().open(id, { mode: app.defaultMode });
    }
  }, []);
  const prevCount = useRef(0);
  useEffect(() => {
    const count = Object.keys(windows).length;
    if (prevCount.current > 0 && count === 0) writeDeepLink(null);
    prevCount.current = count;
  }, [windows]);
  const finishBoot = () => { markBooted(); setBooting(false); };
  const restart = () => { clearBooted(); setBooting(true); };
  const menu = useContextMenu();
  return (
    <div className="flex h-dvh w-dvw flex-col overflow-hidden">
      {/*
        Taskbar and Ticker are always mounted here, in this order, so crossing the
        768px breakpoint only changes this wrapper's classes (and menuDirection) —
        it never unmounts/remounts them, which would otherwise drop Taskbar's
        menuOpen/vibe state. `flex-col-reverse` on mobile flips the *visual* order
        (Ticker on top, Taskbar anchored to the fixed block's bottom edge) without
        touching DOM order.
      */}
      <div className={mobile ? "fixed inset-x-0 bottom-0 z-[10000] flex flex-col-reverse" : undefined}>
        <Taskbar onShutdown={() => setShutdown(true)} onRestart={restart} menuDirection={mobile ? "up" : "down"} />
        <Ticker />
      </div>
      <main
        ref={desktopRef}
        role="main"
        className={`relative flex-1 ${mobile ? "overflow-y-auto pb-16" : "overflow-hidden"}`}
        style={{ background: "var(--desktop-bg)" }}
        onContextMenu={mobile ? undefined : menu.onContextMenu}
        onClick={menu.close}
      >
        <div className={mobile ? "flex flex-wrap gap-1 p-2" : undefined}>
          {registry.map((app, i) => {
            // hidden only excludes an app from the Start menu; every registered
            // app still gets a desktop icon. ICON_LAYOUT is an optional position
            // override, else fall back to a column-flow layout.
            const pos = ICON_LAYOUT.find((l) => l.appId === app.id);
            const x = pos ? pos.x : 24 + Math.floor(i / 4) * 96;
            const y = pos ? pos.y : 90 + (i % 4) * 96;
            return (
              <DesktopIcon
                key={app.id}
                app={app}
                x={x}
                y={y}
                mobile={mobile}
                openOn={mobile ? "click" : "doubleClick"}
                onOpen={() => { open(app.id, { mode: app.defaultMode }); writeDeepLink(app.id); }}
              />
            );
          })}
        </div>
        <WindowLayer dragConstraintsRef={desktopRef} />
      </main>
      {!mobile && menu.pos && <ContextMenu pos={menu.pos} close={menu.close} />}
      {shutdown && <ShutdownOverlay onReboot={() => location.reload()} />}
      {booting && <BootScreen onDone={finishBoot} />}
    </div>
  );
}
