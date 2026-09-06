"use client";
import { useEffect } from "react";
import { useTickerStore, TICKER_MESSAGES } from "@/lib/tickerStore";

export function Ticker() {
  const { index, next } = useTickerStore();
  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);
  return (
    <div className="px-2 py-0.5 text-[11px]" style={{ background: "var(--chrome)", color: "var(--accent-pink)", fontFamily: "var(--font-plex-mono)" }}>
      ▚ {TICKER_MESSAGES[index]}
    </div>
  );
}
