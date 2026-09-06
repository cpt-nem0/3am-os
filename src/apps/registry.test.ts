import { registry, getApp } from "@/apps/registry";

test("all apps have unique ids", () => {
  const ids = registry.map((a) => a.id);
  expect(new Set(ids).size).toBe(ids.length);
});

test("every app declares the required fields", () => {
  for (const app of registry) {
    expect(app.id).toBeTruthy();
    expect(app.title).toBeTruthy();
    expect(app.icon).toBeTruthy();
    expect(app.defaultSize.width).toBeGreaterThan(0);
    expect(["windowed", "fullscreen"]).toContain(app.defaultMode);
    expect(app.component).toBeDefined();
  }
});

test("phase-1 apps are registered", () => {
  for (const id of ["bubble-wrap", "fridge-alchemy", "deep-dive", "manifesto", "trash"]) {
    expect(getApp(id)).toBeDefined();
  }
});

test("getApp returns undefined for unknown ids", () => {
  expect(getApp("nope")).toBeUndefined();
});
