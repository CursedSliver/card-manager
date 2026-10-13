/**
 * Card model.
 *
 * Card types are static definitions; card instances are created from a type
 * by rolling any applicable ability overrides. Tags and rarities are plain
 * string-valued enums supplied by the implementation layer.
 */
import type { Generator } from './generator';

/** An ability is a text plus an optional ability tag. */
export interface Ability<TAbilityTag extends string = string> {
  readonly text: string;
  readonly tag?: TAbilityTag;
}

/**
 * An ability override: a generator that rolls a concrete ability in place of a
 * missing static ability, plus a unique description of what that override does.
 * The description is used when the override is displayed without being rolled
 * (e.g. in the Catalogue).
 */
export interface AbilityOverride<TAbilityTag extends string = string> {
  /** Unique, human-readable description of what this override rolls. */
  readonly description: string;
  /** Rolls a concrete ability to use in place of the absent ability. */
  readonly generator: Generator<Ability<TAbilityTag>>;
}

/** A card type: name, tag, rarity, optional abilities or ability overrides. */
export interface CardType<
  TCardTag extends string = string,
  TAbilityTag extends string = string,
  TRarity extends string = string,
> {
  readonly name: string;
  readonly tag: TCardTag;
  readonly rarity: TRarity;
  readonly topAbility?: Ability<TAbilityTag>;
  /** Only valid when `topAbility` is absent. */
  readonly topAbilityOverride?: AbilityOverride<TAbilityTag>;
  readonly bottomAbility?: Ability<TAbilityTag>;
  /** Only valid when `bottomAbility` is absent. */
  readonly bottomAbilityOverride?: AbilityOverride<TAbilityTag>;
}

/** A concrete card: its type plus any rolled override results. */
export interface CardInstance<
  TCardTag extends string = string,
  TAbilityTag extends string = string,
  TRarity extends string = string,
> {
  readonly type: CardType<TCardTag, TAbilityTag, TRarity>;
  /** Present only when the type has a top ability override. */
  readonly topAbilityResult?: Ability<TAbilityTag>;
  /** Present only when the type has a bottom ability override. */
  readonly bottomAbilityResult?: Ability<TAbilityTag>;
}

/**
 * Validates and registers a card type. Throws if an ability and its override
 * are both specified, since overrides are only allowed for absent abilities.
 */
export function defineCardType<
  TCardTag extends string,
  TAbilityTag extends string,
  TRarity extends string,
>(type: CardType<TCardTag, TAbilityTag, TRarity>): CardType<TCardTag, TAbilityTag, TRarity> {
  if (type.topAbility && type.topAbilityOverride) {
    throw new Error(`Card type "${type.name}" defines both a top ability and a top ability override.`);
  }
  if (type.bottomAbility && type.bottomAbilityOverride) {
    throw new Error(`Card type "${type.name}" defines both a bottom ability and a bottom ability override.`);
  }
  return type;
}

/** Creates a card instance from a type, rolling any applicable overrides. */
export function createCardInstance<
  TCardTag extends string,
  TAbilityTag extends string,
  TRarity extends string,
>(type: CardType<TCardTag, TAbilityTag, TRarity>): CardInstance<TCardTag, TAbilityTag, TRarity> {
  return {
    type,
    topAbilityResult: type.topAbilityOverride?.generator.roll(),
    bottomAbilityResult: type.bottomAbilityOverride?.generator.roll(),
  };
}

/** Resolves the effective top ability (static definition or rolled override). */
export function resolveTopAbility<
  TCardTag extends string,
  TAbilityTag extends string,
  TRarity extends string,
>(instance: CardInstance<TCardTag, TAbilityTag, TRarity>): Ability<TAbilityTag> | undefined {
  return instance.type.topAbility ?? instance.topAbilityResult;
}

/** Resolves the effective bottom ability (static definition or rolled override). */
export function resolveBottomAbility<
  TCardTag extends string,
  TAbilityTag extends string,
  TRarity extends string,
>(instance: CardInstance<TCardTag, TAbilityTag, TRarity>): Ability<TAbilityTag> | undefined {
  return instance.type.bottomAbility ?? instance.bottomAbilityResult;
}
