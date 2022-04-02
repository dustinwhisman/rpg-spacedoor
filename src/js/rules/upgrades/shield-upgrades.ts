import { Character, Upgrade } from '../../types/types';
import { isLessThanHalfOfStat, isUpgradeAvailable } from './prereqs';

export const shieldUpgrades = (): Upgrade[] => {
  const upgrades = [
    {
      name: 'Energy Shield',
      description: "Wear an energy shield that will take damage before you lose HP. Shields have Shield Hit Points (SHP) equal to half of your Technobabble die's highest value. If the shield does not take damage during a round of combat, it regenerates one SHP at the end of your turn, unless it is at 0 SHP.",
      cost: 1,
      canPurchase: (character: Character) => isUpgradeAvailable(character, 'Energy Shield'),
    },
    {
      name: 'Max Shield Increase',
      description: "Increase your Shield Hit Points (SHP) by half of your Technobabble die's highest value. This acts as a multiplier of base SHP, so if your Technobabble die changes, your SHP will change accordingly.",
      cost: 1,
      canPurchase: () => true,
    },
    {
      name: 'Improved Shield Regen',
      description: "Increase the amount of SHP your shield regenerates by 1. The maximum value is half of your Technobabble die's highest value.",
      cost: 1,
      canPurchase: (character: Character) => isLessThanHalfOfStat(character, 'Technobabble', 'shieldHitPointRegen'),
    },
  ];

  return upgrades;
};
