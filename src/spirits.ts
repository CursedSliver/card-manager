/**
 * Spirits view: every spirit side by side in a 3-column grid (classifications
 * are shown on the cards, but spirits are not grouped by them), a fuzzy
 * search bar (Fuse.js) over spirit names and abilities, a spirit selector at
 * the bottom that rolls a chosen amount of pairwise distinct spirits, and
 * single-selection of a spirit for copying to sheets.
 */
import Fuse from 'fuse.js';
import { copyText, el, flashButton, renderSpirit } from './core/ui';
import {
  rollSpirits,
  splitSpiritName,
  SPIRITS,
  type Spirit,
} from './implementation/spirits';

const SEARCH_THRESHOLD = 0.35;
const DEFAULT_ROLL_COUNT = 1;
const SPIRIT_ABILITY_ROWS = 3;

/**
 * Formats one spirit for the clipboard as a 3-column by 4-row TSV table:
 * name, title and classification, then one row per (up to three) abilities
 * with the ability name, its text and "OK" when the ability exists. Missing
 * abilities leave their row's cells empty.
 */
export function formatSpiritForSheet(spirit: Spirit): string {
  const { name, title } = splitSpiritName(spirit.name);
  const rows: string[] = [[name, title ?? '', spirit.classification].join('\t')];
  for (let index = 0; index < SPIRIT_ABILITY_ROWS; index += 1) {
    const ability = spirit.abilities[index];
    rows.push([ability?.name ?? '', ability?.text ?? '', ability ? 'OK' : ''].join('\t'));
  }
  return rows.join('\n');
}

/** Builds the Spirits view inside `#spirits-view`. */
export function initSpirits(): void {
  const found = document.querySelector<HTMLElement>('#spirits-view');
  if (!found) {
    return;
  }
  // Non-nullable alias, so nested helpers do not have to re-check for null.
  const view: HTMLElement = found;

  /** The single selected spirit at a time, if any. */
  let selected: Spirit | undefined;

  const fuse = new Fuse([...SPIRITS], {
    keys: [
      { name: 'name', weight: 0.5 },
      { name: 'abilities.name', weight: 0.2 },
      { name: 'abilities.text', weight: 0.3 },
    ],
    threshold: SEARCH_THRESHOLD,
    ignoreLocation: true,
    minMatchCharLength: 2,
  });

  const searchInput = el('input', 'spirits__search');
  searchInput.type = 'search';
  searchInput.placeholder = 'Search spirit names and abilities…';
  searchInput.setAttribute('aria-label', 'Search spirits');

  const toolbar = el('div', 'spirits__toolbar', searchInput);
  const grid = el('div', 'spirits__grid');
  view.append(
    toolbar,
    grid,
    createRoller(handleSelect, () => {
      selected = undefined;
    }),
  );
  wireCopyAction();

  searchInput.addEventListener('input', () => {
    renderGrid(searchInput.value.trim());
  });
  renderGrid('');

  /**
   * Selects a spirit, deselecting any other. Clicking the selected spirit
   * again deselects it. Selection is mirrored onto every card showing the
   * spirit (the grid and the roll results).
   */
  function handleSelect(spirit: Spirit): void {
    selected = selected === spirit ? undefined : spirit;
    applySelection();
  }

  /** Re-applies the selected state to every rendered spirit card. */
  function applySelection(): void {
    for (const card of view.querySelectorAll<HTMLElement>('.card--spirit')) {
      card.classList.toggle('card--selected', card.dataset.spiritName === selected?.name);
    }
  }

  /** Re-renders the spirit grid for the current query (empty shows all). */
  function renderGrid(query: string): void {
    const matched =
      query.length === 0
        ? SPIRITS
        : fuse.search(query).map((result) => result.item);

    grid.replaceChildren();
    for (const spirit of matched) {
      grid.append(renderSpiritCard(spirit, handleSelect));
    }
    if (grid.childElementCount === 0) {
      grid.append(el('p', 'spirits__empty', 'No spirits match your search.'));
    }
    applySelection();
  }

  /** Wires the bottom "Copy to sheets" button to the selected spirit. */
  function wireCopyAction(): void {
    const button = document.querySelector<HTMLButtonElement>('#copy-spirit');
    button?.addEventListener('click', () => {
      const spirit = selected;
      if (!spirit) {
        flashButton(button, 'Nothing selected');
        return;
      }
      void copyText(formatSpiritForSheet(spirit));
      flashButton(button, 'Copied!');
    });
  }
}

/** Renders one spirit as a selectable card, splitting its name and title. */
function renderSpiritCard(spirit: Spirit, onSelect: (spirit: Spirit) => void): HTMLElement {
  const { name, title } = splitSpiritName(spirit.name);
  const card = renderSpirit({
    name,
    title,
    classification: spirit.classification,
    abilities: spirit.abilities,
  });
  card.dataset.spiritName = spirit.name;
  card.addEventListener('click', () => onSelect(spirit));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(spirit);
    }
  });
  return card;
}

/**
 * Builds the spirit selector: roll-count input, roll button and results.
 * Rolling always clears the current selection.
 */
function createRoller(
  onSelect: (spirit: Spirit) => void,
  onRoll: () => void,
): HTMLElement {
  const countInput = el('input', 'count-input');
  countInput.type = 'number';
  countInput.min = '1';
  countInput.max = String(SPIRITS.length);
  countInput.value = String(DEFAULT_ROLL_COUNT);

  const rollButton = el('button', 'button button--primary', 'Roll spirits');
  rollButton.type = 'button';

  const results = el('div', 'spirit-roller__results');
  results.append(el('p', 'spirit-roller__empty', 'No spirits rolled yet.'));

  rollButton.addEventListener('click', () => {
    const parsed = Number.parseInt(countInput.value, 10);
    // Never roll more spirits than exist; every rolled spirit is distinct.
    const count = Number.isFinite(parsed)
      ? Math.min(Math.max(parsed, 1), SPIRITS.length)
      : DEFAULT_ROLL_COUNT;
    countInput.value = String(count);
    onRoll();
    results.replaceChildren();
    for (const spirit of rollSpirits(count)) {
      results.append(renderSpiritCard(spirit, onSelect));
    }
  });

  const controls = el(
    'div',
    'spirit-roller__controls',
    el('label', 'count-field', 'Spirits to roll', countInput),
    rollButton,
  );

  return el(
    'section',
    'spirit-roller',
    el('h2', 'spirit-roller__title', 'Spirit selector'),
    controls,
    results,
  );
}
