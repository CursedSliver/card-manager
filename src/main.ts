/**
 * App entry point: wires the fixed decks into the "Draw cards" view.
 * Handles drawing (with 2s cooldown), sorting, selection and TSV copying.
 */
import type { CardInstance } from './core/card';
import { resolveBottomAbility, resolveTopAbility } from './core/card';
import type { Deck } from './core/deck';
import { drawFromDeck } from './core/deck';
import { el, formatAbilityForSheet, renderCard } from './core/ui';
import { DECKS } from './implementation/decks';
import { cardTagRank } from './implementation/tags';
import { RARITY_COLORS, Rarity, rarityRank } from './implementation/rarity';
import { TIME_MULTIPLIER, TIME_MULTIPLIER_PARAM } from './implementation/time';

const DRAW_COOLDOWN_MS = 2000;
const COPY_FEEDBACK_MS = 1200;
const DEFAULT_DRAW_COUNT = 1;
const MAX_DRAW_COUNT = 100;

interface DeckState {
  readonly deck: Deck;
  readonly countInput: HTMLInputElement;
  readonly drawButton: HTMLButtonElement;
  readonly sortButton: HTMLButtonElement;
  readonly raritySortButton: HTMLButtonElement;
  readonly cardsContainer: HTMLElement;
  cards: CardInstance[];
  readonly selected: Set<CardInstance>;
  cooldownTimer: number | undefined;
}

const deckStates: DeckState[] = [];

function init(): void {
  const decksView = document.querySelector<HTMLElement>('#decks-view');
  if (!decksView) {
    throw new Error('#decks-view element not found.');
  }
  for (const deck of DECKS) {
    deckStates.push(createDeckState(decksView, deck));
  }
  wireCopyActions();
  wireTimePanel();
}

/** Wires the "Set time mult" panel: shows the current multiplier and reloads with a new one. */
function wireTimePanel(): void {
  const input = document.querySelector<HTMLInputElement>('#time-mult-input');
  const applyButton = document.querySelector<HTMLButtonElement>('#time-mult-apply');
  const currentLabel = document.querySelector<HTMLElement>('#time-mult-current');
  if (!input || !applyButton || !currentLabel) {
    return;
  }

  input.value = String(TIME_MULTIPLIER);
  currentLabel.textContent = `Current: ×${TIME_MULTIPLIER}`;

  applyButton.addEventListener('click', () => {
    if (!input.reportValidity()) {
      return;
    }
    const multiplier = Number.parseFloat(input.value);
    if (!Number.isFinite(multiplier) || multiplier <= 0) {
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.set(TIME_MULTIPLIER_PARAM, String(multiplier));
    window.location.assign(url.toString());
  });
}

function createDeckState(parent: HTMLElement, deck: Deck): DeckState {
  const countInput = el('input', 'count-input');
  countInput.type = 'number';
  countInput.min = '1';
  countInput.max = String(MAX_DRAW_COUNT);
  countInput.value = String(deck.perDrawAmount ?? DEFAULT_DRAW_COUNT);
  if (deck.perDrawAmount !== undefined) {
    countInput.disabled = true;
  }

  const drawButton = el('button', 'button button--primary deck__draw-button', 'Draw cards');
  drawButton.type = 'button';

  const controls = el(
    'div',
    'deck__controls',
    el('label', 'count-field', 'Cards to draw', countInput),
    drawButton,
  );

  const cardsContainer = el('div', 'deck__cards');

  const sortButton = el('button', 'button button--ghost button--small', 'Sort by tag');
  sortButton.type = 'button';
  sortButton.disabled = true;

  const raritySortButton = el('button', 'button button--ghost button--small', 'Sort by rarity');
  raritySortButton.type = 'button';
  raritySortButton.disabled = true;

  const body = el('div', 'deck__body');
  if (deck.description) {
    body.append(el('p', 'deck__description', deck.description));
  }
  body.append(controls, cardsContainer, el('div', 'deck__footer', sortButton, raritySortButton));

  const header = el(
    'header',
    'deck__header',
    el('h2', 'deck__name', deck.name),
    el('span', 'deck__chevron', '▾'),
  );

  const section = el('section', 'deck', header, body);
  header.addEventListener('click', () => {
    section.classList.toggle('deck--collapsed');
  });
  parent.append(section);

  const state: DeckState = {
    deck,
    countInput,
    drawButton,
    sortButton,
    raritySortButton,
    cardsContainer,
    cards: [],
    selected: new Set<CardInstance>(),
    cooldownTimer: undefined,
  };

  drawButton.addEventListener('click', () => handleDraw(state));
  sortButton.addEventListener('click', () => handleSort(state));
  raritySortButton.addEventListener('click', () => handleSortByRarity(state));
  renderCards(state);
  return state;
}

function handleDraw(state: DeckState): void {
  state.cards = drawFromDeck(state.deck, readDrawCount(state)).sort(compareByRarity);
  state.selected.clear();
  renderCards(state);
  startCooldown(state);
}

function readDrawCount(state: DeckState): number {
  if (state.deck.perDrawAmount !== undefined) {
    return state.deck.perDrawAmount;
  }
  const parsed = Number.parseInt(state.countInput.value, 10);
  if (!Number.isFinite(parsed)) {
    return DEFAULT_DRAW_COUNT;
  }
  return Math.min(Math.max(parsed, 1), MAX_DRAW_COUNT);
}

function startCooldown(state: DeckState): void {
  window.clearTimeout(state.cooldownTimer);
  state.drawButton.disabled = true;
  state.cooldownTimer = window.setTimeout(() => {
    state.drawButton.disabled = false;
    state.cooldownTimer = undefined;
  }, DRAW_COOLDOWN_MS);
}

function handleSort(state: DeckState): void {
  state.cards = [...state.cards].sort(
    (a, b) => cardTagRank(a.type.tag) - cardTagRank(b.type.tag),
  );
  renderCards(state);
}

function compareByRarity(a: CardInstance, b: CardInstance): number {
  return rarityRank(a.type.rarity) - rarityRank(b.type.rarity);
}

function handleSortByRarity(state: DeckState): void {
  state.cards = [...state.cards].sort(compareByRarity);
  renderCards(state);
}

function getRarityColor(rarity: string): string | undefined {
  return RARITY_COLORS[rarity as Rarity];
}

function renderCards(state: DeckState): void {
  state.cardsContainer.replaceChildren();
  if (state.cards.length === 0) {
    state.cardsContainer.append(el('p', 'deck__empty', 'No cards drawn yet.'));
    setSortButtonsDisabled(state, true);
    return;
  }
  for (const card of state.cards) {
    const element = renderCard(card, getRarityColor);
    if (state.selected.has(card)) {
      element.classList.add('card--selected');
    }
    element.addEventListener('click', () => toggleSelection(state, card, element));
    element.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleSelection(state, card, element);
      }
    });
    state.cardsContainer.append(element);
  }
  setSortButtonsDisabled(state, false);
}

