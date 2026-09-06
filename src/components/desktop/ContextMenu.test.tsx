import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Desktop } from "@/components/desktop/Desktop";
import { useTickerStore } from "@/lib/tickerStore";
import { useWindowStore } from "@/lib/windowStore";

beforeEach(() => {
  useWindowStore.setState({ windows: {}, nextZ: 1 });
  useTickerStore.setState({ index: 0 });
  // Pre-mark the session as booted so the boot screen (Task 9) doesn't cover
  // the desktop in this test's assertions — a test-environment arrangement,
  // not a product behavior change.
  sessionStorage.setItem("3amos-booted", "1");
});

test("right-click shows the menu and Refresh Vibes advances the ticker", async () => {
  render(<Desktop />);
  await userEvent.pointer({ keys: "[MouseRight]", target: screen.getByRole("main") });
  await userEvent.click(screen.getByRole("menuitem", { name: "Refresh Vibes" }));
  expect(useTickerStore.getState().index).toBe(1);
});
