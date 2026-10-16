/**
 * Instant cards. Single-bullet cards use the movement override for their
 * bottom ability.
 */
import { defineCardType } from '../../core/card';
import type { RealCardType } from './types';
import { CardTag } from '../tags';
import { Rarity } from '../rarity';
import { movementOverride, movementOverrideTwo } from '../generators';
import { hoursLabel } from '../time';

export const REFRESH: RealCardType = defineCardType({
  name: 'Refresh',
  tag: CardTag.Instant,
  rarity: Rarity.Heavenly,
  topAbility: {
    text: 'Draw cards equal to half of your max hand size, rounded up, then destroy all other copies of Refresh that you have. ',
  },
  bottomAbility: {
    text: 'Using this card is considered as triggering Refresh for you. This card cannot be discarded, stolen, or transmuted.'
  }
});

export const RED_HARVEST: RealCardType = defineCardType({
  name: 'Red harvest',
  tag: CardTag.Instant,
  rarity: Rarity.Common,
  topAbility: {
    text: 'Each charged pylon generates resources for each red resource within its field.',
  },
  bottomAbilityOverride: movementOverride,
});

export const YELLOW_HARVEST: RealCardType = defineCardType({
  name: 'Yellow harvest',
  tag: CardTag.Instant,
  rarity: Rarity.Common,
  topAbility: {
    text: 'Each charged pylon generates resources for each yellow resource within its field.',
  },
  bottomAbilityOverride: movementOverride,
});

export const GREEN_HARVEST: RealCardType = defineCardType({
  name: 'Green harvest',
  tag: CardTag.Instant,
  rarity: Rarity.Common,
  topAbility: {
    text: 'Each charged pylon generates resources for each green resource within its field.',
  },
  bottomAbilityOverride: movementOverride,
});

export const BLUE_HARVEST: RealCardType = defineCardType({
  name: 'Blue harvest',
  tag: CardTag.Instant,
  rarity: Rarity.Common,
  topAbility: {
    text: 'Each charged pylon generates resources for each blue resource within its field.',
  },
  bottomAbilityOverride: movementOverride,
});

export const RAINBOW_HARVEST: RealCardType = defineCardType({
  name: 'Rainbow harvest',
  tag: CardTag.Instant,
  rarity: Rarity.Uncommon,
  topAbility: {
    text: 'Each charged pylon in 3x3 of player generates resources for each resource within its field.',
  },
  bottomAbilityOverride: movementOverride,
});

