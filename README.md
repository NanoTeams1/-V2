# 深夜コンビニシミュレーター

**Midnight Convenience Store Simulator** is a browser-based psychological horror convenience store prototype built for short, streamer-friendly sessions. The player works a night shift in a retro Japanese convenience store, handling normal tasks until the store begins to distort after 2:00 AM.

## Prototype Features

- **Cash register system**: scan customer baskets, calculate totals, and choose change. Wrong change reduces sanity.
- **Shelf restocking**: lightweight drag-and-drop/restock interactions with inventory tracking.
- **Security cameras**: multiple analog feeds, camera glitches, and hidden entity sightings.
- **Sanity system**: sanity drops from anomalies, camera exposure, darkness, low stock pressure, and distorted events.
- **Modular horror events**: expandable event data for faceless customers, repeating dialogue, outages, impossible weather, moving mannequins, and vanishing aisles.
- **Story discovery**: unlock employee notes, old CCTV records, company cover-up documents, and emergency broadcasts.
- **Multiple endings**: escape, become trapped, replace the manager, enter the underground station, or unlock the secret true ending.
- **Local save/settings**: browser localStorage save, volume sliders, reduced motion, and fullscreen toggle.
- **Optional Supabase hook**: a client factory is included for future leaderboards, analytics, or cloud saves without requiring backend setup for local play.

## Tech Stack

- Next.js App Router
- TypeScript
- TailwindCSS
- Zustand
- Framer Motion
- Supabase client placeholder

## Getting Started

Dependencies are declared in `package.json`, but this scaffold intentionally does **not** install them.

```bash
npm install
npm run dev
```

Open <http://localhost:3000> and start the shift.

## Environment

Copy `.env.example` to `.env.local` if you want to attach Supabase later:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

The game runs with local saves when Supabase variables are absent.

## Project Structure

```text
src/
  app/                  Next.js app shell and global CRT/VHS styles
  components/game/      Gameplay UI screens and diegetic panels
  components/ui/        Reusable panel/glitch primitives
  data/                 Items, customers, modular events, story documents
  lib/                  Event selection, audio placeholders, save, Supabase client
  store/                Zustand game state and gameplay actions
  types/                Shared game domain types
public/
  audio/                Placeholder audio cue markers
  images/               Placeholder store-layout SVG
```

## Design Notes

- The prototype is UI-driven and avoids heavy 3D engines for low-end device performance.
- A full session compresses the night shift into roughly 10 minutes by advancing two in-game minutes every five seconds.
- Horror escalation starts after in-game 2:00 AM, increasing event frequency, camera corruption, and sanity pressure.
- Important systems are data-driven so additional anomalies and documents can be added without rewriting UI components.

## Future Expansion Ideas

- Replace placeholder text audio hooks with compressed `.ogg`/`.mp3` assets.
- Add Supabase-backed community shift reports or speedrun/session stats.
- Add more interactable POS errors, fake UI prompts, and branching document puzzles.
- Add localized UI language toggle while preserving Japanese diegetic labels.
