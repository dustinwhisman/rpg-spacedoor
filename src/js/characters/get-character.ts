import { auth } from '../auth/auth';
import { fetcher } from '../utilities/fetcher';
import { normalizeCharacterData } from './normalize-character-data';

export const getCharacter = async (name: string) => {
  const { uid } = auth.currentUser ?? {};
  if (!uid) {
    return [];
  }

  const query = `
    query {
      characterByName(uid: ${JSON.stringify(uid)}, game: "Spacedoor!", name: ${JSON.stringify(name)}) {
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