function setSortButtonsDisabled(state: DeckState, disabled: boolean): void {
  state.sortButton.disabled = disabled;
  state.raritySortButton.disabled = disabled;
}

function toggleSelection(state: DeckState, card: CardInstance, element: HTMLElement): void {
  if (state.selected.has(card)) {
    state.selected.delete(card);
    element.classList.remove('card--selected');
  } else {
    state.selected.add(card);
    element.classList.add('card--selected');
  }
}

function wireCopyActions(): void {
  const copySelectedButton = document.querySelector<HTMLButtonElement>('#copy-selected');
  const copyAllButton = document.querySelector<HTMLButtonElement>('#copy-all');

  copySelectedButton?.addEventListener('click', () => {
    void copyCards(collectCards((_, card) => isSelected(card)), copySelectedButton);
  });
  copyAllButton?.addEventListener('click', () => {
    selectAll();
    void copyCards(collectCards(() => true), copyAllButton);
  });
}

function isSelected(card: CardInstance): boolean {
  return deckStates.some((state) => state.selected.has(card));
}

type CardFilter = (state: DeckState, card: CardInstance) => boolean;

/** Collects cards across all decks in display order, filtered by `include`. */
function collectCards(include: CardFilter): CardInstance[] {
  const result: CardInstance[] = [];
  for (const state of deckStates) {
    for (const card of state.cards) {
      if (include(state, card)) {
        result.push(card);
      }
    }
  }
  return result;
}

function selectAll(): void {
  for (const state of deckStates) {
    for (const card of state.cards) {
      state.selected.add(card);
    }
    renderCards(state);
  }
}

function toTsv(cards: readonly CardInstance[]): string {
  return cards
    .map((card) =>
      [
        card.type.name,
        formatAbilityForSheet(resolveTopAbility(card)),
        formatAbilityForSheet(resolveBottomAbility(card)),
        card.type.tag,
        card.type.rarity,
      ].join('\t'),
    )
    .join('\n');
}

async function copyCards(cards: readonly CardInstance[], button: HTMLButtonElement): Promise<void> {
  if (cards.length === 0) {
    flashButton(button, 'Nothing selected');
    return;
  }
  await copyText(toTsv(cards));
  flashButton(button, 'Copied!');
}

function flashButton(button: HTMLButtonElement, message: string): void {
  if (!button.dataset.label) {
    button.dataset.label = button.textContent ?? '';
  }
  button.textContent = message;
  button.classList.add('button--copied');
  window.setTimeout(() => {
    button.textContent = button.dataset.label ?? '';
    button.classList.remove('button--copied');
  }, COPY_FEEDBACK_MS);
}

async function copyText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.append(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  }
}

init();
