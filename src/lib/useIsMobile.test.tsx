import { renderHook } from "@testing-library/react";
import { useIsMobile } from "@/lib/useIsMobile";

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockReturnValue({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
}

test("true under 768px", () => {
  mockMatchMedia(true);
  expect(renderHook(() => useIsMobile()).result.current).toBe(true);
});

test("false at desktop widths", () => {
  mockMatchMedia(false);
  expect(renderHook(() => useIsMobile()).result.current).toBe(false);
});
