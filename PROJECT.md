# 3AM OS

## Project Overview
3AM OS (deployed at `os.3am.quest`) is a creative, surreal, and comforting web hub designed for late-night internet surfers. It acts as a digital "Desktop" or "Arcade" that hosts various small, fun, and weird mini-web experiments.

## Current State & Roadmap
**Phase 1 (Current):** 
- Establish the main Hub (the 3AM OS Desktop).
- Build 2-3 initial mini-apps (e.g., Sensory Visualizer, Weird Recipe Combinator, Deep Dive Rabbit Hole).
**Phase 2 (Future):** 
- Open the platform for community submissions (letting others submit their weird mini-projects to the OS).

## Design System
The project strictly follows the **Vaporwave OS** design language. It is a nostalgic, retro-computing aesthetic that feels like booting up an old Windows 95 or Classic Mac machine at 3 AM.
- **Reference:** See `docs/DESIGN.md` for specific typography (Silkscreen, Space Mono), colors (Light/Dark mode), and UI components (3D bevels, pixel icons).

## Hub Architecture
- **Reference:** See `docs/HUB_PLAN.md` for the technical stack and layout strategy.
- **Tech Stack:** Next.js (React), Tailwind CSS, Framer Motion. Hosted on Vercel.

## Instructions for AI Agents
If you are an AI agent reading this to start working on the project, please adhere to the following rules:
1. **Design First:** Always refer to `docs/DESIGN.md` before generating UI or styling. Do not use modern soft UI; you must enforce the Vaporwave OS retro style (thick bevels, pixel fonts, specific color palettes).
2. **Architecture:** When creating a new mini-app, ensure it fits within the context of a "window" on the 3AM OS desktop, as outlined in `docs/HUB_PLAN.md`.
3. **Tone:** Keep the copy and interactions relaxed, slightly nostalgic, comforting, and quirky. 
4. **Current Task:** Check with the user on whether they want to work on the Hub shell or one of the mini-apps first.
