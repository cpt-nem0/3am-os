import { getInitialVibe, applyVibe, toggleVibe } from "@/lib/vibe";

beforeEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.vibe;
});

test("defaults to midnight with empty storage", () => {
  expect(getInitialVibe()).toBe("midnight");
});

test("returns stored vibe when valid", () => {
  localStorage.setItem("3amos-vibe", "light");
  expect(getInitialVibe()).toBe("light");
});

test("falls back to midnight on corrupt value", () => {
  localStorage.setItem("3amos-vibe", "banana");
  expect(getInitialVibe()).toBe("midnight");
});

test("applyVibe sets html attribute and persists", () => {
  applyVibe("light");
  expect(document.documentElement.dataset.vibe).toBe("light");
  expect(localStorage.getItem("3amos-vibe")).toBe("light");
});

test("toggleVibe flips and returns the new vibe", () => {
  applyVibe("midnight");
  expect(toggleVibe()).toBe("light");
  expect(document.documentElement.dataset.vibe).toBe("light");
});
