import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BootScreen } from "@/components/boot/BootScreen";

test("shows BIOS text and any key skips", async () => {
  const onDone = vi.fn();
  render(<BootScreen onDone={onDone} />);
  expect(screen.getByText(/3AM OS BIOS v3\.0\.1998/)).toBeInTheDocument();
  await userEvent.keyboard("{Enter}");
  expect(onDone).toHaveBeenCalled();
});

test("click also skips", async () => {
  const onDone = vi.fn();
  render(<BootScreen onDone={onDone} />);
  await userEvent.click(screen.getByTestId("boot-screen"));
  expect(onDone).toHaveBeenCalled();
});
