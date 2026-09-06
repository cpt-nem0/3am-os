# Contributing to 3AM OS

Thanks for wanting to make 3AM OS weirder. Here's how to get started.

## What is 3AM OS?

3AM OS (deployed at `os.3am.quest`) is a vaporwave-themed desktop OS experience for late-night web surfers. It's a nostalgic, surreal, comforting hub that hosts mini-apps and strange experiments. For the full vision, see [PROJECT.md](./PROJECT.md).

## Getting Started

### Prerequisites
- Node.js 22+
- npm

### Local Development

Clone the repo and install dependencies:

```bash
npm install
```

If you hit a peer dependency conflict, use:

```bash
npm install --legacy-peer-deps
```

Then spin up the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 3AM OS will be waiting.

## Running Tests & Checks

Before submitting a PR, make sure CI passes locally:

```bash
npm run lint       # ESLint
npx tsc --noEmit   # TypeScript
npm test           # Tests (npm test -- --max-workers=2 if slow)
npm run build      # Next.js build
```

## Adding a Mini-App

The easiest way to contribute: add a mini-app to 3AM OS.

### Step 1: Create the App Directory

Create a new folder under `src/apps/`:

```
src/apps/your-app-id/
  ├── YourApp.tsx        (your React component)
  └── (optional additional files)
```

Your component receives no props and **must render inside the provided window container**. Think of it like an old desktop window—it has borders and a titlebar already, and your app fills the content area.

### Step 2: Register in `src/apps/registry.ts`

Add ONE entry to the `registry` array. It must conform to the `DesktopApp` interface:

```typescript
export interface DesktopApp {
  id: string;                                      // unique identifier (kebab-case)
  title: string;                                   // window title shown to users
  icon: string;                                    // emoji icon
  defaultSize: { width: number; height: number }; // initial window size in pixels
  defaultMode: "windowed" | "fullscreen";         // how it opens
  component: LazyExoticComponent<ComponentType>;  // lazy-loaded React component
  author?: string;                                 // your name or handle (optional)
  description?: string;                           // short blurb (optional)
  hidden?: boolean;                               // exclude from launcher (optional)
}
```

### Example Entry

```typescript
{
  id: "cool-experiment",
  title: "Cool Experiment [COOL.EXE]",
  icon: "✨",
  defaultSize: { width: 520, height: 420 },
  defaultMode: "windowed",
  component: lazy(() => import("@/apps/cool-experiment/CoolExperiment")),
  author: "your-name",
  description: "A brief, weird description.",
}
```

That's it—adding an app is one registry entry plus one component. A desktop icon and a Start menu entry appear automatically for every registered app (unless it's `hidden`, which only excludes it from the Start menu). Icons auto-arrange in a tidy grid; user-customizable icon positions are planned for a future release.

## Styling Rules

**Inside your window, your app is its own world.** Every mini-app is a complete little project—it does NOT have to follow the 3AM OS vaporwave design. Neon terminal, pastel garden, brutalist plain-text, full-canvas art piece: all welcome. 3AM OS provides the retro window chrome around you; what happens inside the glass is yours.

The hard rules are about isolation, not aesthetics:

- **Stay inside your window.** Your component renders in the window's content area. No portals, no `position: fixed` overlays escaping the window, no rendering outside your container.
- **No global styles.** Don't edit `globals.css`, don't inject global CSS, don't restyle the shell (taskbar, window chrome, desktop). Scope everything to your app (Tailwind classes, CSS modules, or inline styles inside your component).
- **Don't break either vibe.** If you use your own background color, set it explicitly—don't assume light or dark behind you. If you *want* to blend into the OS instead, the theme variables are available and adapt to "Light Surf"/"Midnight Surf" automatically:
  - `--text`, `--desktop-bg`, `--window-bg`, `--chrome`, `--bevel-hi`/`--bevel-lo`, `--title-bar`/`--title-text`, `--accent-pink`/`--accent-lavender`
  - plus `.bevel-raised` / `.bevel-sunken` for the retro 3D look
- **Client-side only.** No API routes, no server code, no external API keys. If your idea needs a backend, open an issue first to discuss it.

## Tone & Vibe

3AM OS is cozy and weird. Think late-night internet—nostalgic, slightly surreal, comforting. Keep copy relaxed and quirky. No corporate speak.

## Easy First PRs

Not ready to build a full app? Try these:

- **Ticker messages:** Add a message to `TICKER_MESSAGES` in `src/lib/tickerStore.ts`. Keep it short, retro, and weird.
- **Terminal commands:** (Coming soon in Phase 2—stay tuned.)

## Code Quality & Review

- All PRs must pass CI (lint, type-check, tests, build).
- PRs are reviewed for **vibe as well as code.** Does it feel right? Does it fit the weird, cozy 3AM OS aesthetic?
- Smaller PRs = faster review. Aim for focused changes.

## Questions?

If something doesn't make sense or you're blocked, open an issue. We're here to help.

---

Happy hacking, and welcome to 3AM OS. 🌙