export const TRANSMUTE: RealCardType = defineCardType({
  name: 'Transmute',
  tag: CardTag.Instant,
  rarity: Rarity.Common,
  topAbility: {
    text: `Convert 3 of the same resource into a resource of choice.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const CLEANSE: RealCardType = defineCardType({
  name: 'Cleanse',
  tag: CardTag.Instant,
  rarity: Rarity.Uncommon,
  topAbility: {
    text: 'Destroy a pylon or sentry in 3x3 of yourself and gain 🧤. If it\'s a pylon: [if it does not belong to you, the owner of the pylon obtains this card; if not, you gain two more reosurces of choice].',
  },
  bottomAbility: {
    text: 'Convert a pylon or Greater pylon you own to a stake or Greater stake. A stake has all abilities of pylons but are not pylons.'
  },
});

export const INCEPTION: RealCardType = defineCardType({
  name: 'Inception',
  tag: CardTag.Instant,
  rarity: Rarity.Common,
  topAbility: {
    text: 'Steal one random non-hammer mortal card from a player and give them one resource of your choice.',
  },
  bottomAbilityOverride: movementOverride,
});

export const DISMANTLE: RealCardType = defineCardType({
  name: 'Dismantle',
  tag: CardTag.Instant,
  rarity: Rarity.Uncommon,
  topAbility: {
    text: 'Destroy a wire within your build range and have a 50% chance to gain 🪙.',
  },
  bottomAbilityOverride: movementOverride,
});

export const MINDWORM: RealCardType = defineCardType({
  name: 'Mindworm',
  tag: CardTag.Instant,
  rarity: Rarity.Uncommon,
  topAbility: {
    text: 'A player of your choice lose two mortal cards of their choice.',
  },
  bottomAbility: {
    text: 'A player of your choice lose two resources of their choice.',
  },
});

export const INVADE: RealCardType = defineCardType({
  name: 'Invade',
  tag: CardTag.Instant,
  rarity: Rarity.Uncommon,
  topAbility: {
    text: 'Give a player 1 card and take 1 resource of choice from them.',
  },
  bottomAbilityOverride: movementOverride,
});

export const DILATED_CAPSULE: RealCardType = defineCardType({
  name: 'Dilated capsule',
  tag: CardTag.Instant,
  rarity: Rarity.Uncommon,
  topAbility: {
    text: 'Send a player any 1 or 2 cards that you have.',
  },
  bottomAbility: {
    text: 'Send this card to a player, or move 1 in any direction.',
  },
});

export const SEED_OF_MYTHS: RealCardType = defineCardType({
  name: 'Seed of myths',
  tag: CardTag.Instant,
  rarity: Rarity.Uncommon,
  topAbility: {
    text: `Give this card alongside any other card to another player’s inventory. If this card is used twice in ${hoursLabel(12)}, or if its current holder teleports using their pylon network, this card is destroyed.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const FORTIFY: RealCardType = defineCardType({
  name: 'Fortify',
  tag: CardTag.Instant,
  rarity: Rarity.Rare,
  topAbility: {
    text: 'Upgrade a sentry that you own in 3x3 of yourself to a Greater sentry using 🪙🧤⚰️ or 🌾🌾🌾🌾. A Greater sentry produces a force field in 5x5 instead of 3x3.',
  },
  bottomAbilityOverride: movementOverride,
});

export const PHONE_CALL_TO_GOD: RealCardType = defineCardType({
  name: 'Phone call to God',
  tag: CardTag.Instant,
  rarity: Rarity.Common,
  topAbility: {
    text: 'Once per game, if you own at least 3 pylons, expend ⚰️🪙🧤🌾 and gain “Heavenly sacrifice” and “Pillars of worship”, and increase hand size by 2 permanently.',
  },
  bottomAbility: {
    text: 'Roll D20, then gain that many prestige points and heavenly chips.',
  },
});

export const ADAPT: RealCardType = defineCardType({
  name: 'Adapt',
  tag: CardTag.Instant,
  rarity: Rarity.Plentiful,
  topAbilityOverride: movementOverrideTwo,
  bottomAbilityOverride: movementOverride
});

export const FREE_MOVE: RealCardType = defineCardType({
  name: 'Free move',
  tag: CardTag.Instant,
  rarity: Rarity.Rare,
  topAbility: {
    text: 'Move one in any cardinal direction.',
  },
  bottomAbility: {
    text: 'Double the distance of the next move.',
  },
});

export const PLAY_GOM: RealCardType = defineCardType({
  name: 'Zedong\'s emblem',
  tag: CardTag.Instant,
  rarity: Rarity.Mythical,
  topAbility: {
    text: 'Solve a 10-lives Game of Mao to gain a non-immortal, non-mythical card of your choice.',
  },
  bottomAbilityOverride: movementOverride,
});

export const COOK: RealCardType = defineCardType({
  name: 'Chef\'s emblem',
  tag: CardTag.Instant,
  rarity: Rarity.Mythical,
  topAbility: {
    text: 'Cook up a successful virtual dish to gain a non-immortal, non-mythical card of your choice.',
  },
  bottomAbilityOverride: movementOverride,
});

export const INSTANT_CARDS: readonly RealCardType[] = [
  REFRESH,
  ADAPT,
  RED_HARVEST,
  YELLOW_HARVEST,
  GREEN_HARVEST,
  BLUE_HARVEST,
  RAINBOW_HARVEST,
  PHONE_CALL_TO_GOD,
  CLEANSE,
  INCEPTION,
  DISMANTLE,
  MINDWORM,
  INVADE,
  DILATED_CAPSULE,
  SEED_OF_MYTHS,
  FORTIFY,
  FREE_MOVE,
  PLAY_GOM,
  COOK
];
