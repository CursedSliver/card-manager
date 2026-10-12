/**
 * Timed cards. Single-bullet cards use the movement override for their
 * bottom ability.
 */
import { defineCardType } from '../../core/card';
import type { RealCardType } from './types';
import { CardTag } from '../tags';
import { Rarity } from '../rarity';
import { movementOverrideGenerator } from '../generators';

export const RED_CULTURE: RealCardType = defineCardType({
  name: 'Red culture',
  tag: CardTag.Timed,
  rarity: Rarity.Common,
  topAbility: {
    text: 'After 10 hours, each charged pylon generates resources for each red resource within its field.',
  },
  bottomAbilityOverride: movementOverrideGenerator,
});

export const YELLOW_CULTURE: RealCardType = defineCardType({
  name: 'Yellow culture',
  tag: CardTag.Timed,
  rarity: Rarity.Common,
  topAbility: {
    text: 'After 10 hours, each charged pylon generates resources for each yellow resource within its field.',
  },
  bottomAbilityOverride: movementOverrideGenerator,
});

export const GREEN_CULTURE: RealCardType = defineCardType({
  name: 'Green culture',
  tag: CardTag.Timed,
  rarity: Rarity.Common,
  topAbility: {
    text: 'After 10 hours, each charged pylon generates resources for each green resource within its field.',
  },
  bottomAbilityOverride: movementOverrideGenerator,
});

export const BLUE_CULTURE: RealCardType = defineCardType({
  name: 'Blue culture',
  tag: CardTag.Timed,
  rarity: Rarity.Common,
  topAbility: {
    text: 'After 10 hours, each charged pylon generates resources for each blue resource within its field.',
  },
  bottomAbilityOverride: movementOverrideGenerator,
});

export const RAINBOW_CULTURE: RealCardType = defineCardType({
  name: 'Rainbow culture',
  tag: CardTag.Timed,
  rarity: Rarity.Common,
  topAbility: {
    text: 'After 10 hours, each charged pylon in 3x3 of player generates resources for each resource within its field.',
  },
  bottomAbilityOverride: movementOverrideGenerator,
});

export const FOGS_OF_WAR: RealCardType = defineCardType({
  name: 'Fogs of war',
  tag: CardTag.Timed,
  rarity: Rarity.Common,
  topAbility: {
    text: 'For the next 6 to 12 hours (you specify), ALL cards directed at you lose their effects (including ones from yourself).',
  },
  bottomAbility: {
    text: 'For the next 6 to 12 hours (you specify), you become immune to movement.',
  },
});

export const NEUROGENESIS: RealCardType = defineCardType({
  name: 'Neurogenesis',
  tag: CardTag.Timed,
  rarity: Rarity.Common,
  topAbility: {
    text: 'After 12 hours, draw two cards.',
  },
  bottomAbilityOverride: movementOverrideGenerator,
});

export const COSMOGENESIS: RealCardType = defineCardType({
  name: 'Cosmogenesis',
  tag: CardTag.Timed,
  rarity: Rarity.Common,
  topAbility: {
    text: 'After 12 hours, gain one resource of choice.',
  },
  bottomAbility: {
    text: 'After 6 hours, gain two random resources.',
  },
});

export const CHARGE: RealCardType = defineCardType({
  name: 'Charge',
  tag: CardTag.Timed,
  rarity: Rarity.Common,
  topAbility: {
    text: 'After 6 hours, move 5 steps in any cardinal direction.',
  },
  bottomAbilityOverride: movementOverrideGenerator,
});

export const MAGICAL_CONDUITS: RealCardType = defineCardType({
  name: 'Magical conduits',
  tag: CardTag.Timed,
  rarity: Rarity.Common,
  topAbility: {
    text: 'After 3 hours, expend ⚰️🧤 or ⚰️🪙 and make 3 wires.',
  },
  bottomAbilityOverride: movementOverrideGenerator,
});

export const SPRINT: RealCardType = defineCardType({
  name: 'Sprint',
  tag: CardTag.Timed,
  rarity: Rarity.Common,
  topAbility: {
    text: 'Destroy any pylon that you own.',
  },
  bottomAbility: {
    text: 'After 1 hour, expend 🌾 to move twice in different directions.',
  },
});

export const SABOTEUR: RealCardType = defineCardType({
  name: 'Saboteur',
  tag: CardTag.Timed,
  rarity: Rarity.Common,
  topAbility: {
    text: 'After 6 hours, select one player and they must show 3 mortal cards. You choose one to discard.',
  },
  bottomAbilityOverride: movementOverrideGenerator,
});

export const PHANTOM_TRAPS: RealCardType = defineCardType({
  name: 'Phantom traps',
  tag: CardTag.Timed,
  rarity: Rarity.Rare,
  topAbility: {
    text: 'After 6 hours, force a player to teleport to a tile neighboring one of their pylons.',
  },
  bottomAbilityOverride: movementOverrideGenerator,
});

export const RAIDS_FROM_HELL: RealCardType = defineCardType({
  name: 'Raids from hell',
  tag: CardTag.Timed,
  rarity: Rarity.Rare,
  topAbility: {
    text: 'After 6 hours, the player(s) with the most amount of resources discard half of their resources (rounded up). In case of a tie, all players in the tie do the same.',
  },
  bottomAbilityOverride: movementOverrideGenerator,
});

export const EXTENDED_DRAW: RealCardType = defineCardType({
  name: 'Extended draw',
  tag: CardTag.Timed,
  rarity: Rarity.Legendary,
  topAbility: {
    text: 'For the next 6 hours, each time a pylon or sentry is destroyed, you draw one card.',
  },
  bottomAbilityOverride: movementOverrideGenerator,
});

export const BALL_LIGHTNING: RealCardType = defineCardType({
  name: 'Ball lightning',
  tag: CardTag.Timed,
  rarity: Rarity.Legendary,
  topAbility: {
    text: 'After 12 hours, unleash ball lightning, which moves 2 tiles in a random direction every 6 hours. It destroys all adjacent wires and will destroy any pylon it lands on.',
  },
  bottomAbilityOverride: movementOverrideGenerator,
});

export const SHIFT_IN_PERSPECTIVE: RealCardType = defineCardType({
  name: 'Shift in perspective',
  tag: CardTag.Timed,
  rarity: Rarity.Legendary,
  topAbility: {
    text: 'Specify a direction and expend 🧤, and after 3 hours, all neighboring pylons that you own will move one step in that direction, if possible.',
  },
  bottomAbilityOverride: movementOverrideGenerator,
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
  CHARGE,
  MAGICAL_CONDUITS,
  SPRINT,
  SABOTEUR,
  PHANTOM_TRAPS,
  RAIDS_FROM_HELL,
  EXTENDED_DRAW,
  BALL_LIGHTNING,
  SHIFT_IN_PERSPECTIVE,
];
