/**
 * Generic UI helpers shared by the app: element factory, card rendering and
 * sheet (TSV) formatting. Contains no game logic and no concrete card data.
 */
import {
  resolveBottomAbility,
  resolveTopAbility,
  type Ability,
  type AbilityOverride,
  type CardInstance,
} from './card';

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

/** Display options for {@link renderCard}. */
export interface CardRenderOptions {
  /**
   * When true, ability overrides render the description of what they roll
   * instead of a rolled ability (there is no roll when displaying a card type).
   */
  readonly overrideDescriptions?: boolean;
  /**
   * When false, the card is rendered as a non-interactive element (no button
   * role and no focus). Defaults to true, matching the card roller.
   */
  readonly interactive?: boolean;
}

/** Renders a card instance as a centered card element. */
export function renderCard<
  TCardTag extends string = string,
  TAbilityTag extends string = string,
  TRarity extends string = string,
>(
  instance: CardInstance<TCardTag, TAbilityTag, TRarity>,
  rarityColor?: RarityColorResolver,
  options: CardRenderOptions = {},
): HTMLElement {
  const card = el('article', 'card');
  if (options.interactive ?? true) {
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
  }
  card.setAttribute('aria-label', instance.type.name);

  card.append(el('h3', 'card__title', instance.type.name));
  card.append(el('hr', 'card__divider'));
  appendAbility(card, resolveDisplayAbility(instance, 'top', options));
  card.append(el('p', 'card__or', 'OR'));
  appendAbility(card, resolveDisplayAbility(instance, 'bottom', options));
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

/** Which half of a card an ability belongs to. */
type CardSide = 'top' | 'bottom';

/** The ability to display for one half of a card, flagged when it is an override. */
interface DisplayAbility<TAbilityTag extends string> {
  readonly ability?: Ability<TAbilityTag>;
  /** True when `ability` describes an override instead of being a real ability. */
  readonly override: boolean;
}

/**
 * Resolves the ability to display for one half of a card. When override
 * descriptions are requested and the half is backed by an override, the
 * override's description is shown bracketed and flagged as an override;
 * otherwise the static or rolled ability is.
 */
function resolveDisplayAbility<
  TCardTag extends string,
  TAbilityTag extends string,
  TRarity extends string,
>(
  instance: CardInstance<TCardTag, TAbilityTag, TRarity>,
  side: CardSide,
  options: CardRenderOptions,
): DisplayAbility<TAbilityTag> {
  const override: AbilityOverride<TAbilityTag> | undefined =
    side === 'top' ? instance.type.topAbilityOverride : instance.type.bottomAbilityOverride;
  if (options.overrideDescriptions && override) {
    return { ability: { text: `[${override.description}]` }, override: true };
  }
  return {
    ability: side === 'top' ? resolveTopAbility(instance) : resolveBottomAbility(instance),
    override: false,
  };
}

function appendAbility<TAbilityTag extends string>(
  card: HTMLElement,
  display: DisplayAbility<TAbilityTag>,
): void {
  const className = display.override
    ? 'card__ability card__ability--override'
    : 'card__ability';
  const paragraph = el('p', className);
  if (display.ability?.tag) {
    paragraph.append(el('strong', 'card__ability-tag', display.ability.tag), ' ');
  }
  paragraph.append(display.ability?.text ?? '');
  card.append(paragraph);
}
