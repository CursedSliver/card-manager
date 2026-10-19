/**
 * Concrete ability overrides. Each override pairs a generator that rolls a
 * concrete ability with a unique description used when the override is shown
 * without being rolled (e.g. in the Catalogue).
 */
import type { AbilityOverride } from '../core/card';
import { Generator } from '../core/generator';
import { AbilityTag } from './tags';

export const movementOverride: AbilityOverride<AbilityTag> = {
  description: 'Move one tile orthogonally or diagonally.',
  generator: new Generator(
    [
      {
        weight: 1,
        reward: {
          text: `Move 1 tile in an 8-point compass direction of choice.`,
          tag: AbilityTag.Movement,
        },
      }
    ]
  ),
};

export const movementOverrideTwo: AbilityOverride<AbilityTag> = {
  description: 'Move two tiles orthogonally or diagonally.',
  generator: new Generator(
    [
      {
        weight: 1,
        reward: {
          text: `Move 2 tiles in an 8-point compass of choice, if moving 1 tile in that direction does not encounter an obstacle.`,
          tag: AbilityTag.Movement,
        },
      },
    ]
  ),
};