# 3AM OS

A vaporwave-themed desktop OS experience for late-night internet surfers. Nostalgic. Surreal. Cozy.

Visit us at **[os.3am.quest](https://os.3am.quest)** *(coming soon)*

## What is 3AM OS?

3AM OS is a browser-based "desktop" hub—imagine booting up a retro operating system at 3 AM. It features:

- A draggable window system with that classic 90s/00s vibe
- "Light Surf" (light) and "Midnight Surf" (dark) modes
- Mini-apps and weird web experiments you can explore
- A nostalgic, slightly surreal atmosphere perfect for late-night rabbit holes

The three launch apps (Bubble Wrap, Fridge Alchemy, Deep Dive) are under-construction stubs today—real versions are coming. Designed to be a launchpad for creative, quirky projects.

## [Screenshot Placeholder]

*Wireframe/mockup of 3AM OS desktop goes here.*

## Quick Start

### Prerequisites
- Node.js 22+
- npm

### Installation & Development

```bash
# Clone and install
npm install

# If you hit a peer dependency conflict:
npm install --legacy-peer-deps

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see 3AM OS running locally.

## Verification Commands

Before submitting a PR, run the full CI suite locally:

```bash
npm run lint       # ESLint checks
npx tsc --noEmit   # TypeScript type-check
npm test           # Unit tests (npm test -- --max-workers=2 if slow)
npm run build      # Next.js production build
```

## Contributing

Want to add a mini-app or improve 3AM OS? See [CONTRIBUTING.md](./CONTRIBUTING.md) for:

- How to set up your environment
- Step-by-step guide to building a mini-app
- Styling and vibe guidelines
- Easy first PRs (ticker messages, etc.)

TL;DR: Create `src/apps/<your-app-id>/`, add one entry to `src/apps/registry.ts`, follow the rules (stay inside your window, no global styles, client-side only), and submit a PR. Your app's look is entirely up to you — 3AM OS provides the retro window chrome; inside it, your app is its own world.

## Roadmap

**Phase 1 (Current):**
- Core desktop shell and window system ✓
- Initial mini-apps (Manifesto, Fridge Alchemy, Bubble Wrap, Deep Dive)
- Light/dark mode theming ✓
- Community contributor framework

**Phase 2 (Next):**
- Screensaver system
- Terminal.exe command shell
- Open community submissions

**Phase 3:**
- Curated app gallery
- Persistent state & favorites
- More retro OS features

## Tech Stack

- **Framework:** Next.js 15 (React 19)
- **Styling:** Tailwind CSS + custom CSS variables
- **State:** Zustand
- **Deployment:** Vercel

## License

TBD before public launch.

---

Built with 💜 for the weird internet.
