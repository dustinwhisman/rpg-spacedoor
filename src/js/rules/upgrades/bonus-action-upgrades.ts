import { Character, Upgrade } from '../../types/types';
import { healingActions, statusEffectActions } from './action-upgrades';
import { isUpgradeAvailable } from './prereqs';

export const bonusActions = (): Upgrade[] => {
  const upgrades = [
    {
      name: 'Inspiration',
      description: 'Give an ally 1d6 that they can add to a future roll of their choosing, expiring at the end of the session.',
      cost: 1,
      type: 'bonus-action',
      canPurchase: (character: Character) => isUpgradeAvailable(character, 'Inspiration'),
    },
    {
      name: 'First Aid',
      description: 'Roll one of your Healing dice to heal an ally or yourself.',
      cost: 1,
      type: 'bonus-action',
      canPurchase: (character: Character) => isUpgradeAvailable(character, 'First Aid'),
    },
    {
      name: 'Surge',
      description: 'Spend an Action Point to use another full Action on your turn.',
      cost: 1,
      type: 'bonus-action',
      canPurchase: (character: Character) => isUpgradeAvailable(character, 'Surge'),
    },
    {
      name: 'Hide',
      description: 'Make a Stealth check to try to find cover. Enemies will need to make Sharp checks against the result of your Cool check to be able to attack you.',
      cost: 1,
      type: 'bonus-action',
      canPurchase: (character: Character) => isUpgradeAvailable(character, 'Hide'),
    },
  ];

  return upgrades;
};

export const bonusHealingActions = (): Upgrade[] => {
  const upgrades: Upgrade[] = [];

  healingActions().forEach(({ name, cost }) => {
    upgrades.push({
      name: `Bonus Action: ${name}`,
      description: `Use the ${name} Action as a Bonus Action.`,
      cost: cost * 2,
      type: 'bonus-action',
      canPurchase: (character: Character) => (
        !isUpgradeAvailable(character, name)
        && isUpgradeAvailable(character, `Bonus Action: ${name}`)
      ),
    });
  });

  return upgrades;
};

export const bonusStatusEffectActions = (): Upgrade[] => {
  const upgrades: Upgrade[] = [];

  statusEffectActions().forEach(({ name, cost }) => {
    upgrades.push({
      name: `Bonus Action: ${name}`,
      description: `Use the ${name} Action as a Bonus Action.`,
      cost: cost * 2,
      type: 'bonus-action',
      canPurchase: (character: Character) => (
        !isUpgradeAvailable(character, name)
        && isUpgradeAvailable(character, `Bonus Action: ${name}`)
      ),
    });
  });

  return upgrades;
};
