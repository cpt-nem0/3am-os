import { hasBooted, markBooted, clearBooted } from "@/lib/bootFlag";

beforeEach(() => sessionStorage.clear());

test("defaults to not booted", () => expect(hasBooted()).toBe(false));
test("markBooted flips it", () => { markBooted(); expect(hasBooted()).toBe(true); });
test("clearBooted resets it", () => { markBooted(); clearBooted(); expect(hasBooted()).toBe(false); });
