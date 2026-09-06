import { create } from "zustand";

export type WindowMode = "windowed" | "minimized" | "fullscreen";
export interface Position { x: number; y: number }

export interface WindowEntry {
  appId: string;
  position: Position;
  prevPosition: Position | null;
  zIndex: number;
  mode: WindowMode;
  modeBeforeMinimize: "windowed" | "fullscreen";
}

interface WindowStore {
  windows: Record<string, WindowEntry>;
  nextZ: number;
  open: (appId: string, opts?: { mode?: "windowed" | "fullscreen" }) => void;
  close: (appId: string) => void;
  minimize: (appId: string) => void;
  restore: (appId: string) => void;
  focus: (appId: string) => void;
  move: (appId: string, position: Position) => void;
  toggleFullscreen: (appId: string) => void;
}

const BASE = 80;
const STEP = 32;

export const useWindowStore = create<WindowStore>((set, get) => {
  const update = (appId: string, patch: Partial<WindowEntry>) => {
    const w = get().windows[appId];
    if (!w) return;
    set({ windows: { ...get().windows, [appId]: { ...w, ...patch } } });
  };

  return {
    windows: {},
    nextZ: 1,

    open: (appId, opts) => {
      const { windows, nextZ } = get();
      const existing = windows[appId];
      if (existing) {
        if (existing.mode === "minimized") get().restore(appId);
        else get().focus(appId);
        return;
      }
      const count = Object.keys(windows).length;
      const mode = opts?.mode ?? "windowed";
      set({
        windows: {
          ...windows,
          [appId]: {
            appId,
            position: { x: BASE + count * STEP, y: BASE + count * STEP },
            prevPosition: null,
            zIndex: nextZ,
            mode,
            modeBeforeMinimize: mode,
          },
        },
        nextZ: nextZ + 1,
      });
    },

    close: (appId) => {
      if (!get().windows[appId]) return;
      const rest = { ...get().windows };
      delete rest[appId];
      set({ windows: rest });
    },

    minimize: (appId) => {
      const w = get().windows[appId];
      if (!w || w.mode === "minimized") return;
      update(appId, { mode: "minimized", modeBeforeMinimize: w.mode });
    },

    restore: (appId) => {
      const w = get().windows[appId];
      if (!w) return;
      if (w.mode !== "minimized") {
        get().focus(appId);
        return;
      }
      update(appId, { mode: w.modeBeforeMinimize, zIndex: get().nextZ });
      set({ nextZ: get().nextZ + 1 });
    },

    focus: (appId) => {
      if (!get().windows[appId]) return;
      update(appId, { zIndex: get().nextZ });
      set({ nextZ: get().nextZ + 1 });
    },

    move: (appId, position) => update(appId, { position }),

    toggleFullscreen: (appId) => {
      const w = get().windows[appId];
      if (!w) return;
      if (w.mode === "fullscreen") {
        update(appId, { mode: "windowed", position: w.prevPosition ?? w.position, prevPosition: null });
      } else {
        update(appId, { mode: "fullscreen", prevPosition: w.position });
      }
      get().focus(appId);
    },
  };
});
