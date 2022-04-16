import { purchaseStatUpgrade } from '../../characters/update-character';
import { Character, Upgrade } from '../../types/types';
import { fromDice, toDice } from '../dice';
import { stats } from '../stats';
import { canBumpStatDie, canAddBonusToStatDie, canIncreaseStatDifficulty } from './prereqs';

const bumpToNextSize = (name: string): Upgrade[] => {
  const upgrades = [];

  for (let i = 0; i < fromDice.length; i += 1) {
    upgrades.push({
      stat: name,
      name: `${name} Upgrade (Level ${i + 1})`,
      description: `Increase your ${name} from a ${fromDice[i]} to a ${toDice[i]}.`,
      cost: i + 1,
      canPurchase: (character: Character) => canBumpStatDie(character, name, fromDice[i]),
      onPurchase: (character: Character, upgrade: Upgrade) => {
        const { _id: statId } = character.stats.find((stat) => stat.name === name) ?? { _id: '' };

        return purchaseStatUpgrade(
          character._id,
          character.experiencePoints,
          upgrade.name,
          upgrade.description,
          upgrade.cost,
          statId ?? '',
          'die',
          toDice[i],
        );
      },
    });
  }

  return upgrades;
};

const addPermanentBonus = (name: string): Upgrade[] => {
  const upgrades = [{
    stat: name,
    name: `${name} Bonus`,
    description: `Add a permanent +1 bonus to all ${name} rolls, or increase your existing bonus by +1. The maximum bonus is half of your ${name} die's highest value`,
    cost: 1,
    canPurchase: (character: Character) => canAddBonusToStatDie(character, name),
    onPurchase: (character: Character, upgrade: Upgrade) => {
      const { _id: statId, bonus } = character.stats.find((stat) => stat.name === name) ?? { _id: '', bonus: 0 };

      return purchaseStatUpgrade(
        character._id,
        character.experiencePoints,
        upgrade.name,
        upgrade.description,
        upgrade.cost,
        statId ?? '',
        'bonus',
        bonus + 1,
      );
    },
  }];

  return upgrades;
};

const addDifficultyBonus = (name: string): Upgrade[] => {
  const upgrades = [{
    stat: name,
    name: `${name} DC Increase`,
    description: `Increase your ${name} DC by 1. You can increase this DC by up to half of your ${name} die's highest value.`,
    cost: 1,
    canPurchase: (character: Character) => canIncreaseStatDifficulty(character, name),
    onPurchase: (character: Character, upgrade: Upgrade) => {
      const { _id: statId, dcBonus } = character.stats.find((stat) => stat.name === name) ?? { _id: '', dcBonus: 0 };

      return purchaseStatUpgrade(
        character._id,
        character.experiencePoints,
        upgrade.name,
        upgrade.description,
        upgrade.cost,
        statId ?? '',
        'dcBonus',
        dcBonus + 1,
      );
    },
  }];

  return upgrades;
};

export const statUpgrades = (): Upgrade[][] => {
  const upgrades: Upgrade[][] = [];

  stats.forEach(({ name }) => {
    let upgradesForStat: Upgrade[] = [];
    upgradesForStat = upgradesForStat.concat(bumpToNextSize(name));
    upgradesForStat = upgradesForStat.concat(addPermanentBonus(name));
    upgradesForStat = upgradesForStat.concat(addDifficultyBonus(name));

    upgrades.push(upgradesForStat);
  });

  return upgrades;
};
