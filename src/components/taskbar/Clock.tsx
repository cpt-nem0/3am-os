"use client";
import { useEffect, useState } from "react";
import { formatClock } from "@/lib/clock";

export function Clock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: hydration-safe client-only state (SSR must render the null branch)
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 10_000);
    return () => clearInterval(t);
  }, []);
  return <span className="bevel-sunken px-2 py-1 text-xs">{now ? formatClock(now) : "--:-- --"}</span>;
}
