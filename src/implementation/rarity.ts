/**
 * Fixed rarity definitions. Rarities are pure data used for display and
 * deck weighting - no game logic is attached to them.
 */

export enum Rarity {
  Plentiful = 'Plentiful',
  Common = 'Common',
  Uncommon = 'Uncommon',
  Rare = 'Rare',
  Legendary = 'Legendary',
  Mythical = 'Mythical',
  Heavenly = 'Heavenly',
}

/** Display color per rarity. */
export const RARITY_COLORS: Record<Rarity, string> = {
  [Rarity.Plentiful]: '#ffffff',
  [Rarity.Common]: '#9aa2b1',
  [Rarity.Uncommon]: '#57c980',
  [Rarity.Rare]: '#a06bff',
  [Rarity.Legendary]: '#f7a928',
  [Rarity.Mythical]: '#ff5d5d',
  [Rarity.Heavenly]: '#4fd8e8',
};

export const RARITY_DRAW_WEIGHT_MULTIPLIER: Record<Rarity, number> = {
  [Rarity.Plentiful]: 2,
  [Rarity.Common]: 1,
  [Rarity.Uncommon]: 0.4,
  [Rarity.Rare]: 0.25,
  [Rarity.Legendary]: 0.12,
  [Rarity.Mythical]: 0.03,
  [Rarity.Heavenly]: 0,
};

/** Display color of a rarity name; unknown rarities have no color. */
export function rarityColor(rarity: string): string | undefined {
  return RARITY_COLORS[rarity as Rarity];
}

/** Sort order from rarest to least rare. */
export const RARITY_SORT_ORDER: readonly Rarity[] = [
  Rarity.Heavenly,
  Rarity.Mythical,
  Rarity.Legendary,
  Rarity.Rare,
  Rarity.Uncommon,
  Rarity.Common,
  Rarity.Plentiful,
];

/** Rank of a rarity in the rarity sort order (rarest = 0); unknown sorts last. */
export function rarityRank(rarity: string): number {
  const index = RARITY_SORT_ORDER.indexOf(rarity as Rarity);
  return index === -1 ? RARITY_SORT_ORDER.length : index;
}
