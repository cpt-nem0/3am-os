import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Taskbar } from "@/components/taskbar/Taskbar";
import { useWindowStore } from "@/lib/windowStore";

beforeEach(() => {
  useWindowStore.setState({ windows: {}, nextZ: 1 });
  localStorage.clear();
  document.documentElement.dataset.vibe = "midnight";
});

const noop = () => {};

test("start menu lists non-hidden apps and opens one", async () => {
  render(<Taskbar onShutdown={noop} onRestart={noop} />);
  await userEvent.click(screen.getByRole("button", { name: "Start" }));
  expect(screen.queryByText(/Trash/)).not.toBeInTheDocument();
  await userEvent.click(screen.getByRole("menuitem", { name: /Bubble Wrap/ }));
  expect(useWindowStore.getState().windows["bubble-wrap"]).toBeDefined();
});

test("minimized window shows a tab that restores it", async () => {
  useWindowStore.getState().open("manifesto");
  useWindowStore.getState().minimize("manifesto");
  render(<Taskbar onShutdown={noop} onRestart={noop} />);
  await userEvent.click(screen.getByRole("button", { name: /3am_manifesto/ }));
  expect(useWindowStore.getState().windows["manifesto"].mode).toBe("windowed");
});

test("vibe toggle flips the html attribute", async () => {
  render(<Taskbar onShutdown={noop} onRestart={noop} />);
  await userEvent.click(screen.getByRole("button", { name: /Vibe/ }));
  expect(document.documentElement.dataset.vibe).toBe("light");
});

test("seeds the vibe label from persisted storage after mount, without a hydration mismatch", async () => {
  localStorage.setItem("3amos-vibe", "light");
  render(<Taskbar onShutdown={noop} onRestart={noop} />);
  expect(await screen.findByText(/Light Surf/)).toBeInTheDocument();
});
