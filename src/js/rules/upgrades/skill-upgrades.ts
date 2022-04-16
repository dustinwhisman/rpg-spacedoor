import { moveSkillToTechnobabble, purchaseSkillUpgrade } from '../../characters/update-character';
import { Character, Upgrade } from '../../types/types';
import { fromDice, toDice } from '../dice';
import { stats } from '../stats';
import {
  canAddBonusToSkillDie,
  canAddProficiencyDie,
  canUseStatForSkill,
  isUpgradeAvailable,
} from './prereqs';

const addProficiencyDie = (statName: string, skillName: string): Upgrade[] => {
  const upgrades = [{
    stat: statName,
    skill: skillName,
    name: `${skillName} Proficiency (Level 1)`,
    description: `Roll a d4 in addition to your ${statName} die on ${skillName} checks. Your ${statName} die must be at least a d8.`,
    cost: 1,
    canPurchase: (character: Character) => (
      (!isUpgradeAvailable(character, `Tech Augmented ${skillName}`) && canAddProficiencyDie(character, 'Technobabble', skillName, 'd4'))
      || canAddProficiencyDie(character, statName, skillName, 'd4')
    ),
    onPurchase: (character: Character, upgrade: Upgrade) => {
      let { skills } = character.stats.find(({ name }) => name === statName) ?? { skills: [] };
      if (!isUpgradeAvailable(character, `Tech Augmented ${skillName}`)) {
        skills = character.stats.find(({ name }) => name === 'Technobabble')?.skills ?? [];
      }
      const { _id: skillId } = skills.find(({ name }) => name === skillName) ?? { _id: '' };

      return purchaseSkillUpgrade(
        character._id,
        character.experiencePoints,
        upgrade.name,
        upgrade.description,
        upgrade.cost,
        skillId ?? '',
        'bonusDie',
        'd4',
      );
    },
  }];

  for (let i = 0; i < 3; i += 1) {
    upgrades.push({
      stat: statName,
      skill: skillName,
      name: `${skillName} Proficiency (Level ${i + 2})`,
      description: `Increase your ${skillName} bonus die from a ${fromDice[i]} to a ${toDice[i]}. Your ${statName} die must be ${i < 2 ? 'at least' : ''} a ${toDice[i + 2]}.`,
      cost: 1,
      canPurchase: (character: Character) => (
        (!isUpgradeAvailable(character, `Tech Augmented ${skillName}`) && canAddProficiencyDie(character, 'Technobabble', skillName, toDice[i]))
        || canAddProficiencyDie(character, statName, skillName, toDice[i])
      ),
      onPurchase: (character: Character, upgrade: Upgrade) => {
        let { skills } = character.stats.find(({ name }) => name === statName) ?? { skills: [] };
        if (!isUpgradeAvailable(character, `Tech Augmented ${skillName}`)) {
          skills = character.stats.find(({ name }) => name === 'Technobabble')?.skills ?? [];
        }
        const { _id: skillId } = skills.find(({ name }) => name === skillName) ?? { _id: '' };

        return purchaseSkillUpgrade(
          character._id,
          character.experiencePoints,
          upgrade.name,
          upgrade.description,
          upgrade.cost,
          skillId ?? '',
          'bonusDie',
          toDice[i],
        );
      },
    });
  }

  return upgrades;
};

const addPermanentBonus = (statName: string, skillName: string): Upgrade[] => {
  const upgrades = [{
    stat: statName,
    skill: skillName,
    name: `${skillName} Bonus`,
    description: `Add a permanent +1 bonus to all ${skillName} checks, or increase your existing bonus by +1. The maximum bonus is half of your ${statName} die's highest value.`,
    cost: 1,
    canPurchase: (character: Character) => (
      (!isUpgradeAvailable(character, `Tech Augmented ${skillName}`) && canAddBonusToSkillDie(character, 'Technobabble', skillName))
      || canAddBonusToSkillDie(character, statName, skillName)
    ),
    onPurchase: (character: Character, upgrade: Upgrade) => {
      let { skills } = character.stats.find(({ name }) => name === statName) ?? { skills: [] };
      if (!isUpgradeAvailable(character, `Tech Augmented ${skillName}`)) {
        skills = character.stats.find(({ name }) => name === 'Technobabble')?.skills ?? [];
      }
      const { _id: skillId, bonus } = skills.find(({ name }) => name === skillName) ?? { _id: '', bonus: 0 };

      return purchaseSkillUpgrade(
        character._id,
        character.experiencePoints,
        upgrade.name,
        upgrade.description,
        upgrade.cost,
        skillId ?? '',
        'bonus',
        bonus + 1,
      );
    },
  }];

  return upgrades;
};

const useTechnobabbleForSkill = (statName: string, skillName: string): Upgrade[] => {
  const upgrades = [{
    stat: statName,
    skill: skillName,
    name: `Tech Augmented ${skillName}`,
    description: `Use Technobabble instead of ${statName} for ${skillName} checks.`,
    cost: 3,
    canPurchase: (character: Character) => canUseStatForSkill(character, 'Technobabble', skillName),
    onPurchase: (character: Character, upgrade: Upgrade) => {
      const { _id: technobabbleId, die: technobabbleDie } = character.stats.find(({ name }) => name === 'Technobabble') ?? { _id: '' };
      const { skills } = character.stats.find(({ name }) => name === statName) ?? { skills: [] };
      const { _id: skillId } = skills.find(({ name }) => name === skillName) ?? { _id: '' };

      return moveSkillToTechnobabble(
        character._id,
        character.experiencePoints,
        upgrade.name,
        upgrade.description,
        upgrade.cost,
        skillId ?? '',
        technobabbleId ?? '',
        technobabbleDie ?? 'd4',
      );
    },
  }];

  return upgrades;
};

const sortSkillsAlphabetically = (a: Upgrade[], b: Upgrade[]): number => {
  if (!a[0].skill || !b[0].skill) {
    return 0;
  }

  if (a[0].skill < b[0].skill) {
    return -1;
  }

  if (a[0].skill > b[0].skill) {
    return 1;
  }

  return 0;
};

export const skillUpgrades = (): Upgrade[][] => {
  const upgrades: Upgrade[][] = [];

  stats.forEach(({ name: statName, skills }) => {
    skills.forEach(({ name: skillName }) => {
      let upgradesForSkill: Upgrade[] = [];
      upgradesForSkill = upgradesForSkill.concat(addProficiencyDie(statName, skillName));
      upgradesForSkill = upgradesForSkill.concat(addPermanentBonus(statName, skillName));
      upgradesForSkill = upgradesForSkill.concat(useTechnobabbleForSkill(statName, skillName));

      upgrades.push(upgradesForSkill);
    });
  });

  return upgrades.sort(sortSkillsAlphabetically);
};
