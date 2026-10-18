/**
 * Fixed spirit definitions. A spirit is a special card with a name, a
 * classification and 1 to 3 named abilities. Spirits are pure data used for
 * display and random selection - no game logic is attached.
 *
 * Ability texts are transcribed from the game design VERBATIM - including
 * spacing and punctuation quirks - and must not be reworded.
 */

/** The classification (type) of a spirit. */
export enum SpiritClassification {
  Cookie = 'Cookie',
  Toasted = 'Toasted',
  Secret = 'Secret',
  Heavenly = 'Heavenly',
}

/** Sort order for the spirits view. */
export const SPIRIT_CLASSIFICATION_SORT_ORDER: readonly SpiritClassification[] = [
  SpiritClassification.Cookie,
  SpiritClassification.Toasted,
  SpiritClassification.Secret,
  SpiritClassification.Heavenly,
];

/** One named ability of a spirit. */
export interface SpiritAbility {
  readonly name: string;
  readonly text: string;
}

/** A spirit: name, classification and 1 to 3 named abilities. */
export interface Spirit {
  readonly name: string;
  readonly classification: SpiritClassification;
  readonly abilities: readonly SpiritAbility[];
}

/**
 * Validates and registers a spirit. Throws when the ability count is not
 * between 1 and 3. (Ability names may repeat, e.g. "Rice, Rice".)
 */
export function defineSpirit(spirit: Spirit): Spirit {
  if (spirit.abilities.length < 1 || spirit.abilities.length > 3) {
    throw new Error(`Spirit "${spirit.name}" must have 1 to 3 abilities.`);
  }
  return spirit;
}

/**
 * Splits a spirit's full name into its display name and its title: the text
 * after the first comma (e.g. "Loo Kase, Prophet" -> name "Loo Kase",
 * title "Prophet"). The title is absent when the name has no comma.
 */
export function splitSpiritName(fullName: string): { name: string; title?: string } {
  const commaIndex = fullName.indexOf(',');
  if (commaIndex === -1) {
    return { name: fullName };
  }
  return {
    name: fullName.slice(0, commaIndex).trim(),
    title: fullName.slice(commaIndex + 1).trim() || undefined,
  };
}

// --- Cookie ---------------------------------------------------------------------

export const SAM_R_EMPATHIC: Spirit = defineSpirit({
  name: 'Sam R., Warrior',
  classification: SpiritClassification.Cookie,
  abilities: [
    {
      name: 'Fluid blade',
      text: 'Your movement is not blocked by other peoples’ pylons’ fields. While inside a foreign field, you cannot use any non-movement card abilities on mortal cards.',
    },
    {
      name: 'Focus',
      text: 'All Rare and Legendary cards can be used as a Neurogenesis or Cosmogenesis.',
    },
    {
      name: 'Indirection',
      text: '-2 base max hand size.',
    },
  ],
});

export const IGNOR_ENTHUSIASTIC_EXPLORER: Spirit = defineSpirit({
  name: 'Ignor B., Enthusiastic explorer',
  classification: SpiritClassification.Cookie,
  abilities: [
    {
      name: 'Fragile',
      text: 'Your 🧤 is capped to your 🌾 amount.',
    },
    {
      name: 'In bliss',
      text: 'For up to three times per refresh, you can convert 🌾 into ⚰️, 🪙, or one drawn card.',
    },
  ],
});

export const LAGGING_E_WORLD_CREATOR: Spirit = defineSpirit({
  name: 'Lagging E., World creator',
  classification: SpiritClassification.Cookie,
  abilities: [
    {
      name: 'Curse of lag',
      text: 'For up to once per refresh, whenever you use the bottom ability of a mortal card, you can trigger it again after 6 hours.',
    },
    {
      name: 'Gift of creation',
      text: 'You can use any card (rarer than Common) with no movement abilities as a “Cosmogenesis” or “Neurogenesis” for another player.',
    },
  ],
});

export const AH_SIREN: Spirit = defineSpirit({
  name: 'Ah, Siren',
  classification: SpiritClassification.Cookie,
  abilities: [
    {
      name: 'Walk and talk',
      text: 'For up to once per game, generate and use timed card “Call of the siren”. Effect: after 24 hours, you force a player with less 🧤than you to comply with a single legal request lasting until the next refresh, then set your🧤amount to 0.',
    },
    {
      name: 'Infinite energy',
      text: 'You gain 🧤 for each ⚰️ destroyed (not traded).',
    }
  ],
});

