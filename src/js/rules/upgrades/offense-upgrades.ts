import { Character, Upgrade } from '../../types/types';
import { damageTypes } from '../damage-types';
import { fromDice, toDice } from '../dice';
import { statusEffects } from '../status-effects';
import { canIncreaseDie, isUpgradeAvailable } from './prereqs';

export const damageUpgrades = (): Upgrade[] => {
  const upgrades = [
    {
      name: 'Barrage',
      description: 'Increase the number of damage dice you roll by 1.',
      cost: 3,
      canPurchase: () => true,
    },
    {
      name: 'Multi-target Attack (Level 1)',
      description: 'Spend an Action Point to spread your damage between multiple targets. Roll your Damage dice, and allocate the resulting damage between the targets you want to hit.',
      cost: 3,
      canPurchase: (character: Character) => isUpgradeAvailable(character, 'Multi-target Attack (Level 1)'),
    },
    {
      name: 'Multi-target Attack (Level 2)',
      description: 'Spend one Action Point per additional target you want to hit, and deal full damage to each of them.',
      cost: 6,
      canPurchase: (character: Character) => (
        !isUpgradeAvailable(character, 'Multi-target Attack (Level 1)')
        && isUpgradeAvailable(character, 'Multi-target Attack (Level 2)')
      ),
    },
    {
      name: 'Concentrated Attack',
      description: 'Spend Action Points to multiply the damage you do to a single target. 1 AP is double damage, 2 AP is triple damage, and so on.',
      cost: 9,
      canPurchase: (character: Character) => isUpgradeAvailable(character, 'Concentrated Attack'),
    },
  ];

  for (let i = 0; i < 5; i += 1) {
    upgrades.push({
      name: `Stopping Power (Level ${i + 1})`,
      description: `Increase your Damage die from a ${fromDice[i]} to a ${toDice[i]}.`,
      cost: (i + 1) * 2,
      canPurchase: (character: Character) => canIncreaseDie(character, 'damageDie', fromDice[i]),
    });
  }

  return upgrades;
};

export const damageTypeUpgrades = () => {
  const upgrades: Upgrade[] = [];

  damageTypes.forEach(({ name }) => {
    upgrades.push({
      name: `Bonus ${name} Damage`,
      description: `Spend Action Points to add 1 Damage die per Action Point of ${name} damage to your attack.`,
      cost: 3,
      canPurchase: (character: Character) => isUpgradeAvailable(character, `Bonus ${name} Damage`),
    });

    upgrades.push({
      name: `Base ${name} Damage`,
      description: `You can choose to classify all of the damage you deal from an attack as ${name} damage.`,
      cost: 6,
      canPurchase: (character: Character) => isUpgradeAvailable(character, `Base ${name} Damage`),
    });
  });

  return upgrades;
};

export const statusEffectUpgrades = () => {
  const upgrades: Upgrade[] = [];

  statusEffects
    .filter(({ inflictedBy }) => inflictedBy.includes('attack'))
    .forEach(({ name, savingThrow, opposedStat }) => {
      upgrades.push({
        name: `Inflict ${name}`,
        description: `Spend an Action Point to inflict the ${name} effect with your Attack. Affected targets will make ${savingThrow} saving throws against your ${opposedStat} DC to try to avoid the effect.`,
        cost: 3,
        canPurchase: (character: Character) => isUpgradeAvailable(character, `Bonus ${name} Damage`),
      });
    });

  return upgrades;
};