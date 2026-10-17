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
    text: 'This card cannot be discarded, stolen, or transmuted. The slot this card is on cannot be disabled.'
  }
});

export const PROOF_OF_DIVINITY: RealCardType = defineCardType({
  name: 'Proof of divinity',
  tag: CardTag.Instant,
  rarity: Rarity.Heavenly,
  topAbility: {
    text: 'Upgrade a pylon in 3x3 of yourself to a Greater pylon. A Greater pylon generates 25 prestige points and heavenly chips per refresh and has a 5x5 force field instead of 3x3, but -2 max hand size.',
  }
});

export const DECLARATION_OF_HERESY: RealCardType = defineCardType({
  name: 'Declaration of heresy',
  tag: CardTag.Instant,
  rarity: Rarity.Heavenly,
  topAbility: {
    text: 'Downgrade a Greater pylon to a regular pylon in 5x5 of yourself, then draw 1 card.',
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
    text: `Destroy one of your sentries in 3x3 of yourself.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const CLEANSE: RealCardType = defineCardType({
  name: 'Cleanse',
  tag: CardTag.Instant,
  rarity: Rarity.Uncommon,
  topAbility: {
    text: 'Destroy a pylon, sentry, or stake in 3x3 of yourself and gain 🧤. If it\'s a pylon: [if it does not belong to you, the owner of the pylon obtains this card; if not, you gain two more reosurces of choice].',
  },
  bottomAbility: {
    text: 'Convert a pylon or Greater pylon you own to a stake or Greater stake. A stake has all abilities of pylons but are not pylons.'
  },
});

export const INCEPTION: RealCardType = defineCardType({
  name: 'Inception',
  tag: CardTag.Instant,
  rarity: Rarity.Uncommon,
  topAbility: {
    // for round-based: force someone to use a card?
    text: 'Steal one random non-hammer mortal card from a player and give them one resource of your choice.',
  },
  bottomAbilityOverride: movementOverride,
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
  rarity: Rarity.Common,
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
    text: 'Upgrade a sentry that you own in 3x3 of yourself to a Greater sentry using 🪙🧤⚰️ or 🌾🌾🌾🌾, then give this card to a person with least amount of PP. A Greater sentry produces a force field in 5x5 instead of 3x3.',
  },
  bottomAbilityOverride: movementOverride,
});

export const ADAPT: RealCardType = defineCardType({
  name: 'Adapt',
  tag: CardTag.Instant,
  rarity: Rarity.Common,
  topAbilityOverride: movementOverrideTwo,
  bottomAbilityOverride: movementOverride
});

export const SPRINT: RealCardType = defineCardType({
  name: 'Sprint',
  tag: CardTag.Instant,
  rarity: Rarity.Uncommon,
  topAbility: {
    text: 'Destroy any building that you own.',
  },
  bottomAbility: {
    text: `Expend 🌾 to move in any direction. Can repeat this up to twice.`,
  },
});

export const PRIMORDIAL: RealCardType = defineCardType({
  name: 'Primordial conglomeration',
  tag: CardTag.Instant,
  rarity: Rarity.Rare,
  topAbility: {
    text: 'Create a copy of any non-immmortal card you have in your inventory that is less rare than this card.',
  },
  bottomAbility: {
    text: 'Arbitrarily increase the distance of the next move.',
  },
});

export const TELEPATH: RealCardType = defineCardType({
  name: 'Telepath',
  tag: CardTag.Instant,
  rarity: Rarity.Rare,
  topAbility: {
    text: `Make up to 2 purchases from the mountain without needing to be inside the mountain.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const MATERIALIZE: RealCardType = defineCardType({
  name: 'Materialize',
  tag: CardTag.Instant,
  rarity: Rarity.Legendary,
  topAbility: {
    text: `Create an unmoving clone of yourself. You can use cards on the clone's behalf; the clone is destroyed if it is pushed or if you use another Materialize.`,
  },
  bottomAbility: {
    text: `Create a Greater sentry in 3x3 of yourself for no cost.`
  }
});

export const TRANSCEND: RealCardType = defineCardType({
  name: 'Transcend',
  tag: CardTag.Instant,
  rarity: Rarity.Legendary,
  topAbility: {
    text: `A resource type of your choice gains +3 capacity permanently.`,
  },
  bottomAbilityOverride: movementOverride
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
  PROOF_OF_DIVINITY,
  DECLARATION_OF_HERESY,
  ADAPT,
  RED_HARVEST,
  YELLOW_HARVEST,
  GREEN_HARVEST,
  BLUE_HARVEST,
  RAINBOW_HARVEST,
  TRANSMUTE,
  CLEANSE,
  INCEPTION,
  INVADE,
  DILATED_CAPSULE,
  SEED_OF_MYTHS,
  SPRINT,
  FORTIFY,
  PRIMORDIAL,
  TELEPATH,
  MATERIALIZE,
  TRANSCEND,
  PLAY_GOM,
  COOK
];
