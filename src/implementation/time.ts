/**
 * Global time scaling for time-based card effects.
 *
 * `TIME_MULTIPLIER` is read once, at page initialization, from the
 * `timeMultiplier` URL query parameter, falling back to the value saved in
 * localStorage, and finally to 1. The URL parameter wins on conflict. Ability
 * texts that mention a duration in hours embed the scaled value at definition
 * time, so changing the multiplier requires a page reload.
 */

/** URL query parameter that sets {@link TIME_MULTIPLIER}. */
export const TIME_MULTIPLIER_PARAM = 'timeMultiplier';
const TIME_MULTIPLIER_STORAGE_KEY = 'timeMultiplier';
const DEFAULT_TIME_MULTIPLIER = 1;
const MAX_DECIMALS = 2;

/** Parses a raw multiplier string, returning `undefined` when absent or invalid. */
function parseMultiplier(raw: string | null): number | undefined {
  if (raw === null) {
    return undefined;
  }
  const parsed = Number.parseFloat(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return undefined;
  }
  return parsed;
}

function readStoredMultiplier(): number | undefined {
  try {
    return parseMultiplier(window.localStorage.getItem(TIME_MULTIPLIER_STORAGE_KEY));
  } catch {
    return undefined;
  }
}

/** Persists a multiplier so it is reused on later visits without a URL parameter. */
export function saveTimeMultiplier(multiplier: number): void {
  try {
    window.localStorage.setItem(TIME_MULTIPLIER_STORAGE_KEY, String(multiplier));
  } catch {
    // Ignore storage failures (e.g. disabled or unavailable localStorage).
  }
}

function readTimeMultiplier(): number {
  if (typeof window === 'undefined') {
    return DEFAULT_TIME_MULTIPLIER;
  }
  const fromUrl = parseMultiplier(
    new URLSearchParams(window.location.search).get(TIME_MULTIPLIER_PARAM),
  );
  if (fromUrl !== undefined) {
    return fromUrl;
  }
  return readStoredMultiplier() ?? DEFAULT_TIME_MULTIPLIER;
}

/** Multiplier applied to every duration mentioned in a card ability. */
export const TIME_MULTIPLIER: number = readTimeMultiplier();

/** Multiplies a duration in hours and rounds it to a printable value. */
function scaleHours(hours: number): number {
  return Number((hours * TIME_MULTIPLIER).toFixed(MAX_DECIMALS));
}

/** A scaled duration as a bare number, e.g. `10` at ×0.5 becomes `"5"`. */
export function scaledHours(hours: number): string {
  return scaleHours(hours).toString();
}

/** A scaled duration with its pluralized unit, e.g. `"5 hours"` or `"1 hour"`. */
export function hoursLabel(hours: number): string {
  const scaled = scaleHours(hours);
  return `${scaled} ${scaled === 1 ? 'hour' : 'hours'}`;
}
