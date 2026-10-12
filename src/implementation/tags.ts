/**
 * Fixed tag definitions. Tags are pure data used for display, sorting,
 * selection and copying - no game logic is attached to them.
 */

export enum CardTag {
  Immortal = 'Immortal',
  Instant = 'Instant',
  Timed = 'Timed',
  Hammer = 'Hammer',
}

export enum AbilityTag {
  Unique = 'Unique',
  Limited = 'Limited',
  Movement = 'Movement',
}

/** Sort order for deck outputs: Immortal -> Instant -> Timed -> Hammer. */
export const CARD_TAG_SORT_ORDER: readonly CardTag[] = [
  CardTag.Immortal,
  CardTag.Instant,
  CardTag.Timed,
  CardTag.Hammer,
];

/** Rank of a card tag in the sort order; unknown tags sort last. */
export function cardTagRank(tag: string): number {
  const index = CARD_TAG_SORT_ORDER.indexOf(tag as CardTag);
  return index === -1 ? CARD_TAG_SORT_ORDER.length : index;
}
