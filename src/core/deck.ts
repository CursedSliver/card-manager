/**
 * Deck model.
 *
 * A deck is an infinite source of cards: drawing selects a card type via the
 * deck's pool Generator, then creates a card instance (rolling overrides).
 */
import type { Generator } from './generator';
import { createCardInstance, type CardInstance, type CardType } from './card';

export interface Deck<TCardTag extends string = string, TAbilityTag extends string = string> {
  readonly name: string;
  readonly description?: string;
  readonly pool: Generator<CardType<TCardTag, TAbilityTag>>;
  /** Fixed draw amount; when set, the draw count is not configurable. */
  readonly perDrawAmount?: number;
}

/** Draws `count` cards from an (infinite) deck. */
export function drawFromDeck<TCardTag extends string, TAbilityTag extends string>(
  deck: Deck<TCardTag, TAbilityTag>,
  count: number,
): CardInstance<TCardTag, TAbilityTag>[] {
  const instances: CardInstance<TCardTag, TAbilityTag>[] = [];
  for (let i = 0; i < count; i += 1) {
    instances.push(createCardInstance(deck.pool.roll()));
  }
  return instances;
}
