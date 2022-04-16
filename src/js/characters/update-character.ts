import { auth } from '../auth/auth';
import { Character } from '../types/types';
import { fetcher } from '../utilities/fetcher';
import { normalizeCharacterData } from './normalize-character-data';

const FIELDS = `{
        _id
        name
        game
        group
        stats {
          data {
            _id
            name
            die
            bonus
            dcBonus
            skills {
              data {
                _id
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
            _id
            name
            description
            cost
            type
          }
        }
        inventory {
          data {
            _id
            name
            description
          }
        }
      }`;

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
      partialUpdateCharacter(id: ${JSON.stringify(id)}, data: {
        ${statName}: ${typeof newValue === 'string' ? `${JSON.stringify(newValue)}` : newValue}
      }) ${FIELDS}
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

export const purchaseActionUpgrade = async (
  id: string,
  currentExperience: number,
  name: string,
  description: string,
  cost: number,
  type: string | null,
): Promise<Character | null> => {
  const { uid } = auth.currentUser ?? {};
  if (!uid) {
    return null;
  }

  const query = `
    mutation {
      partialUpdateCharacter(id: ${JSON.stringify(id)}, data: {
        experiencePoints: ${currentExperience - cost}
      }) {
        experiencePoints
      }
      createUpgrade(data: {
        character: {
          connect: ${JSON.stringify(id)}
        }
        name: ${JSON.stringify(name)}
        description: ${JSON.stringify(description)}
        cost: ${cost}
        ${type != null ? `type: ${JSON.stringify(type)}` : ''}
      }) {
        character ${FIELDS}
      }
    }
  `;

  const response = await fetcher('/api/graphql', {
    method: 'POST',
    body: JSON.stringify({ query }),
  });

  const { result } = await response.json();

  const { character } = result.data.createUpgrade;

  const normalizedData = normalizeCharacterData(character);

  return normalizedData;
};
