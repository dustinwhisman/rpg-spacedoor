import { auth } from '../auth/auth';
import { Character } from '../types/types';
import { fetcher } from '../utilities/fetcher';
import { normalizeCharacterData } from './normalize-character-data';

export const updateBasicValue = async (
  id: string,
  statName: string,
  newValue: string | number,
): Promise<Character | null> => {
  const { uid } = auth.currentUser ?? {};
  if (!uid) {
    return null;
  }

  const query = `
    mutation {
      partialUpdateCharacter(id: "${id}", data: {
        ${statName}: ${typeof newValue === 'string' ? `"${newValue}"` : newValue}
      }) {
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
                bonusDie
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
  `;

  const response = await fetcher('/api/graphql', {
    method: 'POST',
    body: JSON.stringify({ query }),
  });

  const { result } = await response.json();
  // eslint-disable-next-line no-underscore-dangle
  const character = result.data.partialUpdateCharacter;

  const normalizedData = normalizeCharacterData(character);

  return normalizedData;
};
