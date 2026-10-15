/**
 * Hammer cards. Cards without a second bullet use the movement override
 * for their bottom ability.
 */
import { defineCardType } from '../../core/card';
import type { RealCardType } from './types';
import { CardTag } from '../tags';
import { Rarity } from '../rarity';
import { scaledHours } from '../time';

const DISCARD_TWO_TEXT = 'Discard any two cards, then draw two cards and choose one to add to inventory.';

export const HAMMER: RealCardType = defineCardType({
  name: 'Hammer',
  tag: CardTag.Hammer,
  rarity: Rarity.Common,
  topAbility: { text: DISCARD_TWO_TEXT }
});

export const BLUDGEON: RealCardType = defineCardType({
  name: 'Bludgeon',
  tag: CardTag.Hammer,
  rarity: Rarity.Rare,
  topAbility: {
    text: 'After the bottom ability of any/all cards has been activated 4 times in total since last refresh, draw 1 card.',
  },
  bottomAbility: { text: DISCARD_TWO_TEXT },
});

export const MALLET_OF_FIRE_AND_ICE: RealCardType = defineCardType({
  name: 'Mallet of fire and ice',
  tag: CardTag.Hammer,
  rarity: Rarity.Rare,
  topAbility: {
    text: 'If the two discarded cards’ bottom effects are both movements, 25% chance to receive 🪙.',
  },
  bottomAbility: { text: DISCARD_TWO_TEXT },
});

export const AUTOHAMMER: RealCardType = defineCardType({
  name: 'Autohammer',
  tag: CardTag.Hammer,
  rarity: Rarity.Rare,
  topAbility: {
    text: '+1 build range. Cannot teleport using your pylons if this card\'s bottom ability have been used since last refresh.',
  },
  bottomAbility: { text: DISCARD_TWO_TEXT },
});

export const PINE: RealCardType = defineCardType({
  name: 'Pine',
  tag: CardTag.Hammer,
  rarity: Rarity.Rare,
  topAbility: {
    text: 'Can expend ⚰️⚰️ or 🧤🧤 to receive +2 build range for one build.',
  },
  bottomAbility: { text: DISCARD_TWO_TEXT },
});

export const HAMMERSHARK: RealCardType = defineCardType({
  name: 'Hammershark',
  tag: CardTag.Hammer,
  rarity: Rarity.Rare,
  topAbility: {
    text: 'Expend 🌾🌾, draw three cards, and choose one to add to inventory.',
  },
  bottomAbility: { text: DISCARD_TWO_TEXT },
});

export const INDESTRUCTIUM_MAUL: RealCardType = defineCardType({
  name: 'Indestructium maul',
  tag: CardTag.Hammer,
  rarity: Rarity.Rare,
  topAbility: {
    text: `+1 build range. Modifies this hammer’s bottom ability to choosing one out of three drawn cards with a ${scaledHours(8)}-hour cooldown.`,
  },
  bottomAbility: { text: DISCARD_TWO_TEXT },
});

export const GLACIAL_MOON: RealCardType = defineCardType({
  name: 'Glacial moon',
  tag: CardTag.Hammer,
  rarity: Rarity.Mythical,
  topAbility: {
    text: `+1 build range. You can convert this hammer to a Mallet of fire and ice and permanently destroy all resource tiles in 3x3 of you on the map.`,
  },
  bottomAbility: { text: DISCARD_TWO_TEXT },
});

export const SUNFALL: RealCardType = defineCardType({
  name: 'Sunfall',
  tag: CardTag.Hammer,
  rarity: Rarity.Mythical,
  topAbility: {
    text: `+1 build range. You can convert this hammer to a Mallet of fire and ice and permanently increase the cap of all resources by 2, then draw 5 cards.`,
  },
  bottomAbility: { text: DISCARD_TWO_TEXT },
});

export const FOUR_DRAGONS: RealCardType = defineCardType({
  name: 'Four dragons',
  tag: CardTag.Hammer,
  rarity: Rarity.Mythical,
  topAbility: {
    text: `+4 build range, but -1 build range per building or wire built while this card is slotted in a hammer slot, stackable, for a minimum of +0 build range.`,
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
  GLACIAL_MOON,
  SUNFALL,
  FOUR_DRAGONS
];
