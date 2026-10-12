/**
 * Generic UI helpers shared by the app: element factory, card rendering and
 * sheet (TSV) formatting. Contains no game logic and no concrete card data.
 */
import { resolveBottomAbility, resolveTopAbility, type Ability, type CardInstance } from './card';

type Child = Node | string | null | undefined;

/** Creates a DOM element with an optional class and children. */
export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) {
    node.className = className;
  }
  node.append(...children.filter((child): child is Node | string => child != null));
  return node;
}

/** Formats an ability for TSV output: `[Tag] text` or plain `text`. */
export function formatAbilityForSheet(ability: Ability | undefined): string {
  if (!ability) {
    return '';
  }
  return ability.tag ? `[${ability.tag}] ${ability.text}` : ability.text;
}

/** Optional resolver mapping a rarity name to a CSS color for display. */
export type RarityColorResolver = (rarity: string) => string | undefined;

/** Renders a card instance as a centered, clickable card element. */
export function renderCard(
  instance: CardInstance,
  rarityColor?: RarityColorResolver,
): HTMLElement {
  const card = el('article', 'card');
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', instance.type.name);

  card.append(el('h3', 'card__title', instance.type.name));
  card.append(el('hr', 'card__divider'));
  appendAbility(card, resolveTopAbility(instance));
  card.append(el('p', 'card__or', 'OR'));
  appendAbility(card, resolveBottomAbility(instance));
  card.append(el('hr', 'card__divider'));
  const rarity = el('span', 'card__rarity', instance.type.rarity);
  const color = rarityColor?.(instance.type.rarity);
  if (color) {
    rarity.style.setProperty('--card-rarity-color', color);
  }
  card.append(rarity);
  card.append(el('span', 'card__tag', instance.type.tag));
  return card;
}

function appendAbility(card: HTMLElement, ability: Ability | undefined): void {
  const paragraph = el('p', 'card__ability');
  if (ability?.tag) {
    paragraph.append(el('strong', 'card__ability-tag', ability.tag), ' ');
  }
  paragraph.append(ability?.text ?? '');
  card.append(paragraph);
}
