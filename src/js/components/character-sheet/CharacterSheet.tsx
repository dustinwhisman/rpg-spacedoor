/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Character } from '../../types/types';
import {
  statUpgrades,
  skillUpgrades,
  healthUpgrades,
  damageUpgrades,
  damageTypeUpgrades,
  statusEffectUpgrades,
  shieldUpgrades,
  removeVulnerabilityUpgrades,
  resistanceUpgrades,
  immunityUpgrades,
  healingActions,
  statusEffectActions,
  bonusActions,
  bonusHealingActions,
  bonusStatusEffectActions,
  reactionUpgrades,
} from '../../rules/upgrades';
import { CharacterName } from './CharacterName';
import { CharacterStatus } from './CharacterStatus';
import { CharacterStats } from './CharacterStats';
import { SecondaryStats } from './SecondaryStats';
import { CharacterSkills } from './CharacterSkills';
import { CharacterTraits } from './CharacterTraits';
import { UpgradeCategory } from './UpgradeCategory';
import { UpgradeCard } from './UpgradeCard';

const CharacterSheet = ({ character }: { character: Character }) => (
  <>
    <CharacterName name={character.name} />
    <CharacterStatus {...character} />
    <CharacterStats stats={character.stats} />
    <SecondaryStats {...character} />
    <CharacterSkills stats={character.stats} />
    <CharacterTraits {...character} />

    <h2>
      Available Upgrades
    </h2>

    <details>
      <summary>
        Stat Upgrades
      </summary>
      <div className="cmp-stack">
        {statUpgrades()
          .filter((upgradesForStat) => upgradesForStat.some(({ canPurchase }) => (
            canPurchase?.(character) ?? false
          )))
          .map((upgradesForStat) => (
            <details key={upgradesForStat[0].stat}>
              <summary className="summary--deca">
                {`${upgradesForStat[0].stat} Upgrades`}
              </summary>
              <div className="cmp-upgrade-card__grid">
                {upgradesForStat
                  .filter(({ canPurchase }) => canPurchase?.(character) ?? false)
                  .map(({ name, description, cost }) => (
                    <UpgradeCard key={name} name={name} description={description} cost={cost} />
                  ))}
              </div>
            </details>
          ))}
      </div>
    </details>

    <details>
      <summary>
        Skill Upgrades
      </summary>
      {skillUpgrades()
        .filter((upgradesForSkill) => upgradesForSkill.some(({ canPurchase }) => (
          canPurchase?.(character) ?? false
        )))
        .map((upgradesForSkill) => (
          <details key={upgradesForSkill[0].skill}>
            <summary className="summary--deca">
              {`${upgradesForSkill[0].skill} Upgrades`}
            </summary>
            <div className="cmp-upgrade-card__grid">
              {upgradesForSkill
                .filter(({ canPurchase }) => canPurchase?.(character) ?? false)
                .map(({ name, description, cost }) => (
                  <UpgradeCard key={name} name={name} description={description} cost={cost} />
                ))}
            </div>
          </details>
        ))}
    </details>

    <UpgradeCategory
      title="Health &amp; AP Upgrades"
      upgrades={healthUpgrades()}
      character={character}
    />
    <UpgradeCategory
      title="Damage Upgrades"
      upgrades={damageUpgrades()}
      character={character}
    />
    <UpgradeCategory
      title="Damage Type Upgrades"
      upgrades={damageTypeUpgrades()}
      character={character}
    />
    <UpgradeCategory
      title="Status Effect Upgrades"
      upgrades={statusEffectUpgrades()}
      character={character}
    />
    <UpgradeCategory
      title="Shield Upgrades"
      upgrades={shieldUpgrades()}
      character={character}
    />
    <UpgradeCategory
      title="Remove Vulnerability Upgrades"
      upgrades={removeVulnerabilityUpgrades()}
      character={character}
    />
    <UpgradeCategory
      title="Resistance Upgrades"
      upgrades={resistanceUpgrades()}
      character={character}
    />
    <UpgradeCategory
      title="Immunity Upgrades"
      upgrades={immunityUpgrades()}
      character={character}
    />
    <UpgradeCategory
      title="Healing Actions"
      upgrades={healingActions()}
      character={character}
    />
    <UpgradeCategory
      title="Status Effect Actions"
      upgrades={statusEffectActions()}
      character={character}
    />
    <UpgradeCategory
      title="Standard Bonus Actions"
      upgrades={bonusActions()}
      character={character}
    />
    <UpgradeCategory
      title="Healing Bonus Actions"
      upgrades={bonusHealingActions()}
      character={character}
    />
    <UpgradeCategory
      title="Status Effect Bonus Actions"
      upgrades={bonusStatusEffectActions()}
      character={character}
    />
    <UpgradeCategory
      title="Reactions"
      upgrades={reactionUpgrades()}
      character={character}
    />
  </>
);

export const renderCharacterSheet = (character: Character) => {
  const element = document.querySelector('#character-sheet');

  if (element) {
    const root = createRoot(element);
    root.render(<CharacterSheet character={character} />);
  }
};
