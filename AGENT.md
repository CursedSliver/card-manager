# AGENT.md

Guidance for AI agents working in this repository. Read this before making changes.

## Purpose

**RtA Helper** is a card display and random draw helper for a custom card game ("RtA").
It is **not the game itself**: no game logic, timers, inventories, resource tracking, or
tag powers are implemented. Cards exist purely as data used for rolling, displaying,
sorting, selecting, and copying to spreadsheets.

## Tech Stack & Constraints

- **TypeScript** (strict mode) with **no framework** — vanilla DOM only. Small libraries are fine (`fuse.js` is used for fuzzy search); do not introduce React/Vue/etc.
- **SASS (Dart Sass)** for styling, compiled by the `sass` package.
- **esbuild** for bundling, orchestrated by `build.mjs` (also compiles SASS and copies `index.html`).
- Commands: `npm run build`, `npm run build:dev`, `npm run typecheck`, `npm run serve` (serves `dist/` at `http://localhost:8123`).

## Architecture

Code is strictly split into two layers:

### `src/core/` — generic, data-free logic

| File | Contents |
| --- | --- |
| `generator.ts` | `Generator<R>`: weighted RNG. Items carry a nonnegative weight and an arbitrary reward. `roll()` propagates through nested `Generator` rewards until a non-generator reward is returned. Throws on empty item lists, negative weights, or zero total weight. |
| `card.ts` | `Ability` (text + optional ability tag), `AbilityOverride` (a `Generator` of abilities plus a unique `description` of what the override rolls), `CardType` (name, tag, rarity, optional top/bottom ability **or** override), `CardInstance` (type + rolled override results). `defineCardType()` enforces that an ability and its override are mutually exclusive. `createCardInstance()` rolls applicable overrides. `resolveTopAbility`/`resolveBottomAbility` return the effective ability. |
| `deck.ts` | `Deck` (name, optional description, pool `Generator`, optional `perDrawAmount`). `drawFromDeck()` rolls the pool, then instantiates each card type. |
| `ui.ts` | `el()` DOM factory, `renderCard(instance, rarityColor?, options?)` (centered card layout; `options.overrideDescriptions` renders overrides as their bracketed description text marked `card__ability--override`, `options.interactive: false` drops the button role/focus), `formatAbilityForSheet()` (`[Tag] text` TSV formatting). |

### `src/implementation/` — fixed, immutable definitions

| File | Contents |
| --- | --- |
| `tags.ts` | `CardTag` enum: **Immortal, Instant, Timed, Hammer**. `AbilityTag` enum: **Unique, Limited, Movement**. `CARD_TAG_SORT_ORDER` (Immortal → Instant → Timed → Hammer) and `cardTagRank()`. |
| `rarity.ts` | `Rarity` enum: **Plentiful, Common, Uncommon, Rare, Legendary, Mythical, Heavenly**. `RARITY_COLORS` (white, gray, green, purple, orange, red [Mythical, currently unused by any card], cyan) + `rarityColor()`. `RARITY_DRAW_WEIGHT_MULTIPLIER` (Plentiful 2.5, Common 1, Uncommon 0.5, Rare 0.2, Legendary 0.05; Mythical/Heavenly unused). `RARITY_SORT_ORDER` + `rarityRank()` for rarest-first sorting (Heavenly > Mythical > Legendary > Rare > Uncommon > Common > Plentiful). |
| `generators.ts` | `movementOverride`: `AbilityOverride` over 8 equally weighted Movement abilities, one per compass direction (⬆️↗️➡️↘️⬇️↙️⬅️↖️), text `Move {dir} or {dir}{dir}.` `hastenTopOverride`: `AbilityOverride` over 56 equally weighted pairs of distinct directions A/B, text `Move {A}, {A}{A}, or {B}.` Each carries its own `description` shown by the Catalogue. |
| `cards/` | All real cards, grouped by tag: `immortal.ts` (6, incl. 2 Heavenly), `hammers.ts` (7), `instant.ts` (16, incl. Hasten with the top override), `timed.ts` (18). `types.ts` defines `RealCardType = CardType<CardTag, AbilityTag, Rarity>`. `index.ts` re-exports everything and aggregates `CARD_TYPES`. |
| `decks.ts` | `STANDARD_DECK`: all non-immortal cards via three nested sub-generators (hammers ×0.05, instant ×1, timed ×0.6); within each sub-generator cards are weighted by `RARITY_DRAW_WEIGHT_MULTIPLIER`. |
| `time.ts` | `TIME_MULTIPLIER`: global scale for time-based effects, read once at initialization from the `timeMultiplier` URL query parameter, else the `timeMultiplier` localStorage entry, else 1 (URL parameter wins on conflict). `saveTimeMultiplier()` persists a value to localStorage. Card definitions bake the scaled value into hour-based durations via `scaledHours` (bare number) / `hoursLabel` (number + pluralized unit), so changing the multiplier requires a page reload. |
| `spirits.ts` | `Spirit` (name, `SpiritClassification`, 1–3 named abilities — names may repeat, e.g. "Rice, Rice"), `splitSpiritName()` (display name vs. title: the text after the first comma), `SPIRITS` (all spirits, ordered by classification), `rollSpirits()` (pairwise distinct random selection). Classifications: Cookie, Heavenly, Toasted, Secret. Ability texts are transcribed VERBATIM and must not be reworded. |

