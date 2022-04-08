import { Character } from '../types/types';
import { CharacterInput } from './types';

export const normalizeCharacterData = (characterInput: CharacterInput): Character => ({
  ...characterInput,
  stats: characterInput.stats.data.map((stat) => ({
    ...stat,
    skills: stat.skills.data,
  })),
  upgrades: characterInput.upgrades.data,
  inventory: characterInput.inventory.data,
});
