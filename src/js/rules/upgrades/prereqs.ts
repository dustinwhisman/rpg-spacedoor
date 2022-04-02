import { Character } from '../../types/types';

export const canBumpStatDie = (character: Character, statName: string, die: string): boolean => {
  const currentDie = character.stats.find((stat) => stat.name === statName)?.die;
  if (currentDie === die) {
    return true;
  }

  return false;
};

export const canAddBonusToStatDie = (character: Character, statName: string): boolean => {
  const { die, bonus } = character.stats.find((stat) => stat.name === statName) ?? {};

  if (!die || bonus == null) {
    return false;
  }

  const [, dieValue] = die.split('d');
  const numericDieValue = Number.parseInt(dieValue, 10);
  if (Number.isNaN(numericDieValue) || bonus >= (numericDieValue / 2)) {
    return false;
  }

  return true;
};

export const canIncreaseStatDifficulty = (character: Character, statName: string): boolean => {
  const { die, dcBonus } = character.stats.find((stat) => stat.name === statName) ?? {};

  if (!die || dcBonus == null) {
    return false;
  }

  const [, dieValue] = die.split('d');
  const numericDieValue = Number.parseInt(dieValue, 10);
  if (Number.isNaN(numericDieValue) || dcBonus >= (numericDieValue / 2)) {
    return false;
  }

  return true;
};

export const canAddProficiencyDie = (
  character: Character,
  statName: string,
  skillName: string,
  bonusDieValue: string,
): boolean => {
  const { die: statDie, skills } = character.stats.find((stat) => stat.name === statName) ?? {};

  if (!statDie || !skills || !skills.length) {
    return false;
  }

  const { die: skillDie } = skills.find((skill) => skill.name === skillName) ?? {};

  if (!skillDie && ['d8', 'd10', 'd12', 'd20'].includes(statDie)) {
    return bonusDieValue === 'd4';
  }

  if (skillDie === 'd4' && ['d10', 'd12', 'd20'].includes(statDie)) {
    return bonusDieValue === 'd6';
  }

  if (skillDie === 'd6' && ['d12', 'd20'].includes(statDie)) {
    return bonusDieValue === 'd8';
  }

  if (skillDie === 'd8' && statDie === 'd20') {
    return bonusDieValue === 'd10';
  }

  return false;
};

export const canAddBonusToSkillDie = (
  character: Character,
  statName: string,
  skillName: string,
): boolean => {
  const { die: statDie, skills } = character.stats.find((stat) => stat.name === statName) ?? {};

  if (!statDie || !skills || !skills.length) {
    return false;
  }

  const { bonus } = skills.find((skill) => skill.name === skillName) ?? { bonus: 0 };

  const [, dieValue] = statDie.split('d');
  const numericDieValue = Number.parseInt(dieValue, 10);
  if (Number.isNaN(numericDieValue) || bonus >= (numericDieValue / 2)) {
    return false;
  }

  return true;
};

export const canUseStatForSkill = (
  character: Character,
  statName: string,
  skillName: string,
): boolean => {
  const { skills } = character.stats.find((stat) => stat.name === statName) ?? {};

  if (!skills || !skills.length) {
    return true;
  }

  if (skills.map(({ name }) => name).includes(skillName)) {
    return false;
  }

  return true;
};