**Rule:** card types, decks, generators, and tags are **fixed after initialization**. Never add UI or runtime mechanisms to modify them. Adding new content means adding entries to the fixed lists in `implementation/`.

### `src/main.ts` — app wiring

Owns the three top-level view tabs ("Spirits" / "Catalogue" / "Draw cards"), which toggle the
`hidden` attribute of `#spirits-view`, `#catalogue-view` and `#draw-view` (the bottom action bar
is shown only on "Draw cards"). The Spirits tab is disabled until the secret `ENABLE_SPIRITS()`
developer-console command runs (session-only, not persisted), which unlocks the tab and opens it.
The active tab is driven by the `tab` URL query parameter — `?tab=roll` is the "Draw cards" tab,
`?tab=catalogue` the catalogue and `?tab=spirits` the spirits view (ignored while locked); a
missing or unknown value falls back to `roll`. The `VIEW_TABS` list maps each parameter value to
its tab button and view ids; clicking a tab mirrors it into the parameter with
`history.pushState` (keeping other parameters like `timeMultiplier`), and a `popstate` listener
reapplies the parameter so back/forward move between tabs. It also measures the top bar into the
`--top-bar-height` CSS variable so the catalogue/spirits toolbars stick below it.

The "Draw cards" view is built from `DECKS`. At the top sits a "Set time mult" panel: a number
input, an "Apply & reload" button that saves the value to localStorage and reloads the page with
the `timeMultiplier` URL parameter (see `implementation/time.ts`), and a readout of the current
multiplier. Below are collapsible
deck containers, draw-count input
(disabled and grayed when `perDrawAmount` is set), draw button with a **2 s cooldown**,
sort-by-tag button, click-to-select cards (blue outline, multi-select, cleared on redraw),
and two bottom buttons: "Copy to sheets" (selected cards, display order) and
"Select all and copy". TSV output is 4 tab-separated columns: name, top ability, bottom
ability, card tag; ability tags formatted as `[Tag] text`.

### `src/catalogue.ts` — catalogue view

Builds the "Catalogue" view into `#catalogue-view`: a sticky toolbar (Fuse.js search input over
card names and descriptions, then a tag tab-selector that scrolls the window to a section) over
one section per card tag, each with a header and a 4-column table of cards. Sections follow
`CARD_TAG_SORT_ORDER`; within a section cards are sorted by rarity from least to most rare. Rows
are filled top-to-bottom, and cards are rendered with `renderCard(..., { overrideDescriptions:
true })` so overrides show their `description` instead of a rolled ability.
Searching hides non-matching sections (disabling their tab) and shows a "no matches" message when
nothing matches.

