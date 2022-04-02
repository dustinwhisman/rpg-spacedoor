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