export const RICE_RICE: Spirit = defineSpirit({
  name: 'Rice, Rice',
  classification: SpiritClassification.Cookie,
  abilities: [
    {
      name: 'Rice',
      text: 'All 🌾 resource tiles function as every color for your pylons.',
    },
    {
      name: 'Rice',
      text: 'If you have 5 or more 🌾, you gain 🌾 per refresh.',
    },
    {
      name: 'Rice',
      text: 'You can destroy one of your pylons and permanently increase the resource caps of all resources by 2.',
    },
  ],
});

export const LINAL_POT_BEAVER: Spirit = defineSpirit({
  name: 'Linal Pot, Beaver',
  classification: SpiritClassification.Cookie,
  abilities: [
    {
      name: 'Ultimate builder',
      text: 'You can substitute at most one resource in a build for any other resource. If you don\'t do this, draw a card.',
    }
  ],
});

export const RA_IMPOSTER: Spirit = defineSpirit({
  name: 'Ra, Imposter',
  classification: SpiritClassification.Heavenly,
  abilities: [
    {
      name: 'Usurper',
      text: 'You can use all uncommon timed cards as an Invade or Inception against a player once the timer ends, given that you have less or equal resources than your target for at least 2 resource types when the effect resolves.'
    },
    {
      name: 'Larpmaster',
      text: 'When you get a resource but it is negated due to the resource cap, you can expend one more of that resource to gain any other resource of your choice.',
    }
  ],
});

// --- Heavenly ---------------------------------------------------------------------

export const KASE_LU_PROPHET: Spirit = defineSpirit({
  name: 'Kase Lu, Prophet',
  classification: SpiritClassification.Heavenly,
  abilities: [
    {
      name: 'Golden throne',
      text: 'You gain +1 hand size for each Greater pylon you own.',
    },
    {
      name: 'Legendary legacy',
      text: 'Whenever you use a Rare card, you can draw up to 16 cards and keep the first card that is exactly legendary.',
    }
  ],
});

export const AXE_F_GREAT_CLIMBER: Spirit = defineSpirit({
  name: 'Axe F., Great Climber',
  classification: SpiritClassification.Heavenly,
  abilities: [
    {
      name: 'Dedication',
      text: '+2 base hand size.',
    },
    {
      name: 'One with the mountain',
      text: 'Up to once per refresh, you can discard ALL mortal cards in non-hammer slots (including active actions) and gain 50 heavenly chips (no prestige points).',
    },
  ],
});

export const C_CLICK_CLOUDBORNE_COMET: Spirit = defineSpirit({
  name: 'C. Click, Cloudborne comet',
  classification: SpiritClassification.Heavenly,
  abilities: [
    {
      name: 'Procrastination',
      text: 'Whenever you would gain 🧤, you have a 50% chance to gain ⚰️🪙 instead.',
    },
    {
      name: 'Maximum empire',
      text: 'Pylons cap +5.',
    },
  ],
});

export const LINE_USAIN_ASSASSIN: Spirit = defineSpirit({
  name: 'Line Usain, Godslayer',
  classification: SpiritClassification.Heavenly,
  abilities: [
    {
      name: 'Multitasking',
      text: '+4 action slots and max hand size.',
    },
  ],
});

export const BIG_J_MILLIONAIRE: Spirit = defineSpirit({
  name: 'Big J., Millionaire',
  classification: SpiritClassification.Heavenly,
  abilities: [
    {
      name: 'Compounding interests',
      text: 'Whenever you would lose 🪙, gain 🪙 equal to the amount of 🪙 lost. If it is via trading or resource conversion, the 🪙 gain is doubled.',
    },
    {
      name: 'Public banks',
      text: 'Whenever your amount of 🪙 is equal to your 🪙 cap, you and another player of your choice lose all 🪙, then your 🪙 cap is decreased by 1 permanently, stackable.',
    },
    {
      name: 'Busy life',
      text: 'Base max hand size -2.',
    },
  ],
});

// --- Toasted ---------------------------------------------------------------------

export const P_PRISMA_TIMELORD: Spirit = defineSpirit({
  name: 'P. Prisma, Timelord',
  classification: SpiritClassification.Toasted,
  abilities: [
    {
      name: 'Ascend',
      text: 'Up to once per game, if you have at least 12 cards in normal slots, you can enter the mountain to gain prestige points equal to half your current amount of prestige points.',
    },
  ],
});

