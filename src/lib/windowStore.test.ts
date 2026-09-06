import { useWindowStore } from "@/lib/windowStore";

const reset = () => useWindowStore.setState({ windows: {}, nextZ: 1 });
beforeEach(reset);
const win = (id: string) => useWindowStore.getState().windows[id];

test("open creates a windowed entry at the cascade base", () => {
  useWindowStore.getState().open("bubble-wrap");
  expect(win("bubble-wrap")).toMatchObject({ mode: "windowed", position: { x: 80, y: 80 } });
});

test("second window cascades by 32px", () => {
  const s = useWindowStore.getState();
  s.open("a");
  s.open("b");
  expect(win("b").position).toEqual({ x: 112, y: 112 });
});

test("open with fullscreen defaultMode opens fullscreen", () => {
  useWindowStore.getState().open("deep-dive", { mode: "fullscreen" });
  expect(win("deep-dive").mode).toBe("fullscreen");
});

test("opening an already-open app focuses it instead of duplicating", () => {
  const s = useWindowStore.getState();
  s.open("a");
  s.open("b");
  const zBefore = win("a").zIndex;
  s.open("a");
  expect(Object.keys(useWindowStore.getState().windows)).toHaveLength(2);
  expect(win("a").zIndex).toBeGreaterThan(zBefore);
});

test("focus raises z-index above all others", () => {
  const s = useWindowStore.getState();
  s.open("a");
  s.open("b");
  s.focus("a");
  expect(win("a").zIndex).toBeGreaterThan(win("b").zIndex);
});

test("minimize and restore round-trips, restoring prior mode", () => {
  const s = useWindowStore.getState();
  s.open("a", { mode: "fullscreen" });
  s.minimize("a");
  expect(win("a").mode).toBe("minimized");
  s.restore("a");
  expect(win("a").mode).toBe("fullscreen");
});

test("toggleFullscreen remembers and restores position", () => {
  const s = useWindowStore.getState();
  s.open("a");
  s.move("a", { x: 200, y: 150 });
  s.toggleFullscreen("a");
  expect(win("a").mode).toBe("fullscreen");
  s.toggleFullscreen("a");
  expect(win("a").mode).toBe("windowed");
  expect(win("a").position).toEqual({ x: 200, y: 150 });
});

test("close removes the entry", () => {
  const s = useWindowStore.getState();
  s.open("a");
  s.close("a");
  expect(win("a")).toBeUndefined();
});

test("actions on unknown ids are safe no-ops", () => {
  const s = useWindowStore.getState();
  expect(() => {
    s.close("ghost");
    s.minimize("ghost");
    s.focus("ghost");
    s.move("ghost", { x: 0, y: 0 });
    s.toggleFullscreen("ghost");
  }).not.toThrow();
});

test("restore on a non-minimized window only focuses, never changes mode", () => {
  const s = useWindowStore.getState();
  s.open("a");
  s.toggleFullscreen("a");
  const zBefore = win("a").zIndex;
  s.restore("a");
  expect(win("a").mode).toBe("fullscreen");
  expect(win("a").zIndex).toBeGreaterThan(zBefore);
});
