/**
 * Immortal cards. Not part of the Standard Deck.
 */
import { defineCardType } from '../../core/card';
import type { RealCardType } from './types';
import { CardTag } from '../tags';
import { Rarity } from '../rarity';

export const INSTANT_CONSTRUCTION: RealCardType = defineCardType({
  name: 'Instant construction',
  tag: CardTag.Immortal,
  rarity: Rarity.Common,
  topAbility: {
    text: 'Can construct a pylon on neighboring tiles using ⚰️⚰️🧤. Cannot build within 3x3 of another one of your pylons, or on foreign or disputed tiles.',
  },
  bottomAbility: {
    text: `Can construct a sentry on neighboring non-foreign tiles using 🌾🪙.`,
  },
});

export const NEUROPLASTICITY: RealCardType = defineCardType({
  name: 'Neuroplasticity',
  tag: CardTag.Immortal,
  rarity: Rarity.Common,
  topAbility: {
    text: 'Can discard 4 of the same resources and get another resource of your choice.',
  },
  bottomAbility: {
    text: 'Can form trade agreements with other players to exchange agreed-upon quantities of resources (not cards).',
  },
});

export const BRIGHTSTORM: RealCardType = defineCardType({
  name: 'Brightstorm',
  tag: CardTag.Immortal,
  rarity: Rarity.Common,
  topAbility: {
    text: 'Gain 2 wires for 🪙, or place down wires you already have onto a vertex of the tile you are at. Wires propagate electricity and can be used to charge another pylon.',
  },
  bottomAbility: {
    text: `If you move orthogonally and across a wire, successful or not, you can choose to trample it and can move orthogonally another time.`,
  },
});

export const IMMORTAL_CARDS: readonly RealCardType[] = [
  INSTANT_CONSTRUCTION,
  NEUROPLASTICITY,
  BRIGHTSTORM
];
