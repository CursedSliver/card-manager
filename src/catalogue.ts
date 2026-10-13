/**
 * Catalogue view: every card type, grouped by card tag into 4-column tables
 * (one table plus header per tag). Includes a fuzzy search bar (Fuse.js) over
 * card names and descriptions, and a tab-selector that scrolls the window to
 * the corresponding tag section.
 *
 * Catalogue cards are a fixed height and truncate their text with an ellipsis;
 * clicking one opens a side panel showing the card in full.
 */
import Fuse from 'fuse.js';
import type { CardInstance } from './core/card';
import { el, renderCard } from './core/ui';
import { CARD_TYPES, type RealCardType } from './implementation/cards';
import { rarityColor, rarityRank, type Rarity } from './implementation/rarity';
import {
  CARD_TAG_SORT_ORDER,
  cardTagRank,
  type AbilityTag,
  type CardTag,
} from './implementation/tags';

const TABLE_COLUMNS = 4;
const SEARCH_THRESHOLD = 0.35;
const SCROLL_GAP = 16;

/** A catalogue card: its type plus the texts used for search and display. */
interface CatalogueEntry {
  readonly type: RealCardType;
  readonly name: string;
  readonly topText: string;
  readonly bottomText: string;
}

type CatalogueCard = CardInstance<CardTag, AbilityTag, Rarity>;

/** Handle over the catalogue view's state, owned by the app wiring. */
export interface CatalogueView {
  /** Closes the card side panel if it is open. */
  closePanel(): void;
}

/** Right-hand side panel showing one card in full, opened by a card click. */
interface CardPanel {
  readonly element: HTMLElement;
  open(type: RealCardType, trigger: HTMLElement): void;
  close(): void;
}

/** Text of one card half, using the override description when there is one. */
function describeTop(type: RealCardType): string {
  return type.topAbility?.text ?? type.topAbilityOverride?.description ?? '';
}

function describeBottom(type: RealCardType): string {
  return type.bottomAbility?.text ?? type.bottomAbilityOverride?.description ?? '';
}

/**
 * Builds the searchable entries, sorted by card tag (Immortal -> Instant ->
 * Timed -> Hammer) and then by rarity from least to most rare.
 */
function createEntries(): CatalogueEntry[] {
  return CARD_TYPES.map((type) => ({
    type,
    name: type.name,
    topText: describeTop(type),
    bottomText: describeBottom(type),
  })).sort(
    (a, b) =>
      cardTagRank(a.type.tag) - cardTagRank(b.type.tag) ||
      rarityRank(b.type.rarity) - rarityRank(a.type.rarity),
  );
}

/** Builds the Catalogue view inside `#catalogue-view`. */
export function initCatalogue(): CatalogueView {
  const view = document.querySelector<HTMLElement>('#catalogue-view');
  if (!view) {
    return { closePanel: () => undefined };
  }

  const entries = createEntries();
  const fuse = new Fuse(entries, {
    keys: [
      { name: 'name', weight: 0.5 },
      { name: 'topText', weight: 0.25 },
      { name: 'bottomText', weight: 0.25 },
    ],
    threshold: SEARCH_THRESHOLD,
    ignoreLocation: true,
    minMatchCharLength: 2,
  });

  const searchInput = el('input', 'catalogue__search');
  searchInput.type = 'search';
  searchInput.placeholder = 'Search card names and descriptions…';
  searchInput.setAttribute('aria-label', 'Search cards');

  const tabsByTag = new Map<CardTag, HTMLButtonElement>();
  const tabs = el('nav', 'catalogue__tabs');
  tabs.setAttribute('aria-label', 'Card tags');
  for (const tag of CARD_TAG_SORT_ORDER) {
    const tab = el('button', 'catalogue__tab', tag);
    tab.type = 'button';
    tab.addEventListener('click', () => scrollToSection(tag));
    tabsByTag.set(tag, tab);
    tabs.append(tab);
  }

  const toolbar = el('div', 'catalogue__toolbar', searchInput, tabs);
  const sectionsHost = el('div', 'catalogue__sections');
  const sectionsByTag = new Map<CardTag, HTMLElement>();
  const panel = createCardPanel();
  view.append(toolbar, sectionsHost, panel.element);

  searchInput.addEventListener('input', () => {
    panel.close();
    renderSections(searchInput.value.trim());
  });
  renderSections('');

  /** Re-renders the tag sections for the current query (empty shows all). */
  function renderSections(query: string): void {
    const matched =
      query.length === 0
        ? undefined
        : new Set(fuse.search(query).map((result) => result.item));

    sectionsHost.replaceChildren();
    sectionsByTag.clear();

    for (const tag of CARD_TAG_SORT_ORDER) {
      const cards = entries.filter(
        (entry) => entry.type.tag === tag && (matched === undefined || matched.has(entry)),
      );
      const tab = tabsByTag.get(tag);
      if (tab) {
        tab.disabled = cards.length === 0;
      }
      if (cards.length === 0) {
        continue;
      }
      const section = createSection(tag, cards, panel.open);
      sectionsHost.append(section);
      sectionsByTag.set(tag, section);
    }

    if (sectionsByTag.size === 0) {
      sectionsHost.append(el('p', 'catalogue__empty', 'No cards match your search.'));
    }
  }

  /** Scrolls the window so the tag's section sits just below the sticky bars. */
  function scrollToSection(tag: CardTag): void {
    const section = sectionsByTag.get(tag);
    if (!section) {
      return;
    }
    const topBar = document.querySelector<HTMLElement>('.top-bar');
    const offset = (topBar?.offsetHeight ?? 0) + toolbar.offsetHeight + SCROLL_GAP;
    const top = section.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
  }

  return { closePanel: panel.close };
}

