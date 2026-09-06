import { formatClock } from "@/lib/clock";

test("formats as 12h with AM/PM and leading zero", () => {
  expect(formatClock(new Date(2026, 0, 1, 3, 42))).toBe("03:42 AM");
  expect(formatClock(new Date(2026, 0, 1, 15, 5))).toBe("03:05 PM");
  expect(formatClock(new Date(2026, 0, 1, 0, 0))).toBe("12:00 AM");
});
