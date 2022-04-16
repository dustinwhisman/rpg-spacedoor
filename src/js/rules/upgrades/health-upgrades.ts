import { computedStat } from '../../characters/computed-stat';
import { purchaseSimpleUpgrade } from '../../characters/update-character';
import { Character, StatToUpdate, Upgrade } from '../../types/types';
import { fromDice, toDice } from '../dice';
import { canIncreaseDie, isLessThanHalfOfStat } from './prereqs';

export const healthUpgrades = (): Upgrade[] => {
  const upgrades = [
    {
      name: 'Max HP Increase',
      description: "Increase your HP by half of your Tough die's highest value, plus 7. This acts as a multiplier of base HP, so if your Tough die changes, your HP will change accordingly.",
      cost: 1,
      canPurchase: () => true,
      onPurchase: (character: Character, upgrade: Upgrade) => {
        const { die } = character.stats.find(({ name }) => name === 'Tough') ?? { die: 'd4' };

        const statsToUpdate: StatToUpdate[] = [
          {
            statName: 'hitPointMultiplier',
            newValue: character.hitPointMultiplier + 1,
          },
          {
            statName: 'hitPoints',
            newValue: character.hitPoints + computedStat(die, 7),
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
      name: 'Max AP Increase',
      description: 'Increase your max AP by 2.',
      cost: 1,
      canPurchase: () => true,
      onPurchase: (character: Character, upgrade: Upgrade) => {
        const statsToUpdate: StatToUpdate[] = [
          {
            statName: 'actionPointMax',
            newValue: character.actionPointMax + 2,
          },
          {
            statName: 'actionPoints',
            newValue: character.actionPoints + 2,
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
      name: 'HP Regen',
      description: "At the end of your turn in combat, heal 1 HP. Buying this more than once increases the amount healed by 1 HP. You cannot regenerate health if you are at 0 HP. The maximum regeneration is half of your Tough die's highest value.",
      cost: 1,
      canPurchase: (character: Character) => isLessThanHalfOfStat(character, 'Tough', 'hitPointRegen'),
      onPurchase: (character: Character, upgrade: Upgrade) => {
        const statsToUpdate: StatToUpdate[] = [
          {
            statName: 'hitPointRegen',
            newValue: character.hitPointRegen + 1,
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
      name: 'Effective Medicine',
      description: "Increase the number of healing dice you roll by 1. The maximum number of dice is half of your Cool die's highest value.",
      cost: 1,
      canPurchase: (character: Character) => isLessThanHalfOfStat(character, 'Cool', 'numHealingDie'),
      onPurchase: (character: Character, upgrade: Upgrade) => {
        const statsToUpdate: StatToUpdate[] = [
          {
            statName: 'numHealingDie',
            newValue: character.numHealingDie + 1,
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
      name: 'Bonus Healing',
      description: 'Add a +1 bonus to healing rolls. Maximum of 10.',
      cost: 1,
      canPurchase: (character: Character) => character.healingBonus < 10,
      onPurchase: (character: Character, upgrade: Upgrade) => {
        const statsToUpdate: StatToUpdate[] = [
          {
            statName: 'healingBonus',
            newValue: character.healingBonus + 1,
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

  for (let i = 0; i < 5; i += 1) {
    upgrades.push({
      name: `Healing Power (Level ${i + 1})`,
      description: `Increase your Healing die from a ${fromDice[i]} to a ${toDice[i]}.`,
      cost: (i + 1) * 2,
      canPurchase: (character: Character) => canIncreaseDie(character, 'healingDie', fromDice[i]),
      onPurchase: (character: Character, upgrade: Upgrade) => {
        const statsToUpdate: StatToUpdate[] = [
          {
            statName: 'healingDie',
            newValue: toDice[i],
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
    });
  }

  return upgrades;
};
