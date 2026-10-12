/**
 * Hammer cards. Cards without a second bullet use the movement override
 * for their bottom ability.
 */
import { defineCardType } from '../../core/card';
import type { RealCardType } from './types';
import { CardTag } from '../tags';
import { Rarity } from '../rarity';
import { movementOverrideGenerator } from '../generators';

const DISCARD_TWO_TEXT = 'Discard any two cards, then draw two cards and choose one to add to inventory.';

export const HAMMER: RealCardType = defineCardType({
  name: 'Hammer',
  tag: CardTag.Hammer,
  rarity: Rarity.Common,
  topAbility: { text: DISCARD_TWO_TEXT },
  bottomAbilityOverride: movementOverrideGenerator,
});

export const BLUDGEON: RealCardType = defineCardType({
  name: 'Bludgeon',
  tag: CardTag.Hammer,
  rarity: Rarity.Common,
  topAbility: {
    text: 'After the bottom ability of any/all cards has been activated 4 times in total since last refresh, draw 1 card.',
  },
  bottomAbility: { text: DISCARD_TWO_TEXT },
});

export const MALLET_OF_FIRE_AND_ICE: RealCardType = defineCardType({
  name: 'Mallet of fire and ice',
  tag: CardTag.Hammer,
  rarity: Rarity.Common,
  topAbility: {
    text: 'If the two discarded cards’ bottom effects are both movements and can be in opposite directions, receive 🪙.',
  },
  bottomAbility: { text: DISCARD_TWO_TEXT },
});

export const AUTOHAMMER: RealCardType = defineCardType({
  name: 'Autohammer',
  tag: CardTag.Hammer,
  rarity: Rarity.Common,
  topAbility: {
    text: '+1 build range. When building a pylon, can teleport to any pylon (including the newly built one).',
  },
  bottomAbility: { text: DISCARD_TWO_TEXT },
});

export const PINE: RealCardType = defineCardType({
  name: 'Pine',
  tag: CardTag.Hammer,
  rarity: Rarity.Common,
  topAbility: {
    text: '+1 build range. Can expend ⚰️🧤, ⚰️⚰️, or 🧤🧤 to receive additional +1 build range for one build.',
  },
  bottomAbility: { text: DISCARD_TWO_TEXT },
});

export const HAMMERSHARK: RealCardType = defineCardType({
  name: 'Hammershark',
  tag: CardTag.Hammer,
  rarity: Rarity.Common,
  topAbility: {
    text: 'Can use one 🌾 to substitute for up to one discarded card in the exchange.',
  },
  bottomAbility: { text: DISCARD_TWO_TEXT },
});

export const INDESTRUCTIUM_MAUL: RealCardType = defineCardType({
  name: 'Indestructium maul',
  tag: CardTag.Hammer,
  rarity: Rarity.Common,
  topAbility: {
    text: '+1 build range. Modifies this hammer’s top ability to choosing one out of three drawn cards with a 12-hour cooldown.',
  },
  bottomAbility: { text: DISCARD_TWO_TEXT },
});

export const HAMMER_CARDS: readonly RealCardType[] = [
  HAMMER,
  BLUDGEON,
  MALLET_OF_FIRE_AND_ICE,
  AUTOHAMMER,
  PINE,
  HAMMERSHARK,
  INDESTRUCTIUM_MAUL,
];
