"use client";
import { Suspense, type RefObject } from "react";
import { useWindowStore } from "@/lib/windowStore";
import { getApp } from "@/apps/registry";
import { WindowFrame } from "@/components/window/WindowFrame";
import { useIsMobile } from "@/lib/useIsMobile";
import { MobileStack } from "@/components/window/MobileStack";

export function WindowLayer({ dragConstraintsRef }: { dragConstraintsRef: RefObject<HTMLElement | null> }) {
  const windows = useWindowStore((s) => s.windows);
  const mobile = useIsMobile();
  if (mobile) return <MobileStack />;
  return (
    <>
      {Object.values(windows)
        .filter((w) => w.mode !== "minimized")
        .map((entry) => {
          const app = getApp(entry.appId);
          if (!app) return null; // unknown appId: defensive ignore per spec
          const Body = app.component;
          return (
            <WindowFrame key={entry.appId} app={app} entry={entry} dragConstraintsRef={dragConstraintsRef}>
              <Suspense fallback={<p className="p-4 text-xs">loading…</p>}>
                <Body />
              </Suspense>
            </WindowFrame>
          );
        })}
    </>
  );
}