export const GLIFFY_D_HERMIT: Spirit = defineSpirit({
  name: 'Gliffy D., Hermit',
  classification: SpiritClassification.Toasted,
  abilities: [
    {
      name: 'Wealth in knowledge',
      text: 'Up to once per refresh, if any player have the exact same amount of stored wires as you do, after 12 hours you can remove all of your stored wires and use one of their cards on their behalf.',
    },
    {
      name: 'Natural energy',
      text: 'If you have less than 2 non-hammer mortal cards, you can use 🧤 to draw 1 card, or discard 1 card and gain 🧤.',
    },
    {
      name: 'Creative genius',
      text: 'You can convert 3 of the same resource into 1 of any resource.',
    },
  ],
});

export const SEVERUS_VOID_KEYMASTER: Spirit = defineSpirit({
  name: 'Severus Void, Keymaster',
  classification: SpiritClassification.Toasted,
  abilities: [
    {
      name: 'Reality crevices',
      text: 'Once per game, you can discard a card and extinct all future cards of its type. Extinct cards are marked. If someone uses an extinct card, you get all of their resources.',
    },
    {
      name: 'Keys to prestige',
      text: 'You do not have to enter the mountain to access mountain-related services.',
    },
  ],
});

export const PI_CLONE_PRINCIPLE_BOUNCER: Spirit = defineSpirit({
  name: 'Pi Clone, Principle Bouncer',
  classification: SpiritClassification.Toasted,
  abilities: [
    {
      name: 'Self-assessment',
      text: 'Whenever you use the bottom ability of a mortal card, you may also trigger its top ability at the cost of one unit of resource of your choice.'
    },
    {
      name: 'Examinations',
      text: 'Whenever you use a non-movement bottom ability, you can gain one resource of choice.',
    }
  ],
});

export const CURSEDIUM_MORPHMAN: Spirit = defineSpirit({
  name: 'Cursedium, Morphman',
  classification: SpiritClassification.Toasted,
  abilities: [
    {
      name: 'Amorphous',
      text: 'Randomly fetch 3 spirits. For up to once per refresh, you can expend ⚰️ to activate one spirit and deactivate all other spirits fetched. You take on the first ability of the active spirit. Cooldowns (e.g. “For up to once per game”) are shared between all spirits.',
    },
    {
      name: 'Split',
      text: 'Permanently lose 1 capacity of each resource, and fetch 1 more spirit.',
    },
  ],
});

export const TRIPLE_F_ORANGE_CAT: Spirit = defineSpirit({
  name: 'Triple F., Orange cat',
  classification: SpiritClassification.Toasted,
  abilities: [
    {
      name: 'Peak allure',
      text: 'You can privately mark a player with Mark of Love (hidden marker), lasting 4 refreshes. If you use Invade, Inception, Seed of myths, Dilated capsule, or Invert against that player, or have a trade with that player, or if you are on any disputed tiles with that player, remove Mark of Love and you go to sleep for 6 hours. Has a cooldown of 4 refreshes.',
    },
    {
      name: 'World of Compassion',
      text: 'If Peak allure is not on cooldown, you can discard a card in slot 7 and remove a player’s Mark of Love, and that player must comply with any legal request until the next refresh.',
    },
  ],
});

export const A_JUNE_FAIRY: Spirit = defineSpirit({
  name: 'A. June, Water fairy',
  classification: SpiritClassification.Toasted,
  abilities: [
    {
      name: 'Codes of life',
      text: 'You can use any legendary card as a Fortify. In addition, sentries take 3 movements instead of 2 movements to be destroyed. A Greater sentry is also considered a Greater pylon with all of its effects.',
    },
    {
      name: 'Florish of summer',
      text: 'Your base pylon build cap is set to 1, but all of your sentries are considered as pylons by other cards, without being considered for the build cap. You cannot build a sentry in 3x3 to another sentry of yours.',
    },
    {
      name: 'Blasphemic theology',
      text: '"Proof of divinity" cards do not work on normal sentries, while "Declaration of heresy" cards do not work on Greater sentries.',
    },
  ],
});

export const AXES_OF_AXES_GEOMETRIST: Spirit = defineSpirit({
  name: 'Axes of Axes, Geometrist',
  classification: SpiritClassification.Toasted,
  abilities: [
    {
      name: 'Hyper parallax',
      text: 'Whenever you place a wire, you can put down an additional wire connected to the placed wire at no cost, ignoring build range.',
    },
    {
      name: 'Tachyonic spirit',
      text: 'You can use a "Dismantle" as any uncommon instant card.',
    },
    {
      name: 'Mechanic\'s wrench',
      text: 'build range +1.',
    }
  ],
});

