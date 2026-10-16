/**
 * Concrete ability overrides. Each override pairs a generator that rolls a
 * concrete ability with a unique description used when the override is shown
 * without being rolled (e.g. in the Catalogue).
 */
import type { AbilityOverride } from '../core/card';
import { Generator } from '../core/generator';
import { AbilityTag } from './tags';

/**
 * Movement override: eight equally weighted abilities, one per compass
 * direction, e.g. `Move ↖️ or ↖️↖️.`
 */
export const movementOverride: AbilityOverride<AbilityTag> = {
  description: 'Move one tile orthogonally or diagonally.',
  generator: new Generator(
    [
      {
        weight: 5,
        reward: {
          text: `Move 1 tile in an orthogonal direction of choice.`,
          tag: AbilityTag.Movement,
        },
      },
      {
        weight: 2,
        reward: {
          text: `Move 1 tile in a diagonal direction of choice.`,
          tag: AbilityTag.Movement,
        },
      },
    ]
  ),
};

export const movementOverrideTwo: AbilityOverride<AbilityTag> = {
  description: 'Move two tiles orthogonally or diagonally.',
  generator: new Generator(
    [
      {
        weight: 5,
        reward: {
          text: `Move 1 tile in an orthogonal direction of choice.`,
          tag: AbilityTag.Movement,
        },
      },
      {
        weight: 2,
        reward: {
          text: `Move 1 tile in a diagonal direction of choice.`,
          tag: AbilityTag.Movement,
        },
      },
    ]
  ),
};
