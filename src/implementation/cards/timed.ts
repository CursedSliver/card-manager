/**
 * Timed cards. Single-bullet cards use the movement override for their
 * bottom ability.
 */
import { defineCardType } from '../../core/card';
import type { RealCardType } from './types';
import { CardTag } from '../tags';
import { Rarity } from '../rarity';
import { movementOverride } from '../generators';
import { hoursLabel } from '../time';

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
  rarity: Rarity.Uncommon,
  topAbility: {
    text: `After ${hoursLabel(10)}, each charged pylon in 3x3 of player generates resources for each resource within its field.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const DISTANT_EXCHANGE: RealCardType = defineCardType({
  name: 'Distant exchange',
  tag: CardTag.Timed,
  rarity: Rarity.Common,
  topAbility: {
    text: `After ${hoursLabel(6)}, convert 3 of the same resource into a resource of choice.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const NEUROGENESIS: RealCardType = defineCardType({
  name: 'Neurogenesis',
  tag: CardTag.Timed,
  rarity: Rarity.Uncommon,
  topAbility: {
    text: `After ${hoursLabel(12)}, draw two cards.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const COSMOGENESIS: RealCardType = defineCardType({
  name: 'Cosmogenesis',
  tag: CardTag.Timed,
  rarity: Rarity.Uncommon,
  topAbility: {
    text: `After ${hoursLabel(12)}, gain one resource of choice.`,
  },
  bottomAbilityOverride: movementOverride
});

export const DISMANTLE: RealCardType = defineCardType({
  name: 'Dismantle',
  tag: CardTag.Timed,
  rarity: Rarity.Uncommon,
  topAbility: {
    text: `After ${hoursLabel(3)}, destroy a wire within your build range and have a 50% chance to gain 🪙.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const STRANGLE: RealCardType = defineCardType({
  name: 'Strangle',
  tag: CardTag.Timed,
  rarity: Rarity.Rare,
  topAbility: {
    text: `After ${hoursLabel(4)}, clear one action slot of a player, including yourself.`,
  }
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

export const SPRINT: RealCardType = defineCardType({
  name: 'Sprint',
  tag: CardTag.Timed,
  rarity: Rarity.Uncommon,
  topAbility: {
    text: 'Destroy any building that you own.',
  },
  bottomAbility: {
    text: `After ${hoursLabel(1)}, expend 🌾 to move in any direction. Can repeat this up to twice.`,
  },
});

export const MINDWORM: RealCardType = defineCardType({
  name: 'Mindworm',
  tag: CardTag.Timed,
  rarity: Rarity.Uncommon,
  topAbility: {
    text: `After ${hoursLabel(4)}, player of your choice lose one mortal card of their choice.`,
  },
  bottomAbility: {
    text: `After ${hoursLabel(4)}, player of your choice lose two resources of their choice.`,
  },
});

export const PHANTOM_TRAPS: RealCardType = defineCardType({
  name: 'Phantom traps',
  tag: CardTag.Timed,
  rarity: Rarity.Rare,
  topAbility: {
    text: `Choose another player and forcibly add this card to their action slots. +1 action slot capacity while active. After ${hoursLabel(6)}, force that player to teleport to a pylon not in 5x5 near you.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const SHIFT_IN_PERSPECTIVE: RealCardType = defineCardType({
  name: 'Shift in perspective',
  tag: CardTag.Timed,
  rarity: Rarity.Legendary,
  topAbility: {
    text: `Specify a direction and expend 🧤🧤🧤, and after ${hoursLabel(12)}, all neighboring pylons will move one step in that direction, if possible.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const INVERT: RealCardType = defineCardType({
  name: 'Invert',
  tag: CardTag.Timed,
  rarity: Rarity.Legendary,
  topAbility: {
    text: `After ${hoursLabel(1)}, select any mortal card that belongs to a player. If it is a hammer, replace with "Hammer". If it is a normal card, replace it with a random "Transmute" card. If it is an ongoing action, replace it with "Distant exchange".`,
  },
  bottomAbility: {
    text: `Select one non-mythical card in your inventory excluding Invert, and draw cards until you get a card with a higher rarity than the selected card. Discard the selected card and add the new card to inventory.`
  },
});

export const DEMATERIALIZE: RealCardType = defineCardType({
  name: 'Dematerialize',
  tag: CardTag.Timed,
  rarity: Rarity.Legendary,
  topAbility: {
    text: `Select any neutral or disputed tile on the map, and after ${hoursLabel(6)}, you teleport to it.`,
  }
});

export const BALL_LIGHTNING: RealCardType = defineCardType({
  name: 'Ball lightning',
  tag: CardTag.Timed,
  rarity: Rarity.Mythical,
  topAbility: {
    text: `After ${hoursLabel(24)}, unleash ball lightning, which moves 2 tiles in a random direction every ${hoursLabel(6)}. It destroys all adjacent wires and will destroy any pylon it lands on.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const TIMED_CARDS: readonly RealCardType[] = [
  RED_CULTURE,
  YELLOW_CULTURE,
  GREEN_CULTURE,
  BLUE_CULTURE,
  RAINBOW_CULTURE,
  DISTANT_EXCHANGE,
  NEUROGENESIS,
  COSMOGENESIS,
  DISMANTLE,
  MINDWORM,
  STRANGLE,
  CHARGE,
  SPRINT,
  PHANTOM_TRAPS,
  SHIFT_IN_PERSPECTIVE,
  INVERT,
  DEMATERIALIZE,
  BALL_LIGHTNING
];
