export function parseDeepLink(search: string, validIds: string[]): string | null {
  const id = new URLSearchParams(search).get("open");
  return id && validIds.includes(id) ? id : null;
}

export function writeDeepLink(appId: string | null): void {
  const url = new URL(window.location.href);
  if (appId) url.searchParams.set("open", appId);
  else url.searchParams.delete("open");
  window.history.replaceState(null, "", url);
}