export const FLOURIDE_B_MONKSHOOD: Spirit = defineSpirit({
  name: 'Flouride B., Monkshood',
  classification: SpiritClassification.Toasted,
  abilities: [
    {
      name: 'Totipotent',
      text: '+1 action slot.',
    },
    {
      name: 'Endure',
      text: 'Whenever an active timed card whose name ends with "culture" expires, draw 2 cards.',
    },
    {
      name: 'Toxic focus',
      text: 'You cannot use cards whose name ends with "harvest".',
    },
  ],
});

export const Q_FIN_THE_ENFORCER: Spirit = defineSpirit({
  name: 'Q. Fin, The Enforcer',
  classification: SpiritClassification.Secret,
  abilities: [
    {
      name: 'Lawful strikes',
      text: 'Base pylon build cap is set to 1. For up to once per refresh, you can expend units of 🌾 equal to half of your build cap (rounded up) to increase the cap by 1 permanently.',
    },
    {
      name: 'Agent of order',
      text: 'You can expend ⚰️⚰️🧤🧤 to place a pylon in 3x3 of yourself. (Ignores 3x3 build limit)',
    },
  ],
});

// --- Secret ---------------------------------------------------------------------

export const I_LOVER_WARLORD: Spirit = defineSpirit({
  name: 'I. Lover, Warlord',
  classification: SpiritClassification.Secret,
  abilities: [
    {
      name: 'God king',
      text: 'You can make a public prediction on who gains non-wire resource(s) first after the prediction (excludes via player-player trading). If this prediction is correct, you get the resources instead. If this prediction is incorrect, you go to sleep for 2 hours.',
    },
    {
      name: 'Ideology',
      text: 'For up to once per refresh, whenever you enter the mountain, any player with less or equal stored wires than you must discard a card of their choice.',
    },
    {
      name: 'Flight of mind',
      text: 'If a movement ability of a card allows you to move orthogonally, you can also move diagonally.',
    }
  ],
});

export const LITHIUM_MESSI_THE_LOST: Spirit = defineSpirit({
  name: 'Lithium Messi, The Lost',
  classification: SpiritClassification.Secret,
  abilities: [
    {
      name: 'Fogs of memory',
      text: 'Base max hand size -8, but Greater pylons do not reduce your max hand size.',
    },
    {
      name: 'Artifact of remembrance',
      text: 'Whenever you build a pylon, sentry, or upgraded pylon, draw 5 cards and gain ⚰️.',
    },
  ],
});

export const BOB_MCBOBBER_LEGENDARY_GOMLORD: Spirit = defineSpirit({
  name: 'Bob McBobber, Legendary Gomlord',
  classification: SpiritClassification.Secret,
  abilities: [
    {
      name: 'Ultrarecognition',
      text: 'Up to once per refresh, you can make a player with less cards than you give you a mortal card whose name has less non-whitespace characters than a number you name, if possible.',
    },
    {
      name: 'Call of gom',
      text: 'Up to once per game, you can use any legendary card as a Zedong’s emblem.',
    },
    {
      name: 'Instant punishment',
      text: 'When you construct a sentry or pylon, you have a 50% chance to get ⚰️.',
    },
  ],
});

export const SECRET_BROTHER_SOUTHWEST_DRAGONFLIGHT: Spirit = defineSpirit({
  name: 'Secret Brother, Southwest Dragonflight',
  classification: SpiritClassification.Secret,
  abilities: [
    {
      name: 'Golden shadows',
      text: 'Up to once per refresh, you can expend 🪙 and gain a mortal, common card of your choice.',
    },
  ],
});

export const SIGMA_TUSINE_COMBINED_MIND: Spirit = defineSpirit({
  name: 'Sigma Tusine, Combined mind',
  classification: SpiritClassification.Secret,
  abilities: [
    {
      name: 'Master alchemist',
      text: 'You can convert 🪙🪙🪙 into a random legendary card. Each time this ability is used, it costs an additional 🪙🪙, stackable.',
    },
    {
      name: 'Vesicle swarm',
      text: 'You can convert ⚰️⚰️ into a random rare card. Each time this ability is used, it costs an additional ⚰️, stackable.',
    },
  ],
});

