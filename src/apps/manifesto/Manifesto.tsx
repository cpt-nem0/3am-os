const LINES = [
  "3am_manifesto.txt",
  "",
  "1. the internet used to be weird. we're bringing that back.",
  "2. nothing here is productive. that's the point.",
  "3. every window is a little world. open a few.",
  "4. built way past bedtime.",
  "",
  "— the management, 3:42 AM",
];

export default function Manifesto() {
  return (
    <pre className="whitespace-pre-wrap p-4 text-sm" style={{ fontFamily: "var(--font-space-mono)" }}>
      {LINES.join("\n")}
    </pre>
  );
}
