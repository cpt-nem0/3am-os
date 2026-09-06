import { lazy } from "react";
import type { DesktopApp } from "@/apps/types";

export const registry: DesktopApp[] = [
  {
    id: "bubble-wrap",
    title: "Bubble Wrap [BUBBLE_WRAP.EXE]",
    icon: "🫧",
    defaultSize: { width: 520, height: 400 },
    defaultMode: "windowed",
    component: lazy(() => import("@/apps/under-construction/UnderConstruction")),
    description: "Infinite Pop Simulator. Zero calories.",
  },
  {
    id: "fridge-alchemy",
    title: "Fridge Alchemy [ALCHEMY.SYS]",
    icon: "🧪",
    defaultSize: { width: 560, height: 440 },
    defaultMode: "windowed",
    component: lazy(() => import("@/apps/under-construction/UnderConstruction")),
    description: "Weird Recipe Combinator.",
  },
  {
    id: "deep-dive",
    title: "Deep Dive [DEEP_DIVE.BIN]",
    icon: "🌊",
    defaultSize: { width: 640, height: 480 },
    defaultMode: "fullscreen",
    component: lazy(() => import("@/apps/under-construction/UnderConstruction")),
    description: "Abyssal Ascent synthesizer. DEPTH: -3,400 FATHOMS.",
  },
  {
    id: "manifesto",
    title: "3am_manifesto.txt - Notepad",
    icon: "📄",
    defaultSize: { width: 480, height: 380 },
    defaultMode: "windowed",
    component: lazy(() => import("@/apps/manifesto/Manifesto")),
    hidden: true,
  },
  {
    id: "trash",
    title: "Trash.bin",
    icon: "🗑",
    defaultSize: { width: 440, height: 360 },
    defaultMode: "windowed",
    component: lazy(() => import("@/apps/trash/TrashBin")),
    hidden: true,
  },
];

export function getApp(id: string): DesktopApp | undefined {
  return registry.find((a) => a.id === id);
}
