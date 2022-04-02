import { Character, Upgrade } from '../../types/types';
import { statusEffects } from '../status-effects';
import { isUpgradeAvailable } from './prereqs';

export const healingActions = (): Upgrade[] => {
  const upgrades = [
    {
      name: 'Cure (Level 1)',
      description: 'Spend an Action Point to heal one ally or yourself, according to your Healing dice. Healing does not apply to energy shields.',
      cost: 1,
      canPurchase: (character: Character) => isUpgradeAvailable(character, 'Cure (Level 1)'),
    },
    {
      name: 'Cure (Level 2)',
      description: 'Spend an Action Point to heal multiple members of your party. Roll your Healing dice, and allocate the resulting health between the party members you want to heal.',
      cost: 3,
      canPurchase: (character: Character) => (
        !isUpgradeAvailable(character, 'Cure (Level 1)')
        && isUpgradeAvailable(character, 'Cure (Level 2)')
      ),
    },
    {
      name: 'Cure (Level 3)',
      description: 'Spend an Action Point to heal all members of your party. All allies, including yourself, restore the full result of your Healing dice.',
      cost: 5,
      canPurchase: (character: Character) => (
        !isUpgradeAvailable(character, 'Cure (Level 1)')
        && !isUpgradeAvailable(character, 'Cure (Level 2)')
        && isUpgradeAvailable(character, 'Cure (Level 3)')
      ),
    },
    {
      name: 'Remedy (Level 1)',
      description: 'Spend an Action Point to remove all negative status effects from one ally or yourself.',
      cost: 1,
      canPurchase: (character: Character) => isUpgradeAvailable(character, 'Remedy (Level 1)'),
    },
    {
      name: 'Remedy (Level 2)',
      description: 'Spend multiple Action Points to remove all negative status effects from multiple party members, equal to the number of Action Points.',
      cost: 3,
      canPurchase: (character: Character) => (
        !isUpgradeAvailable(character, 'Remedy (Level 1)')
        && isUpgradeAvailable(character, 'Remedy (Level 2)')
      ),
    },
    {
      name: 'Remedy (Level 3)',
      description: 'Spend an Action Point to remove all negative status effects from all party members.',
      cost: 5,
      canPurchase: (character: Character) => (
        !isUpgradeAvailable(character, 'Remedy (Level 1)')
        && !isUpgradeAvailable(character, 'Remedy (Level 2)')
        && isUpgradeAvailable(character, 'Remedy (Level 3)')
      ),
    },
  ];

  return upgrades;
};

export const statusEffectActions = (): Upgrade[] => {
  const upgrades: Upgrade[] = [];

  statusEffects
    .filter(({ inflictedBy }) => inflictedBy.includes('action'))
    .forEach(({ name, savingThrow, opposedStat }) => {
      upgrades.push({
        name: `Inflict "${name}" (Level 1)`,
        description: `Spend an Action Point to inflict the ${name} effect on a single target with your Action. Affected targets will make ${savingThrow} saving throws against your ${opposedStat} DC to try to avoid the effect.`,
        cost: 1,
        canPurchase: (character: Character) => isUpgradeAvailable(character, `Inflict "${name}" (Level 1)`),
      });

      upgrades.push({
        name: `Inflict "${name}" (Level 2)`,
        description: `Spend more Action Points to inflict the ${name} effect on one target per Action Point.`,
        cost: 2,
        canPurchase: (character: Character) => (
          !isUpgradeAvailable(character, `Inflict "${name}" (Level 1)`)
          && isUpgradeAvailable(character, `Inflict "${name}" (Level 2)`)
        ),
      });

      upgrades.push({
        name: `Inflict "${name}" (Level 3)`,
        description: `Spend three Action Points to force targets to roll with disadvantage on their saving throws to avoid the ${name} effect.`,
        cost: 3,
        canPurchase: (character: Character) => (
          !isUpgradeAvailable(character, `Inflict "${name}" (Level 1)`)
          && !isUpgradeAvailable(character, `Inflict "${name}" (Level 2)`)
          && isUpgradeAvailable(character, `Inflict "${name}" (Level 3)`)
        ),
      });
    });

  return upgrades;
};
