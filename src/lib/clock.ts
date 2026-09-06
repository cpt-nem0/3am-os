export function formatClock(d: Date): string {
  let h = d.getHours() % 12;
  if (h === 0) h = 12;
  const hh = String(h).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm} ${d.getHours() < 12 ? "AM" : "PM"}`;
}
