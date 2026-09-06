const KEY = "3amos-booted";
export function hasBooted(): boolean {
  try { return sessionStorage.getItem(KEY) === "1"; } catch { return false; }
}
export function markBooted(): void {
  try { sessionStorage.setItem(KEY, "1"); } catch {}
}
export function clearBooted(): void {
  try { sessionStorage.removeItem(KEY); } catch {}
}
