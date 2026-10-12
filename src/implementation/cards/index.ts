/**
 * The fixed list of all real card types, grouped by card tag.
 */
import { IMMORTAL_CARDS } from './immortal';
import { HAMMER_CARDS } from './hammers';
import { INSTANT_CARDS } from './instant';
import { TIMED_CARDS } from './timed';
import type { RealCardType } from './types';

export type { RealCardType } from './types';
export * from './immortal';
export * from './hammers';
export * from './instant';
export * from './timed';

/** All card types, fixed after initialization. */
export const CARD_TYPES: readonly RealCardType[] = [
  ...IMMORTAL_CARDS,
  ...HAMMER_CARDS,
  ...INSTANT_CARDS,
  ...TIMED_CARDS,
];
