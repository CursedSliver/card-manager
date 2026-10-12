/**
 * Shared type for concrete card definitions in this implementation.
 */
import type { CardType } from '../../core/card';
import type { AbilityTag, CardTag } from '../tags';
import type { Rarity } from '../rarity';

export type RealCardType = CardType<CardTag, AbilityTag, Rarity>;
