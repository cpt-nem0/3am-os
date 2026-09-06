import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Desktop } from "@/components/desktop/Desktop";
import { useWindowStore } from "@/lib/windowStore";

beforeEach(() => {
  useWindowStore.setState({ windows: {}, nextZ: 1 });
  // Pre-mark the session as booted so the boot screen (Task 9) doesn't cover
  // the desktop in this test's assertions — a test-environment arrangement,
  // not a product behavior change.
  sessionStorage.setItem("3amos-booted", "1");
});

afterEach(() => {
  // Reset URL to "/" to avoid polluting other tests
  window.history.replaceState(null, "", "/");
  // jsdom has no native matchMedia; undo any per-test mock so later tests keep
  // seeing it as absent (useIsMobile's guard then keeps them on desktop layout).
  Reflect.deleteProperty(window, "matchMedia");
});

function mockMobileMatchMedia() {
  window.matchMedia = vi.fn().mockReturnValue({
    matches: true,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
}

test("double-clicking a desktop icon opens the app in its default mode", async () => {
  render(<Desktop />);
  await userEvent.dblClick(screen.getByRole("button", { name: /Deep Dive/i }));
  expect(useWindowStore.getState().windows["deep-dive"].mode).toBe("fullscreen");
});

test("deep-link query param persists after opening app", async () => {
  // Arrange: Set URL to deep-link before render
  window.history.replaceState(null, "", "/?open=deep-dive");

  // Act: Render Desktop
  render(<Desktop />);

  // Assert: Wait for the app to open and verify URL param is preserved
  await waitFor(() => {
    expect(useWindowStore.getState().windows["deep-dive"]).toBeDefined();
    expect(useWindowStore.getState().windows["deep-dive"].mode).toBe("fullscreen");
  });

  // Most critical: URL param must NOT have been stripped
  expect(window.location.search).toBe("?open=deep-dive");
});

test("mobile: start menu opens upward so it stays reachable above the fixed bottom taskbar", async () => {
  mockMobileMatchMedia();
  render(<Desktop />);
  const startButton = await screen.findByRole("button", { name: "Start" });
  await userEvent.click(startButton);
  const menu = screen.getByRole("menu");
  expect(menu.className).toContain("bottom-full");
  expect(menu.className).not.toContain("top-full");
});

test("boot gate: an unset session shows the BootScreen; any key boots and persists the flag", async () => {
  sessionStorage.removeItem("3amos-booted");
  render(<Desktop />);
  expect(await screen.findByText(/3AM OS BIOS v3\.0\.1998/)).toBeInTheDocument();
  await userEvent.keyboard("{Enter}");
  await waitFor(() => {
    expect(screen.queryByText(/3AM OS BIOS v3\.0\.1998/)).not.toBeInTheDocument();
  });
  expect(sessionStorage.getItem("3amos-booted")).toBe("1");
});
