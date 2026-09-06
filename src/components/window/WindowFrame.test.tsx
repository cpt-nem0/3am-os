import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WindowFrame } from "@/components/window/WindowFrame";
import { useWindowStore } from "@/lib/windowStore";
import { getApp } from "@/apps/registry";

beforeEach(() => {
  useWindowStore.setState({ windows: {}, nextZ: 1 });
  useWindowStore.getState().open("manifesto");
});

function renderFrame() {
  const app = getApp("manifesto")!;
  const entry = useWindowStore.getState().windows["manifesto"];
  return render(
    <WindowFrame app={app} entry={entry}>
      <div>body</div>
    </WindowFrame>
  );
}

test("close button removes the window from the store", async () => {
  renderFrame();
  await userEvent.click(screen.getByLabelText("Close"));
  expect(useWindowStore.getState().windows["manifesto"]).toBeUndefined();
});

test("minimize button minimizes", async () => {
  renderFrame();
  await userEvent.click(screen.getByLabelText("Minimize"));
  expect(useWindowStore.getState().windows["manifesto"].mode).toBe("minimized");
});

test("maximize button toggles fullscreen", async () => {
  renderFrame();
  await userEvent.click(screen.getByLabelText("Maximize"));
  expect(useWindowStore.getState().windows["manifesto"].mode).toBe("fullscreen");
});

test("double-clicking the title bar toggles fullscreen", async () => {
  renderFrame();
  await userEvent.dblClick(screen.getByText("3am_manifesto.txt - Notepad"));
  expect(useWindowStore.getState().windows["manifesto"].mode).toBe("fullscreen");
});

test("clicking a title-bar button does not leak pointerdown into a drag/focus bump", async () => {
  renderFrame();
  const nextZBefore = useWindowStore.getState().nextZ;
  await userEvent.click(screen.getByLabelText("Minimize"));
  // minimize() itself never touches nextZ; any change here would mean the
  // button's pointerdown bubbled up and triggered focus() (once or twice).
  expect(useWindowStore.getState().nextZ).toBe(nextZBefore);
});
