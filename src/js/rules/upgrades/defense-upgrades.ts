import { computedStat } from '../../characters/computed-stat';
import { purchaseSimpleUpgrade } from '../../characters/update-character';
import { Character, StatToUpdate, Upgrade } from '../../types/types';
import { damageTypes } from '../damage-types';
import { statusEffects } from '../status-effects';
import {
  isImmune, isLessThanHalfOfStat, isResistant, isUpgradeAvailable, isVulnerable,
} from './prereqs';

export const shieldUpgrades = (): Upgrade[] => {
  const upgrades = [
    {
      name: 'Energy Shield',
      description: "Wear an energy shield that will take damage before you lose HP. Shields have Shield Hit Points (SHP) equal to half of your Technobabble die's highest value. If the shield does not take damage during a round of combat, it regenerates one SHP at the end of your turn, unless it is at 0 SHP.",
      cost: 1,
      canPurchase: (character: Character) => isUpgradeAvailable(character, 'Energy Shield'),
      onPurchase: (character: Character, upgrade: Upgrade) => {
        const { die } = character.stats.find(({ name }) => name === 'Technobabble') ?? { die: 'd4' };

        const statsToUpdate: StatToUpdate[] = [
          {
            statName: 'shieldHitPoints',
            newValue: computedStat(die, 0),
          },
          {
            statName: 'baseShieldHitPointMax',
            newValue: computedStat(die, 0),
          },
          {
            statName: 'shieldHitPointRegen',
            newValue: 1,
          },
        ];

        return purchaseSimpleUpgrade(
          character._id,
          character.experiencePoints,
          upgrade.name,
          upgrade.description,
          upgrade.cost,
          statsToUpdate,
        );
      },
    },
    {
      name: 'Max Shield Increase',
      description: "Increase your Shield Hit Points (SHP) by half of your Technobabble die's highest value. This acts as a multiplier of base SHP, so if your Technobabble die changes, your SHP will change accordingly.",
      cost: 1,
      canPurchase: () => true,
      onPurchase: (character: Character, upgrade: Upgrade) => {
        const { die } = character.stats.find(({ name }) => name === 'Technobabble') ?? { die: 'd4' };

        const statsToUpdate: StatToUpdate[] = [
          {
            statName: 'shieldHitPointMultiplier',
            newValue: character.shieldHitPointMultiplier + 1,
          },
          {
            statName: 'shieldHitPoints',
            newValue: character.shieldHitPoints + computedStat(die, 0),
          },
        ];

        return purchaseSimpleUpgrade(
          character._id,
          character.experiencePoints,
          upgrade.name,
          upgrade.description,
          upgrade.cost,
          statsToUpdate,
        );
      },
    },
    {
      name: 'Improved Shield Regen',
      description: "Increase the amount of SHP your shield regenerates by 1. The maximum value is half of your Technobabble die's highest value.",
      cost: 1,
      canPurchase: (character: Character) => (
        !isUpgradeAvailable(character, 'Energy Shield')
        && isLessThanHalfOfStat(character, 'Technobabble', 'shieldHitPointRegen')
      ),
      onPurchase: (character: Character, upgrade: Upgrade) => {
        const statsToUpdate: StatToUpdate[] = [
          {
            statName: 'shieldHitPointRegen',
            newValue: character.shieldHitPointRegen + 1,
          },
        ];

        return purchaseSimpleUpgrade(
          character._id,
          character.experiencePoints,
          upgrade.name,
          upgrade.description,
          upgrade.cost,
          statsToUpdate,
        );
      },
    },
    {
      name: 'Damage Threshold Increase',
      description: 'Increase your Damage Threshold (DT) by 1.',
      cost: 1,
      canPurchase: () => true,
      onPurchase: (character: Character, upgrade: Upgrade) => {
        const statsToUpdate: StatToUpdate[] = [
          {
            statName: 'damageThresholdBonus',
            newValue: character.damageThresholdBonus + 1,
          },
        ];

        return purchaseSimpleUpgrade(
          character._id,
          character.experiencePoints,
          upgrade.name,
          upgrade.description,
          upgrade.cost,
          statsToUpdate,
        );
      },
    },
  ];

  return upgrades;
};

export const removeVulnerabilityUpgrades = (): Upgrade[] => {
  const upgrades: Upgrade[] = [];

  statusEffects.forEach(({ name }) => {
    upgrades.push({
      name: `Remove ${name} Status Vulnerability`,
      description: `You are no longer vulnerable to the ${name} status effect. You do not need to roll with disadvantage on saving throws to avoid or remove the effect.`,
      cost: 1,
      canPurchase: (character: Character) => isVulnerable(character, name),
    });
  });

  damageTypes.forEach(({ name }) => {
    upgrades.push({
      name: `Remove ${name} Damage Vulnerability`,
      description: `You are no longer vulnerable to ${name} damage. You no longer take double damage from it.`,
      cost: 1,
      canPurchase: (character: Character) => isVulnerable(character, name),
    });
  });

  return upgrades;
};

export const resistanceUpgrades = (): Upgrade[] => {
  const upgrades: Upgrade[] = [];

  statusEffects.forEach(({ name }) => {
    upgrades.push({
      name: `${name} Status Resistance`,
      description: `Gain resistance to the ${name} status effect. You will now roll with advantage on saving throws to avoid or remove the effect.`,
      cost: 3,
      canPurchase: (character: Character) => (
        !isVulnerable(character, name)
        && !isResistant(character, name)
        && !isImmune(character, name)
      ),
    });
  });

  damageTypes.forEach(({ name }) => {
    upgrades.push({
      name: `${name} Damage Resistance`,
      description: `Gain resistance to ${name} damage. You now take half damage from it.`,
      cost: 3,
      canPurchase: (character: Character) => (
        !isVulnerable(character, name)
        && !isResistant(character, name)
        && !isImmune(character, name)
      ),
    });
  });

  return upgrades;
};

export const immunityUpgrades = (): Upgrade[] => {
  const upgrades: Upgrade[] = [];

  statusEffects.forEach(({ name }) => {
    upgrades.push({
      name: `${name} Status Immunity`,
      description: `Gain immunity to the ${name} status effect. Any attempts to impose the effect on you will fail automatically.`,
      cost: 5,
      canPurchase: (character: Character) => (
        !isVulnerable(character, name)
        && isResistant(character, name)
        && !isImmune(character, name)
      ),
    });
  });

  damageTypes.forEach(({ name }) => {
    upgrades.push({
      name: `${name} Damage Immunity`,
      description: `Gain immunity to ${name} damage. You now take no damage from it.`,
      cost: 5,
      canPurchase: (character: Character) => (
        !isVulnerable(character, name)
        && isResistant(character, name)
        && !isImmune(character, name)
      ),
    });
  });

  return upgrades;
};
