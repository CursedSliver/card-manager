/**
 * Weighted random generator.
 *
 * A Generator is constructed from a list of items, each carrying an arbitrary
 * nonnegative weight and a reward. Rolling picks an item at weighted random.
 * If the chosen reward is itself another Generator, rolling propagates into
 * that generator and continues until a non-generator reward is reached.
 */

/** A reward is either a final value or another Generator producing values. */
export type Rollable<R> = R | Generator<R>;

/** A single weighted entry of a Generator. */
export interface GeneratorItem<R> {
  readonly weight: number;
  readonly reward: Rollable<R>;
}

export class Generator<R> {
  private readonly items: readonly GeneratorItem<R>[];
  private readonly totalWeight: number;

  constructor(items: readonly GeneratorItem<R>[]) {
    if (items.length === 0) {
      throw new Error('Generator requires at least one item.');
    }
    let total = 0;
    for (const item of items) {
      if (!Number.isFinite(item.weight) || item.weight < 0) {
        throw new Error('Generator item weights must be nonnegative finite numbers.');
      }
      total += item.weight;
    }
    if (total <= 0) {
      throw new Error('Generator total weight must be positive.');
    }
    this.items = items;
    this.totalWeight = total;
  }

  /**
   * Rolls the generator and returns the final non-generator reward.
   * If a rolled reward is another Generator, it is rolled recursively.
   */
  roll(): R {
    let reward: Rollable<R> = this.pickReward();
    while (reward instanceof Generator) {
      reward = reward.pickReward();
    }
    return reward;
  }

  /** Picks a random item by weight and returns its (possibly nested) reward. */
  private pickReward(): Rollable<R> {
    let threshold = Math.random() * this.totalWeight;
    for (const item of this.items) {
      threshold -= item.weight;
      if (threshold < 0) {
        return item.reward;
      }
    }
    return this.items[this.items.length - 1].reward;
  }
}
