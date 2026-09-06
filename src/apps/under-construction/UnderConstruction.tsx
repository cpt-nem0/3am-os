export default function UnderConstruction() {
  return (
    <div className="flex flex-col items-center gap-4 p-8 text-center">
      <div className="text-4xl">⏳</div>
      <p className="font-bold" style={{ fontFamily: "var(--font-silkscreen)" }}>
        UNDER CONSTRUCTION
      </p>
      <div className="bevel-sunken h-4 w-48 overflow-hidden">
        <div className="h-full w-1/3" style={{ background: "var(--accent-pink)" }} />
      </div>
      <p className="text-xs opacity-70">loading vibes... please hold</p>
    </div>
  );
}