Catalogue cards are fixed at 540 px tall and clip their text (`.catalogue-table .card` in the
SCSS); clicking or pressing Enter/Space on one opens the side panel. The panel is a dimmed
backdrop plus a right-hand drawer (`.card-panel-layer`) that re-renders the same card without
clamping, so the full ability text is readable; it closes on the close button, Escape, a backdrop
click, or a search keystroke, and returns focus to the triggering card. Below the card the panel
offers "Generate a copy", which rolls the type into a concrete instance (`createCardInstance`,
resolving any overrides) and renders it under the main card, plus a "Copy to sheet" button
(disabled until a copy exists) that copies that generated instance as a single 5-column TSV row.
`initCatalogue()` returns a `CatalogueView` handle whose `closePanel()` the app wiring calls when
leaving the view.

## UI Invariants

- Dark theme via CSS custom properties in `src/styles/main.scss`; follow the BEM-ish naming already in use.
- Card layout, top to bottom: bold title → thin inset divider → top ability (tag bolded and prefixed) → large "OR" → bottom ability → divider → **rarity** (colored by rarity) → card tag (small-caps, muted). The bottom divider carries `margin-top: auto`, so whenever a card is taller than its text (stretched within a draw row, or the fixed height in the Catalogue) the divider, rarity and tag sit on the card's bottom edge instead of trailing the text.
- Copy-to-sheets TSV has 5 columns per row: name, top ability, bottom ability, card tag, rarity (rarity is the rightmost column).
- A spirit copies to sheets as a 3-column by 4-row TSV table: row 1 is name, title, classification;
  rows 2-4 are one per ability (name, text, `OK` when the ability exists). Missing abilities leave
  their row's cells empty.
- After drawing, cards are **sorted by rarity by default** (rarest first). The deck footer offers two sort buttons: "Sort by tag" (Immortal → Instant → Timed → Hammer) and "Sort by rarity" (Heavenly → Mythical → Legendary → Rare → Uncommon → Common → Plentiful). Both sorts are stable.
- Card texts are transcribed from the game design with only minimal grammar fixes; do not reword them.
- The "Catalogue" view shows every card type (immortals included) and is read-only: its cards open
  a detail side panel instead of being selected. Copying drawn cards lives in the "Draw cards"
  view; the catalogue's only copying is the side panel's "Copy to sheet" button, which copies the
  instance produced by that panel's own "Generate a copy" button.

### `src/spirits.ts` — spirits view

Builds the "Spirits" view into `#spirits-view`: a sticky Fuse.js search toolbar over spirit
names and ability names/texts above a single 3-column grid of all spirits (not grouped by
classification; the classification sits at the bottom of each card). Each card shows the
spirit's name with its title (the text after the first comma) as a smaller non-bold line below,
then one divider, each ability as a bold subtitle plus text separated by dividers, and a final
divider separating the abilities from the classification. The spirit selector at the bottom rolls
a pairwise distinct set of spirits (input capped at the number of spirits) and shows the results
in the same card form. The view is hidden until `ENABLE_SPIRITS()` enables its tab; cards in the
grid stretch to their row height so adjacent cards share one height. At most one spirit is
selected at a time (clicking it again deselects; rolling clears the selection), and the spirits
view's own bottom action bar offers "Copy to sheets" for the selected spirit.
- Catalogue cards have a **fixed 360 px height** and truncate overflowing text with an ellipsis;
  never let a catalogue card grow to fit its text (the side panel is what shows the full card).
- Overrides are always shown in the catalogue as their `description` string, wrapped in square
  brackets and faded (`card__ability--override`); a rolled ability is never displayed outside a
  draw.
- All card text is centered.

## Conventions

- 2-space indent, single quotes, semicolons, trailing newline.
- No `any`; explicit types on function signatures.
- Class names kebab-case/BEM; TS identifiers camelCase; constants SCREAMING_SNAKE_CASE.
- After changes, run `npm run typecheck && npm run build` and verify in the browser (e.g. with Playwright) that draw/sort/select/copy still behave as specified.
