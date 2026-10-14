/**
 * Fixed list of decks.
 */
import type { Deck } from '../core/deck';
import { defineCardType } from '../core/card';
import { Generator } from '../core/generator';
import {
  HAMMER_CARDS,
  INSTANT_CARDS,
  PHONE_CALL_TO_GOD,
  TIMED_CARDS,
  type RealCardType,
} from './cards';
import { movementOverride } from './generators';
import { AbilityTag, CardTag } from './tags';
import { RARITY_DRAW_WEIGHT_MULTIPLIER, Rarity } from './rarity';

export type ProofDeck = Deck<CardTag, AbilityTag>;

// --- Standard Deck -----------------------------------------------------------
// All non-immortal cards, drawn through three nested sub-generators, one per
// card tag. Within each sub-generator, each card is weighted by the draw
// multiplier of its rarity.
const HAMMER_SUBGENERATOR_WEIGHT = 0.04;
const INSTANT_SUBGENERATOR_WEIGHT = 1;
const TIMED_SUBGENERATOR_WEIGHT = 0.6;

function createCardSubGenerator(cards: readonly RealCardType[]): Generator<RealCardType> {
  return new Generator(
    cards.map((type) => ({
      weight: RARITY_DRAW_WEIGHT_MULTIPLIER[type.rarity],
      reward: type,
    })),
  );
}

/** Builds the standard-deck pool around a given list of instant cards. */
function createPool(instantCards: readonly RealCardType[]): Generator<RealCardType> {
  return new Generator<RealCardType>([
    { weight: HAMMER_SUBGENERATOR_WEIGHT, reward: createCardSubGenerator(HAMMER_CARDS) },
    { weight: INSTANT_SUBGENERATOR_WEIGHT, reward: createCardSubGenerator(instantCards) },
    { weight: TIMED_SUBGENERATOR_WEIGHT, reward: createCardSubGenerator(TIMED_CARDS) },
  ]);
}

export const STANDARD_DECK: ProofDeck = {
  name: 'Standard Deck',
  description:
    'All non-immortal cards, drawn through three sub-generators: hammers ×0.05, instant ×1, timed ×0.6.',
  pool: createPool(INSTANT_CARDS),
};

// --- Alternate Deck ------------------------------------------------
// Identical to the Standard Deck, except Phone call to God: its bottom ability
// (12 prestige points and heavenly chips) is now its top ability, and its
// bottom ability is a movement override instead.
const PHONE_CALL_TO_GOD_MOVEMENT: RealCardType = defineCardType({
  name: 'Phone call to God',
  tag: CardTag.Instant,
  rarity: Rarity.Plentiful,
  topAbility: {
    text: 'Roll D20, then gain that many prestige points and heavenly chips.',
  },
  bottomAbilityOverride: movementOverride,
});

const MOVEMENT_INSTANT_CARDS: readonly RealCardType[] = INSTANT_CARDS.map((card) =>
  card === PHONE_CALL_TO_GOD ? PHONE_CALL_TO_GOD_MOVEMENT : card,
);

export const STANDARD_DECK_MOVEMENT: ProofDeck = {
  name: 'Alternate deck',
  description:
    'Identical to the Standard Deck, except Phone call to God has its bottom ability as its top ability and a movement override as its bottom ability. Used for the alt version.',
  pool: createPool(MOVEMENT_INSTANT_CARDS),
};

/** The fixed list of all decks. */
export const DECKS: readonly ProofDeck[] = [STANDARD_DECK, STANDARD_DECK_MOVEMENT];
