/**
 * Concrete ability overrides. Each override pairs a generator that rolls a
 * concrete ability with a unique description used when the override is shown
 * without being rolled (e.g. in the Catalogue).
 */
import type { Ability, AbilityOverride } from '../core/card';
import { Generator } from '../core/generator';
import { AbilityTag } from './tags';

/** The eight compass directions, as arrow emoji. */
const COMPASS_DIRECTIONS: readonly string[] = ['⬆️', '↗️', '➡️', '↘️', '⬇️', '↙️', '⬅️', '↖️'];

const MOVEMENT_ABILITY_WEIGHT = 1;
const HASTEN_ABILITY_WEIGHT = 1;

function createMovementAbility(direction: string): Ability<AbilityTag> {
  return {
    text: `Move ${direction} or ${direction}${direction}.`,
    tag: AbilityTag.Movement,
  };
}

/**
 * Movement override: eight equally weighted abilities, one per compass
 * direction, e.g. `Move ↖️ or ↖️↖️.`
 */
export const movementOverride: AbilityOverride<AbilityTag> = {
  description: 'Move one tile in a random direction, or two tiles in that direction.',
  generator: new Generator(
    COMPASS_DIRECTIONS.map((direction) => ({
      weight: MOVEMENT_ABILITY_WEIGHT,
      reward: createMovementAbility(direction),
    })),
  ),
};

/**
 * Hasten top override: picks two distinct compass directions A and B,
 * e.g. `Move ↖️, ↖️↖️, or ↘️.`
 */
export const hastenTopOverride: AbilityOverride<AbilityTag> = {
  description: 'Move one tile, two tiles, or one tile in another direction, all randomized.',
  generator: new Generator(
    COMPASS_DIRECTIONS.flatMap((directionA) =>
      COMPASS_DIRECTIONS.filter((directionB) => directionB !== directionA).map((directionB) => ({
        weight: HASTEN_ABILITY_WEIGHT,
        reward: {
          text: `Move ${directionA}, ${directionA}${directionA}, or ${directionB}.`,
          tag: AbilityTag.Movement,
        },
      })),
    ),
  ),
};
