import { parseDeepLink } from "@/lib/deepLink";

const ids = ["bubble-wrap", "deep-dive"];

test("parses a valid app id", () => {
  expect(parseDeepLink("?open=deep-dive", ids)).toBe("deep-dive");
});

test("ignores unknown ids", () => {
  expect(parseDeepLink("?open=malware.exe", ids)).toBeNull();
});

test("ignores missing param", () => {
  expect(parseDeepLink("", ids)).toBeNull();
});
