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
    <details open>
      <summary>
        Available Upgrades
      </summary>
      <div className="cmp-stack">
        <h2>
          Stat Upgrades
        </h2>
        {statUpgrades()
          .filter((upgradesForStat) => upgradesForStat.some(({ canPurchase }) => (
            canPurchase?.(character) ?? false
          )))
          .map((upgradesForStat) => (
            <React.Fragment key={upgradesForStat[0].stat}>
              <h3>
                {`${upgradesForStat[0].stat} Upgrades`}
              </h3>
              <div className="cmp-upgrade-card__grid">
                {upgradesForStat
                  .filter(({ canPurchase }) => canPurchase?.(character) ?? false)
                  .map(({ name, description, cost }) => (
                    <UpgradeCard key={name} name={name} description={description} cost={cost} />
                  ))}
              </div>
            </React.Fragment>
          ))}

        <h2>
          Skill Upgrades
        </h2>
        {skillUpgrades()
          .filter((upgradesForSkill) => upgradesForSkill.some(({ canPurchase }) => (
            canPurchase?.(character) ?? false
          )))
          .map((upgradesForSkill) => (
            <React.Fragment key={upgradesForSkill[0].stat}>
              <h3>
                {`${upgradesForSkill[0].skill} Upgrades`}
              </h3>
              <div className="cmp-upgrade-card__grid">
                {upgradesForSkill
                  .filter(({ canPurchase }) => canPurchase?.(character) ?? false)
                  .map(({ name, description, cost }) => (
                    <UpgradeCard key={name} name={name} description={description} cost={cost} />
                  ))}
              </div>
            </React.Fragment>
          ))}

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
      </div>
    </details>
  </>
);

export const renderCharacterSheet = (character: Character) => {
  const element = document.querySelector('#character-sheet');

  if (element) {
    const root = createRoot(element);
    root.render(<CharacterSheet character={character} />);
  }
};