/** Builds one tag section: a header plus a 4-column table of cards. */
function createSection(
  tag: CardTag,
  cards: readonly CatalogueEntry[],
  onSelect: (type: RealCardType, trigger: HTMLElement) => void,
): HTMLElement {
  const header = el('h2', 'catalogue-section__header');
  header.append(tag, el('span', 'catalogue-section__count', `${cards.length} cards`));

  const body = el('tbody');
  for (let start = 0; start < cards.length; start += TABLE_COLUMNS) {
    const row = el('tr', 'catalogue-table__row');
    for (let column = 0; column < TABLE_COLUMNS; column += 1) {
      const cell = el('td', 'catalogue-table__cell');
      const entry = cards[start + column];
      if (entry) {
        cell.append(createSectionCard(entry, onSelect));
      }
      row.append(cell);
    }
    body.append(row);
  }

  const table = el('table', 'catalogue-table');
  table.append(body);
  return el('section', 'catalogue-section', header, table);
}

/** Renders one clickable (and keyboard-activatable) catalogue card. */
function createSectionCard(
  entry: CatalogueEntry,
  onSelect: (type: RealCardType, trigger: HTMLElement) => void,
): HTMLElement {
  const instance: CatalogueCard = { type: entry.type };
  const card = renderCard(instance, rarityColor, { overrideDescriptions: true });
  card.addEventListener('click', () => onSelect(entry.type, card));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(entry.type, card);
    }
  });
  return card;
}

/**
 * Builds the side panel: a dimmed backdrop plus a drawer on the right that
 * shows one card in full. Closes on backdrop click, the close button or Escape.
 */
function createCardPanel(): CardPanel {
  const content = el('div', 'card-panel__content');

  const closeButton = el('button', 'card-panel__close', '×');
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Close card details');

  const drawer = el('aside', 'card-panel', closeButton, content);
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-label', 'Card details');

  const backdrop = el('div', 'card-panel-layer__backdrop');
  const layer = el('div', 'card-panel-layer', backdrop, drawer);
  layer.hidden = true;

  let lastFocused: HTMLElement | undefined;

  function close(): void {
    if (layer.hidden) {
      return;
    }
    layer.hidden = true;
    const target = lastFocused;
    lastFocused = undefined;
    if (target?.isConnected) {
      target.focus();
    }
  }

  function open(type: RealCardType, trigger: HTMLElement): void {
    lastFocused = trigger;
    const instance: CatalogueCard = { type };
    content.replaceChildren(
      renderCard(instance, rarityColor, { overrideDescriptions: true, interactive: false }),
    );
    layer.hidden = false;
    closeButton.focus();
  }

  backdrop.addEventListener('click', close);
  closeButton.addEventListener('click', close);
  drawer.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
    }
  });

  return { element: layer, open, close };
}
