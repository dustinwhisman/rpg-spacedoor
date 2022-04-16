import { purchaseActionUpgrade } from '../../characters/update-character';
import { Character, Upgrade } from '../../types/types';
import { isUpgradeAvailable } from './prereqs';

const purchaseAction = (character: Character, upgrade: Upgrade) => purchaseActionUpgrade(
  character._id,
  character.experiencePoints,
  upgrade.name,
  upgrade.description,
  upgrade.cost,
  upgrade.type ?? null,
);

export const reactionUpgrades = (): Upgrade[] => {
  const upgrades = [
    {
      name: 'Guard',
      description: 'You can take damage in place of a nearby ally when they are attacked. This does not apply if you would both take damage anyway.',
      cost: 1,
      type: 'reaction',
      canPurchase: (character: Character) => isUpgradeAvailable(character, 'Guard'),
      onPurchase: purchaseAction,
    },
    {
      name: 'Dodge',
      description: 'When attacked, you may use this Reaction to take half damage.',
      cost: 1,
      type: 'reaction',
      canPurchase: (character: Character) => isUpgradeAvailable(character, 'Dodge'),
      onPurchase: purchaseAction,
    },
    {
      name: 'Counterattack',
      description: 'When attacked by an enemy, you may attack them right back.',
      cost: 3,
      type: 'reaction',
      canPurchase: (character: Character) => isUpgradeAvailable(character, 'Counterattack'),
      onPurchase: purchaseAction,
    },
    {
      name: 'Neutralize Effect',
      description: 'If you fail a saving throw to avoid a status effect, you can use your Reaction to neutralize that effect.',
      cost: 3,
      type: 'reaction',
      canPurchase: (character: Character) => isUpgradeAvailable(character, 'Neutralize Effect'),
      onPurchase: purchaseAction,
    },
    {
      name: 'Reflect',
      description: 'Spend three Action Points to automatically pass a saving throw for a status effect, and force the enemy that attempted to inflict it to make a saving throw themselves.',
      cost: 5,
      type: 'reaction',
      canPurchase: (character: Character) => isUpgradeAvailable(character, 'Reflect'),
      onPurchase: purchaseAction,
    },
  ];

  return upgrades;
};
