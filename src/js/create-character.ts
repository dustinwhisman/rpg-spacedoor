import { auth } from './auth/auth';
import { fetcher } from './utilities/fetcher';
import { stats } from './rules/stats';
import { computedStat } from './characters/computed-stat';
import { renderEffectTypeChecklist } from './components/CheckboxList';
import { renderPrimaryStatRanking, renderSecondaryStatRanking } from './components/SortableList';

renderPrimaryStatRanking();
renderSecondaryStatRanking();
renderEffectTypeChecklist('vulnerabilities');
renderEffectTypeChecklist('resistances');
renderEffectTypeChecklist('immunities');

const generateQuery = (
  uid: string,
  name: string,
  groupName: string,
  statMap: { [key: string]: string },
  vulnerabilities: string[],
  resistances: string[],
  immunities: string[],
): string => `
  mutation {
    createCharacter(data: {
      uid: "${uid}"
      name: "${name}"
      game: "Spacedoor!"
      group: "${groupName}"
      stats: {
        create: [${stats.map(({ name: statName, skills }) => `
          {
            name: "${statName}"
            die: "${statMap[statName]}"
            bonus: 0
            dcBonus: 0
            skills: {
              create: [${skills.map(({ name: skillName }) => `
                {
                  name: "${skillName}"
                  die: "${statMap[statName]}"
                  bonusDie: ""
                  bonus: 0
                }
              `).join('')}]
            }
          }
        `).join('')}]
      }
      damageDie: "${statMap.Offense}"
      numDamageDie: 1
      damageBonus: 0
      healingDie: "${statMap.Healing}"
      numHealingDie: 1
      healingBonus: 0
      damageThreshold: ${statMap.Defense}
      damageThresholdBonus: 0
      actionPointMax: 3
      actionPoints: 3
      experiencePoints: 0
      baseHitPointMax: ${computedStat(statMap.Tough, 7)}
      hitPointMultiplier: 1
      hitPoints: ${computedStat(statMap.Tough, 7)}
      hitPointRegen: 0
      baseShieldHitPointMax: 0
      shieldHitPointMultiplier: 1
      shieldHitPoints: 0
      shieldHitPointRegen: 0
      vulnerabilities: ["${vulnerabilities.join('", "')}"]
      resistances: ["${resistances.join('", "')}"]
      immunities: ["${immunities.join('", "')}"]
      upgrades: {
        create: []
      }
      inventory: {
        create: []
      }
    }) {
      name
    }
  }
`;

document.addEventListener('submit', async (event: SubmitEvent) => {
  const target = event.target as HTMLFormElement;

  if (target.matches('[data-create-character]')) {
    event.preventDefault();

    const { uid } = auth.currentUser ?? {};
    if (!uid) {
      return;
    }

    const characterNameInput = target.elements.namedItem('character-name') as HTMLInputElement;
    const characterName = characterNameInput.value;

    const groupNameInput = target.elements.namedItem('group-name') as HTMLInputElement;
    const groupName = groupNameInput.value;

    const statInputs = document.querySelectorAll('[data-stat]') as unknown as HTMLInputElement[];
    const statMap = Array.from(statInputs).reduce((obj, input) => ({
      ...obj,
      [input.name]: input.value,
    }), {}) ?? {};

    const vulnerabilities = document.querySelectorAll('[name="vulnerabilities"]:checked') as unknown as HTMLInputElement[];
    const selectedVulnerabilities = Array.from(vulnerabilities)
      .map((vulnerability) => vulnerability.value);

    const resistances = document.querySelectorAll('[name="resistances"]:checked') as unknown as HTMLInputElement[];
    const selectedResistances = Array.from(resistances)
      .map((resistance) => resistance.value);

    const immunities = document.querySelectorAll('[name="immunities"]:checked') as unknown as HTMLInputElement[];
    const selectedImmunities = Array.from(immunities)
      .map((immunity) => immunity.value);

    const query = generateQuery(
      uid,
      characterName,
      groupName,
      statMap,
      selectedVulnerabilities,
      selectedResistances,
      selectedImmunities,
    );

    const response = await fetcher('/api/graphql', {
      method: 'POST',
      body: JSON.stringify({
        query,
      }),
    });

    const { result } = await response.json();
    const { name: returnedName } = result.data.createCharacter;
    window.location.href = `/character?name=${returnedName}`;
  }
});
