# 3AM OS - Hub Plan (Phase 1)

## Core Concept
A centralized landing page that acts as a directory/portal to host various small, weird, and fun web experiments. 

## Hub Architecture
- **Header:** Logo, subtle ambient animations, and a "Vibe Check" toggle (e.g., switch between light/dark or chill/surreal modes).
- **Directory Grid/Interface:** The main body where mini-projects are displayed. The layout depends on the visual theme we choose.
- **Project Cards/Icons:** Each project entry will need:
  - Title
  - A short, punchy description (e.g., "Press buttons, make sounds")
  - A thumbnail or looping GIF
  - Tags (e.g., `visual`, `audio`, `snacks`, `deep-thoughts`)
- **Footer:** "Built way past bedtime." + Placeholder for future Phase 2 "Submit a Project" button.

## Tech Stack Options
- **Frontend Framework:** Next.js (React) is perfect for this. It allows us to build the hub, and each new mini-project can just be a new folder/route (e.g., `os.3am.quest/fridge-alchemy`).
- **Styling:** Tailwind CSS for fast layout building, and Framer Motion for smooth, satisfying page transitions.
- **Hosting:** Vercel (free, fast, and plays perfectly with Next.js).

## Mini-Project Integration Strategy
When a user clicks a project on the hub, we have two options:
1. **Full Immersion:** The project takes over the whole screen (giving the most immersive experience).
2. **The Portal:** The project loads in an iframe or a stylized container, so the hub's navigation always stays visible around the edges.
