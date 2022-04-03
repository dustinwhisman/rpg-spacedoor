import { Character, Upgrade } from '../../types/types';
import { fromDice, toDice } from '../dice';
import { canIncreaseDie, isLessThanHalfOfStat } from './prereqs';

export const healthUpgrades = (): Upgrade[] => {
  const upgrades = [
    {
      name: 'Max HP Increase',
      description: "Increase your HP by half of your Tough die's highest value, plus 7. This acts as a multiplier of base HP, so if your Tough die changes, your HP will change accordingly.",
      cost: 1,
      canPurchase: () => true,
    },
    {
      name: 'Max AP Increase',
      description: 'Increase your max AP by 2.',
      cost: 1,
      canPurchase: () => true,
    },
    {
      name: 'HP Regen',
      description: "At the end of your turn in combat, heal 1 HP. Buying this more than once increases the amount healed by 1 HP. You cannot regenerate health if you are at 0 HP. The maximum regeneration is half of your Tough die's highest value.",
      cost: 1,
      canPurchase: (character: Character) => isLessThanHalfOfStat(character, 'Tough', 'hitPointRegen'),
    },
    {
      name: 'Effective Medicine',
      description: "Increase the number of healing dice you roll by 1. The maximum number of dice is half of your Cool die's highest value.",
      cost: 1,
      canPurchase: (character: Character) => isLessThanHalfOfStat(character, 'Cool', 'numHealingDie'),
    },
    {
      name: 'Bonus Healing',
      description: "Add a +1 bonus to healing rolls. The maximum bonus is half of your Cool die's highest value.",
      cost: 1,
      canPurchase: (character: Character) => isLessThanHalfOfStat(character, 'Cool', 'healingBonus'),
    },
  ];

  for (let i = 0; i < 5; i += 1) {
    upgrades.push({
      name: `Healing Power (Level ${i + 1})`,
      description: `Increase your Healing die from a ${fromDice[i]} to a ${toDice[i]}.`,
      cost: (i + 1) * 2,
      canPurchase: (character: Character) => canIncreaseDie(character, 'healingDie', fromDice[i]),
    });
  }

  return upgrades;
};
