/**
 * Fixed list of decks.
 */
import type { Deck } from '../core/deck';
import { Generator } from '../core/generator';
import { HAMMER, HAMMER_CARDS, INSTANT_CARDS, TIMED_CARDS, type RealCardType } from './cards';
import { AbilityTag, CardTag } from './tags';
import { RARITY_DRAW_WEIGHT_MULTIPLIER } from './rarity';

export type ProofDeck = Deck<CardTag, AbilityTag>;

// --- Standard Deck -----------------------------------------------------------
// All non-immortal cards, drawn through three nested sub-generators, one per
// card tag. Within each sub-generator, each card is weighted by the draw
// multiplier of its rarity.
const HAMMER_SUBGENERATOR_WEIGHT = 0.06;
const INSTANT_SUBGENERATOR_WEIGHT = 1;
const TIMED_SUBGENERATOR_WEIGHT = 0.6;

// The plain "Hammer" card (Common, no special ability) is catalogue-only: it is
// never rolled from the standard deck, so it is excluded from the hammer pool.
const STANDARD_HAMMER_CARDS: readonly RealCardType[] = HAMMER_CARDS.filter((type) => type !== HAMMER);

function createCardSubGenerator(cards: readonly RealCardType[]): Generator<RealCardType> {
  return new Generator(
    cards.map((type) => ({
      weight: RARITY_DRAW_WEIGHT_MULTIPLIER[type.rarity],
      reward: type,
    })),
  );
}

export const STANDARD_DECK: ProofDeck = {
  name: 'Standard Deck',
  description: 'All non-immortal cards for the main world, except the plain Hammer.',
  pool: new Generator<RealCardType>([
    { weight: HAMMER_SUBGENERATOR_WEIGHT, reward: createCardSubGenerator(STANDARD_HAMMER_CARDS) },
    { weight: INSTANT_SUBGENERATOR_WEIGHT, reward: createCardSubGenerator(INSTANT_CARDS) },
    { weight: TIMED_SUBGENERATOR_WEIGHT, reward: createCardSubGenerator(TIMED_CARDS) },
  ]),
};

/** The fixed list of all decks. */
export const DECKS: readonly ProofDeck[] = [STANDARD_DECK];
