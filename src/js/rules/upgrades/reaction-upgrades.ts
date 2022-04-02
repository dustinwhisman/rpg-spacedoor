import { Character, Upgrade } from '../../types/types';
import { isUpgradeAvailable } from './prereqs';

export const reactionUpgrades = (): Upgrade[] => {
  const upgrades = [
    {
      name: 'Guard',
      description: 'You can take damage in place of a nearby ally when they are attacked. This does not apply if you would both take damage anyway.',
      cost: 1,
      canPurchase: (character: Character) => isUpgradeAvailable(character, 'Guard'),
    },
    {
      name: 'Dodge',
      description: 'When attacked, you may use this Reaction to take half damage.',
      cost: 1,
      canPurchase: (character: Character) => isUpgradeAvailable(character, 'Dodge'),
    },
    {
      name: 'Counterattack',
      description: 'When attacked by an enemy, you may attack them right back.',
      cost: 3,
      canPurchase: (character: Character) => isUpgradeAvailable(character, 'Counterattack'),
    },
    {
      name: 'Neutralize Effect',
      description: 'If you fail a saving throw to avoid a status effect, you can use your Reaction to neutralize that effect.',
      cost: 3,
      canPurchase: (character: Character) => isUpgradeAvailable(character, 'Neutralize Effect'),
    },
    {
      name: 'Reflect',
      description: 'Spend three Action Points to automatically pass a saving throw for a status effect, and force the enemy that attempted to inflict it to make a saving throw themselves.',
      cost: 5,
      canPurchase: (character: Character) => isUpgradeAvailable(character, 'Reflect'),
    },
  ];

  return upgrades;
};
