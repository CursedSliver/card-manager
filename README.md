# RtA Helper

Card display and random draw helper for a custom card game. No game logic -
purely for rolling, displaying, sorting, selecting and copying cards.

> **Note for AI agents:** Read [`AGENT.md`](./AGENT.md) before working in this
> repository. It documents the app's purpose, architecture, fixed-data rules,
> UI invariants, and coding conventions.

## Stack

- TypeScript (strict), no framework
- SASS (Dart Sass) for styling
- esbuild for bundling
- Fuse.js for fuzzy card search in the Catalogue

## Structure

```
src/
├── core/               # Generic logic (no concrete game data)
│   ├── generator.ts    # Weighted RNG with nested-generator propagation
│   ├── card.ts         # Card type / instance model (tags, rarity) + override rolling
│   ├── deck.ts         # Deck model + drawing
│   └── ui.ts           # DOM helpers, card rendering, TSV formatting
├── implementation/     # Fixed definitions
│   ├── tags.ts         # Card tags / ability tags + sort order
│   ├── rarity.ts       # Rarities, colors, draw weight multipliers
│   ├── generators.ts   # Movement + Hasten ability override generators
│   ├── cards/          # All real cards (immortal / hammers / instant / timed)
│   └── decks.ts        # "Standard Deck"
├── styles/main.scss
├── catalogue.ts        # Catalogue view (tag sections, 4-column tables, search, detail panel)
└── main.ts             # App wiring (view tabs, draw UI, selection, copy)
```

## Commands

```bash
npm install
npm run build      # build to dist/
npm run build:dev  # unminified build with sourcemaps
npm run typecheck  # tsc --noEmit
npm run serve      # serve dist/ at http://localhost:8123
```