export const SV_JAMES_IMMORTAL_TORTOISE: Spirit = defineSpirit({
  name: 'S. Voltage., Immortal tortoise',
  classification: SpiritClassification.Secret,
  abilities: [
    {
      name: 'Immortal',
      text: 'For up to once per game, you can upgrade one mortal card (with rarity less than legendary) to become immortal, and gain ⚰️. The top and bottom ability of such a card each cannot be used more than once per refresh.',
    },
  ],
});

export const ORION_W_MOONKEEPER: Spirit = defineSpirit({
  name: 'Orion W., Moonkeeper',
  classification: SpiritClassification.Secret,
  abilities: [
    {
      name: 'Tidal wars',
      text: 'For up to once per refresh, you can discard one card and destroy one of your sentries in 3x3 near you, recovering 🪙.',
    },
    {
      name: 'Purifying forces',
      text: 'For up to once per refresh, you can use any uncommon instant card as a "Cleanse", or any rare timed card as a "Charge".',
    }
  ],
});

export const BB_SINGULARITY_MISSIONARY: Spirit = defineSpirit({
  name: 'BB. Singularity, Missionary of exponentiality',
  classification: SpiritClassification.Secret,
  abilities: [
    {
      name: 'All as one',
      text: 'For up to once per refresh, you can discard one card and draw cards until you obtain a card with a rarity equal to or greater than the discarded card, then add that card to your inventory.',
    },
    {
      name: 'Quantum supersymmetry',
      text: 'For up to once per game, whenever you use a card that has random component(s), you can force the random components to be any result with probability greater than 0.',
    }
  ],
});

export const Y_DRAGON_AGED_COLLECTOR: Spirit = defineSpirit({
  name: 'Y. Etus, Aged dragon',
  classification: SpiritClassification.Secret,
  abilities: [
    {
      name: 'Breath of chronos',
      text: 'For up to twice per refresh, select a card in your inventory, and expend one resource of choice to upgrade its rarity to the next tier, up to Mythical. Card stays the same.',
    },
    {
      name: 'Immense potential',
      text: 'On refresh, you draw one additional card per Mythical card in your inventory.',
    }
  ],
});

// add more or change more spirit to be able to upgrsde ccard rarities for getting specific cards

/**
 * All spirits, fixed after initialization. Ordered by classification
 * (Cookie -> Heavenly -> Toasted -> Secret), matching
 * {@link SPIRIT_CLASSIFICATION_SORT_ORDER}.
 */
export const SPIRITS: readonly Spirit[] = [
  SAM_R_EMPATHIC,
  IGNOR_ENTHUSIASTIC_EXPLORER,
  RA_IMPOSTER,
  LAGGING_E_WORLD_CREATOR,
  KASE_LU_PROPHET,
  AXE_F_GREAT_CLIMBER,
  C_CLICK_CLOUDBORNE_COMET,
  LINE_USAIN_ASSASSIN,
  BIG_J_MILLIONAIRE,
  P_PRISMA_TIMELORD,
  GLIFFY_D_HERMIT,
  SEVERUS_VOID_KEYMASTER,
  PI_CLONE_PRINCIPLE_BOUNCER,
  CURSEDIUM_MORPHMAN,
  TRIPLE_F_ORANGE_CAT,
  A_JUNE_FAIRY,
  AXES_OF_AXES_GEOMETRIST,
  FLOURIDE_B_MONKSHOOD,
  Q_FIN_THE_ENFORCER,
  I_LOVER_WARLORD,
  LITHIUM_MESSI_THE_LOST,
  RICE_RICE,
  LINAL_POT_BEAVER,
  BOB_MCBOBBER_LEGENDARY_GOMLORD,
  AH_SIREN,
  SECRET_BROTHER_SOUTHWEST_DRAGONFLIGHT,
  SIGMA_TUSINE_COMBINED_MIND,
  SV_JAMES_IMMORTAL_TORTOISE,
  ORION_W_MOONKEEPER,
  BB_SINGULARITY_MISSIONARY,
  Y_DRAGON_AGED_COLLECTOR
].sort((a, b) => SPIRIT_CLASSIFICATION_SORT_ORDER.indexOf(a.classification) - SPIRIT_CLASSIFICATION_SORT_ORDER.indexOf(b.classification));

/**
 * Randomly selects `count` pairwise distinct spirits. The count is clamped
 * to the number of available spirits, so a roll can never request more
 * spirits than exist.
 */
export function rollSpirits(count: number): readonly Spirit[] {
  const pool = [...SPIRITS];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(Math.max(count, 0), pool.length));
}
