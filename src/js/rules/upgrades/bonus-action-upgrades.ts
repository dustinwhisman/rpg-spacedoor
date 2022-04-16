import { purchaseActionUpgrade } from '../../characters/update-character';
import { Character, Upgrade } from '../../types/types';
import { healingActions, statusEffectActions } from './action-upgrades';
import { isUpgradeAvailable } from './prereqs';

const purchaseAction = (character: Character, upgrade: Upgrade) => purchaseActionUpgrade(
  character._id,
  character.experiencePoints,
  upgrade.name,
  upgrade.description,
  upgrade.cost,
  upgrade.type ?? null,
);

export const bonusActions = (): Upgrade[] => {
  const upgrades = [
    {
      name: 'Inspiration',
      description: 'Give an ally 1d6 that they can add to a future roll of their choosing, expiring at the end of the session.',
      cost: 1,
      type: 'bonus-action',
      canPurchase: (character: Character) => isUpgradeAvailable(character, 'Inspiration'),
      onPurchase: purchaseAction,
    },
    {
      name: 'First Aid',
      description: 'Roll one of your Healing dice to heal an ally or yourself.',
      cost: 1,
      type: 'bonus-action',
      canPurchase: (character: Character) => isUpgradeAvailable(character, 'First Aid'),
      onPurchase: purchaseAction,
    },
    {
      name: 'Surge',
      description: 'Spend an Action Point to use another full Action on your turn.',
      cost: 1,
      type: 'bonus-action',
      canPurchase: (character: Character) => isUpgradeAvailable(character, 'Surge'),
      onPurchase: purchaseAction,
    },
    {
      name: 'Hide',
      description: 'Make a Stealth check to try to find cover. Enemies will need to make Sharp checks against the result of your Cool check to be able to attack you.',
      cost: 1,
      type: 'bonus-action',
      canPurchase: (character: Character) => isUpgradeAvailable(character, 'Hide'),
      onPurchase: purchaseAction,
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
      onPurchase: purchaseAction,
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
      onPurchase: purchaseAction,
    });
  });

  return upgrades;
};
