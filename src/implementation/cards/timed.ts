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
    text: `After ${hoursLabel(3)}, convert 3 of the same resource into a resource of choice.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const SUSPEND: RealCardType = defineCardType({
  name: 'Suspend',
  tag: CardTag.Timed,
  rarity: Rarity.Uncommon,
  topAbility: {
    text: 'Put down a Charge station in 3x3 of yourself and add this card to your action slots for 24, 48, or 72 hours. On expiry, the Charge station is destroyed.',
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
    text: `After ${hoursLabel(6)}, gain one resource of choice.`,
  },
  bottomAbilityOverride: movementOverride
});

export const DISMANTLE: RealCardType = defineCardType({
  name: 'Dismantle',
  tag: CardTag.Timed,
  rarity: Rarity.Uncommon,
  topAbility: {
    text: `After ${hoursLabel(3)}, destroy a wire that is within wire placing range of yourself and gain 🪙.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const STRANGLE: RealCardType = defineCardType({
  name: 'Strangle',
  tag: CardTag.Timed,
  rarity: Rarity.Rare,
  topAbility: {
    text: `After ${hoursLabel(4)}, clear one action slot of a player, which can be yourself.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const CHARGE: RealCardType = defineCardType({
  name: 'Charge',
  tag: CardTag.Timed,
  rarity: Rarity.Rare,
  topAbility: {
    text: `After ${hoursLabel(6)}, move 5 steps in any cardinal direction, skipping over all obstacles in the way.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const MINDWORM: RealCardType = defineCardType({
  name: 'Mindworm',
  tag: CardTag.Timed,
  rarity: Rarity.Uncommon,
  topAbility: {
    text: `After ${hoursLabel(6)}, player of your choice select one resource type that they have more of than you do, and discard 3 of that resource.`,
  },
  bottomAbility: {
    text: `After ${hoursLabel(6)}, player of your choice lose one mortal card of their choice.`,
  },
});

export const SHIFT_IN_PERSPECTIVE: RealCardType = defineCardType({
  name: 'Shift in perspective',
  tag: CardTag.Timed,
  rarity: Rarity.Legendary,
  topAbility: {
    text: `Specify a direction and expend 🧤🧤🧤, and after ${hoursLabel(24)}, all neighboring pylons will move one step in that direction, if possible.`,
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
    text: `Select one card that is less or as rare as this card in your inventory, excluding this card, and draw cards until you get a card with a higher rarity than the selected card. Discard the selected card and add the new card to inventory.`
  },
});

export const DEMATERIALIZE: RealCardType = defineCardType({
  name: 'Dematerialize',
  tag: CardTag.Timed,
  rarity: Rarity.Legendary,
  topAbility: {
    text: `Select any tile on the map, and after ${hoursLabel(12)}, you teleport to it. The tile can be foreign or disputed.`,
  },
  bottomAbilityOverride: movementOverride
});

export const BALL_LIGHTNING: RealCardType = defineCardType({
  name: 'Ball lightning',
  tag: CardTag.Timed,
  rarity: Rarity.Mythical,
  topAbility: {
    text: `After ${hoursLabel(24)}, unleash ball lightning. On refresh, the player with the most amount of cards can move the ball lightning, randomly deciding in a tie. It can move 2 tiles in an orthogonal or diagonal direction. It destroys all adjacent wires and will destroy any pylon it lands on.`,
  },
  bottomAbilityOverride: movementOverride,
});

export const TIMED_CARDS: readonly RealCardType[] = [
  RED_CULTURE,
  YELLOW_CULTURE,
  GREEN_CULTURE,
  BLUE_CULTURE,
  RAINBOW_CULTURE,
  //SUSPEND,
  DISTANT_EXCHANGE,
  NEUROGENESIS,
  COSMOGENESIS,
  DISMANTLE,
  MINDWORM,
  STRANGLE,
  CHARGE,
  SHIFT_IN_PERSPECTIVE,
  INVERT,
  DEMATERIALIZE,
  BALL_LIGHTNING
];
