import { useTickerStore, TICKER_MESSAGES } from "@/lib/tickerStore";

beforeEach(() => useTickerStore.setState({ index: 0 }));

test("has a pool of at least 8 messages", () => {
  expect(TICKER_MESSAGES.length).toBeGreaterThanOrEqual(8);
});

test("next() advances and wraps around", () => {
  const s = useTickerStore.getState();
  for (let i = 0; i < TICKER_MESSAGES.length; i++) s.next();
  expect(useTickerStore.getState().index).toBe(0);
});
