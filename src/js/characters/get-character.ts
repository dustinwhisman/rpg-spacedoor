import { auth } from '../auth/auth';
import { Character } from '../types/types';
import { fetcher } from '../utilities/fetcher';

type CharacterInput = {
  _id: string,
  name: string,
  game: string,
  group: string,
  stats: {
    data: Array<{
      name: string,
      die: string,
      bonus: number,
      dcBonus: number,
      skills: {
        data: Array<{
          name: string,
          die: string,
          bonus: number,
        }>
      }
    }>
  },
  damageDie: string,
  numDamageDie: number,
  damageBonus: number,
  healingDie: string,
  numHealingDie: number,
  healingBonus: number,
  damageThreshold: number,
  damageThresholdBonus: number,
  actionPointMax: number,
  actionPoints: number,
  experiencePoints: number,
  baseHitPointMax: number,
  hitPointMultiplier: number,
  hitPoints: number,
  hitPointRegen: number,
  baseShieldHitPointMax: number,
  shieldHitPointMultiplier: number,
  shieldHitPoints: number,
  shieldHitPointRegen: number,
  vulnerabilities: string[],
  resistances: string[],
  immunities: string[],
  upgrades: {
    data: Array<{
      name: string,
      description: string,
      cost: number,
    }>
  },
  inventory: {
    data: Array<{
      name: string,
      description: string,
    }>,
  },
};

const normalizeCharacterData = (characterInput: CharacterInput): Character => ({
  ...characterInput,
  stats: characterInput.stats.data.map((stat) => ({
    ...stat,
    skills: stat.skills.data,
  })),
  upgrades: characterInput.upgrades.data,
  inventory: characterInput.inventory.data,
});

export const getCharacter = async (name: string) => {
  const { uid } = auth.currentUser ?? {};
  if (!uid) {
    return [];
  }

  const query = `
    query {
      charactersByName(uid: "${uid}", game: "Spacedoor!", name: "${name}") {
        data {
          _id
          name
          game
          group
          stats {
            data {
              name
              die
              bonus
              dcBonus
              skills {
                data {
                  name
                  die
                  bonus
                }
              }
            }
          }
          damageDie
          numDamageDie
          damageBonus
          healingDie
          numHealingDie
          healingBonus
          damageThreshold
          damageThresholdBonus
          actionPointMax
          actionPoints
          experiencePoints
          baseHitPointMax
          hitPointMultiplier
          hitPoints
          hitPointRegen
          baseShieldHitPointMax
          shieldHitPointMultiplier
          shieldHitPoints
          shieldHitPointRegen
          vulnerabilities
          resistances
          immunities
          upgrades {
            data {
              name
              description
              cost
            }
          }
          inventory {
            data {
              name
              description
            }
          }
        }
      }
    }
  `;

  const response = await fetcher('/api/graphql', {
    method: 'POST',
    body: JSON.stringify({ query }),
  });

  const { result } = await response.json();
  const character = result.data.characterByName;

  const normalizedData = normalizeCharacterData(character);

  return normalizedData;
};
