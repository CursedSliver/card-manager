/**
 * Immortal cards. Not part of the Standard Deck.
 */
import { defineCardType } from '../../core/card';
import type { RealCardType } from './types';
import { CardTag } from '../tags';
import { Rarity } from '../rarity';
import { hoursLabel } from '../time';

export const INSTANT_CONSTRUCTION: RealCardType = defineCardType({
  name: 'Instant construction',
  tag: CardTag.Immortal,
  rarity: Rarity.Common,
  topAbility: {
    text: 'Can construct a pylon on neighboring neutral tiles using ⚰️⚰️🧤. Pylons are charged when you are in 3x3 near it. While charged, it provides a force field in 3x3 around it that prevents anyone other than yourself from entry. Moving into a pylon allows you to teleport to any tile neighboring another pylon that belongs to you.',
  },
  bottomAbility: {
    text: `Can construct a sentry on neighboring neutral or disputed tiles using 🌾🪙. Sentries produce a force field like pylons do but do not do anything else that a pylon does. Force field of sentries and pylons will conquer any uncharged pylons and sentries that do not belong to you after ${hoursLabel(12)}, which grants you ownership over them. Force fields create disputed tiles on tiles where fields of two different allegiances meet.`,
  },
});

export const SYNAPTIC_TRADE: RealCardType = defineCardType({
  name: 'Synaptic trade',
  tag: CardTag.Immortal,
  rarity: Rarity.Common,
  topAbility: {
    text: 'Can form trade agreements with other players to exchange agreed-upon quantities of resources (not cards).',
  },
  bottomAbility: {
    text: 'If the bottom effect of a card is movement, can apply that effect onto any willing players, or as a part of a trade agreement.',
  },
});

export const NEUROPLASTICITY: RealCardType = defineCardType({
  name: 'Neuroplasticity',
  tag: CardTag.Immortal,
  rarity: Rarity.Common,
  topAbility: {
    text: 'Can discard 4 of the same resources and get: any other resource of your choice; or, draw two cards and choose one to add to inventory.',
  },
  bottomAbility: {
    text: 'Can upgrade a pylon to a Greater pylon for 🌾🌾⚰️🧤🧤, increasing its range of effect to 5x5 at the exchange for -2 hand size. A Greater pylon cannot be within the field of another greater pylon that you own.',
  },
});

export const BRIGHTSTORM: RealCardType = defineCardType({
  name: 'Brightstorm',
  tag: CardTag.Immortal,
  rarity: Rarity.Common,
  topAbility: {
    text: 'Can construct 2 wires for 🪙. Wires propagate electricity and can be used to charge another pylon.',
  },
  bottomAbility: {
    text: `Can destroy all adjacent wires and have a 1 / 3 chance to recover 🪙 per wire destroyed. If this ability is used more than once per ${hoursLabel(6)}, you cannot use this ability again for the next ${hoursLabel(12)} and need to sleep for ${hoursLabel(2)}.`,
  },
});

export const HEAVENLY_SACRIFICE: RealCardType = defineCardType({
  name: 'Heavenly sacrifice',
  tag: CardTag.Immortal,
  rarity: Rarity.Heavenly,
  topAbility: {
    text: 'Expend ⚰️, 🪙, 🧤, or 🌾 to gain 20 prestige points and heavenly chips. Each activation doubles the resource use to trigger this ability next time for the resource used, stackable. Other resources are unaffected.',
  },
  bottomAbility: {
    text: 'Whenever you would gain a resource, you can spend 50 heavenly chips and instead gain another resource of your choice.',
  },
});

export const PILLARS_OF_WORSHIP: RealCardType = defineCardType({
  name: 'Pillars of worship',
  tag: CardTag.Immortal,
  rarity: Rarity.Heavenly,
  topAbility: {
    text: 'All Greater pylons grant 12 prestige points and heavenly chips per refresh.',
  },
  bottomAbility: {
    text: 'You can expend 100 heavenly chips to upgrade one Greater pylon to a Master Pylon, which grants +2 hand size instead of -2 hand size, and allows for drawing of 2 additional cards per refresh. Only one Master Pylon can exist at one time on the board. There must not be any pylons or sentries from you within the force field of the Master Pylon.',
  },
});

export const IMMORTAL_CARDS: readonly RealCardType[] = [
  INSTANT_CONSTRUCTION,
  SYNAPTIC_TRADE,
  NEUROPLASTICITY,
  BRIGHTSTORM,
  HEAVENLY_SACRIFICE,
  PILLARS_OF_WORSHIP,
];
