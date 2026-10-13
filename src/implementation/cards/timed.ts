/**
 * Timed cards. Single-bullet cards use the movement override for their
 * bottom ability.
 */
import { defineCardType } from '../../core/card';
import type { RealCardType } from './types';
import { CardTag } from '../tags';
import { Rarity } from '../rarity';
import { movementOverride } from '../generators';
import { hoursLabel, scaledHours } from '../time';

export const RED_CULTURE: RealCardType = defineCardType({
  name: 'Red culture',
  tag: CardTag.Timed,
  rarity: Rarity.Common,
  topAbility: {
    text: `After ${hoursLabel(10)}, each charged pylon generates resources for each red resource within its field.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const YELLOW_CULTURE: RealCardType = defineCardType({
  name: 'Yellow culture',
  tag: CardTag.Timed,
  rarity: Rarity.Common,
  topAbility: {
    text: `After ${hoursLabel(10)}, each charged pylon generates resources for each yellow resource within its field.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const GREEN_CULTURE: RealCardType = defineCardType({
  name: 'Green culture',
  tag: CardTag.Timed,
  rarity: Rarity.Common,
  topAbility: {
    text: `After ${hoursLabel(10)}, each charged pylon generates resources for each green resource within its field.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const BLUE_CULTURE: RealCardType = defineCardType({
  name: 'Blue culture',
  tag: CardTag.Timed,
  rarity: Rarity.Common,
  topAbility: {
    text: `After ${hoursLabel(10)}, each charged pylon generates resources for each blue resource within its field.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const RAINBOW_CULTURE: RealCardType = defineCardType({
  name: 'Rainbow culture',
  tag: CardTag.Timed,
  rarity: Rarity.Common,
  topAbility: {
    text: `After ${hoursLabel(10)}, each charged pylon in 3x3 of player generates resources for each resource within its field.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const FOGS_OF_WAR: RealCardType = defineCardType({
  name: 'Fogs of war',
  tag: CardTag.Timed,
  rarity: Rarity.Uncommon,
  topAbility: {
    text: `For the next ${scaledHours(6)} to ${hoursLabel(12)} (you specify), ALL cards directed at you lose their effects (including ones from yourself).`,
  },
  bottomAbility: {
    text: `For the next ${scaledHours(6)} to ${hoursLabel(12)} (you specify), you become immune to movement.`,
  },
});

export const NEUROGENESIS: RealCardType = defineCardType({
  name: 'Neurogenesis',
  tag: CardTag.Timed,
  rarity: Rarity.Common,
  topAbility: {
    text: `After ${hoursLabel(12)}, draw two cards.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const COSMOGENESIS: RealCardType = defineCardType({
  name: 'Cosmogenesis',
  tag: CardTag.Timed,
  rarity: Rarity.Common,
  topAbility: {
    text: `After ${hoursLabel(12)}, gain one resource of choice.`,
  },
  bottomAbility: {
    text: `After ${hoursLabel(6)}, for each resource you have 25% chance to gain one (except for wires).`,
  },
});

export const STRANGLE: RealCardType = defineCardType({
  name: 'Strangle',
  tag: CardTag.Timed,
  rarity: Rarity.Rare,
  topAbility: {
    text: `Add this card to the action slots of any player for ${hoursLabel(6)}.`,
  },
  bottomAbility: {
    text: `Clear one action slot of a willing player.`,
  },
});

export const CHARGE: RealCardType = defineCardType({
  name: 'Charge',
  tag: CardTag.Timed,
  rarity: Rarity.Rare,
  topAbility: {
    text: `After ${hoursLabel(6)}, move 5 steps in any cardinal direction.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const MAGICAL_CONDUITS: RealCardType = defineCardType({
  name: 'Magical conduits',
  tag: CardTag.Timed,
  rarity: Rarity.Common,
  topAbility: {
    text: `After ${hoursLabel(3)}, expend ⚰️🧤 or ⚰️🪙 and make 3 wires.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const SPRINT: RealCardType = defineCardType({
  name: 'Sprint',
  tag: CardTag.Timed,
  rarity: Rarity.Common,
  topAbility: {
    text: 'Destroy any building that you own.',
  },
  bottomAbility: {
    text: `After ${hoursLabel(1)}, expend 🌾 to move twice in different directions.`,
  },
});

export const PHANTOM_TRAPS: RealCardType = defineCardType({
  name: 'Phantom traps',
  tag: CardTag.Timed,
  rarity: Rarity.Rare,
  topAbility: {
    text: `Forcibly add this card to their action slots. +1 action slot capacity while active. After ${hoursLabel(6)}, force that player to teleport to a tile neighboring one of their pylons.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const RAIDS_FROM_HELL: RealCardType = defineCardType({
  name: 'Raids from hell',
  tag: CardTag.Timed,
  rarity: Rarity.Rare,
  topAbility: {
    text: `After ${hoursLabel(6)}, the player(s) with the most amount of resources discard half of their resources (rounded up). In case of a tie, all players in the tie do the same.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const LOCK_OF_ETHER: RealCardType = defineCardType({
  name: 'Lock of ether',
  tag: CardTag.Timed,
  rarity: Rarity.Rare,
  topAbility: {
    text: `Forcibly add this card to their action slots, then choose one normal inventory slot. For ${hoursLabel(6)}, +1 action slot capacity, and that inventory slot becomes locked.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const EXTENDED_DRAW: RealCardType = defineCardType({
  name: 'Extended draw',
  tag: CardTag.Timed,
  rarity: Rarity.Legendary,
  topAbility: {
    text: `For the next ${hoursLabel(6)}, each time a pylon or sentry is destroyed, you draw one card.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const BALL_LIGHTNING: RealCardType = defineCardType({
  name: 'Ball lightning',
  tag: CardTag.Timed,
  rarity: Rarity.Legendary,
  topAbility: {
    text: `After ${hoursLabel(12)}, unleash ball lightning, which moves 2 tiles in a random direction every ${hoursLabel(6)}. It destroys all adjacent wires and will destroy any pylon it lands on.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const SHIFT_IN_PERSPECTIVE: RealCardType = defineCardType({
  name: 'Shift in perspective',
  tag: CardTag.Timed,
  rarity: Rarity.Legendary,
  topAbility: {
    text: `Specify a direction and expend 🧤, and after ${hoursLabel(3)}, all neighboring pylons that you own will move one step in that direction, if possible.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const TIMED_CARDS: readonly RealCardType[] = [
  RED_CULTURE,
  YELLOW_CULTURE,
  GREEN_CULTURE,
  BLUE_CULTURE,
  RAINBOW_CULTURE,
  FOGS_OF_WAR,
  NEUROGENESIS,
  COSMOGENESIS,
  STRANGLE,
  CHARGE,
  MAGICAL_CONDUITS,
  SPRINT,
  PHANTOM_TRAPS,
  RAIDS_FROM_HELL,
  EXTENDED_DRAW,
  BALL_LIGHTNING,
  SHIFT_IN_PERSPECTIVE,
];
