"use client";
import { useState } from "react";

const FILES = [
  { name: "my_mixtape_final_FINAL.mp3", size: "4.2 MB" },
  { name: "homework.doc", size: "12 KB" },
  { name: "regrets.tmp", size: "∞" },
  { name: "new_years_resolutions_2019.txt", size: "1 KB" },
];

export default function TrashBin() {
  const [quip, setQuip] = useState("");
  return (
    <div className="p-4 text-sm">
      <ul>
        {FILES.map((f) => (
          <li key={f.name} className="flex justify-between border-b border-dotted py-1" style={{ borderColor: "var(--bevel-lo)" }}>
            <span>🗑 {f.name}</span>
            <span className="opacity-60">{f.size}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-2">
        <button className="bevel-raised px-3 py-1 active:bevel-sunken" onClick={() => setQuip("some things are better left deleted.")}>
          Restore
        </button>
        <button className="bevel-raised px-3 py-1 active:bevel-sunken" onClick={() => setQuip("the trash is a state of mind. it cannot be emptied.")}>
          Empty Trash
        </button>
      </div>
      {quip && <p className="mt-3 text-xs opacity-70">{quip}</p>}
    </div>
  );
}
