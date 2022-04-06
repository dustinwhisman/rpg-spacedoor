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

        <h3>
          Health &amp; AP Upgrades
        </h3>
        <div className="cmp-upgrade-card__grid">
          {healthUpgrades()
            .filter(({ canPurchase }) => canPurchase?.(character) ?? false)
            .map(({ name, description, cost }) => (
              <UpgradeCard key={name} name={name} description={description} cost={cost} />
            ))}
        </div>

        <h3>
          Damage Upgrades
        </h3>
        <div className="cmp-upgrade-card__grid">
          {damageUpgrades()
            .filter(({ canPurchase }) => canPurchase?.(character) ?? false)
            .map(({ name, description, cost }) => (
              <UpgradeCard key={name} name={name} description={description} cost={cost} />
            ))}
        </div>

        <h3>
          Damage Type Upgrades
        </h3>
        <div className="cmp-upgrade-card__grid">
          {damageTypeUpgrades()
            .filter(({ canPurchase }) => canPurchase?.(character) ?? false)
            .map(({ name, description, cost }) => (
              <UpgradeCard key={name} name={name} description={description} cost={cost} />
            ))}
        </div>

        <h3>
          Status Effect Upgrades
        </h3>
        <div className="cmp-upgrade-card__grid">
          {statusEffectUpgrades()
            .filter(({ canPurchase }) => canPurchase?.(character) ?? false)
            .map(({ name, description, cost }) => (
              <UpgradeCard key={name} name={name} description={description} cost={cost} />
            ))}
        </div>

        <h3>
          Shield Upgrades
        </h3>
        <div className="cmp-upgrade-card__grid">
          {shieldUpgrades()
            .filter(({ canPurchase }) => canPurchase?.(character) ?? false)
            .map(({ name, description, cost }) => (
              <UpgradeCard key={name} name={name} description={description} cost={cost} />
            ))}
        </div>

        <h3>
          Remove Vulnerability Upgrades
        </h3>
        <div className="cmp-upgrade-card__grid">
          {removeVulnerabilityUpgrades()
            .filter(({ canPurchase }) => canPurchase?.(character) ?? false)
            .map(({ name, description, cost }) => (
              <UpgradeCard key={name} name={name} description={description} cost={cost} />
            ))}
        </div>

        <h3>
          Resistance Upgrades
        </h3>
        <div className="cmp-upgrade-card__grid">
          {resistanceUpgrades()
            .filter(({ canPurchase }) => canPurchase?.(character) ?? false)
            .map(({ name, description, cost }) => (
              <UpgradeCard key={name} name={name} description={description} cost={cost} />
            ))}
        </div>

        <h3>
          Immunity Upgrades
        </h3>
        <div className="cmp-upgrade-card__grid">
          {immunityUpgrades()
            .filter(({ canPurchase }) => canPurchase?.(character) ?? false)
            .map(({ name, description, cost }) => (
              <UpgradeCard key={name} name={name} description={description} cost={cost} />
            ))}
        </div>

        <h3>
          Healing Actions
        </h3>
        <div className="cmp-upgrade-card__grid">
          {healingActions()
            .filter(({ canPurchase }) => canPurchase?.(character) ?? false)
            .map(({ name, description, cost }) => (
              <UpgradeCard key={name} name={name} description={description} cost={cost} />
            ))}
        </div>

        <h3>
          Status Effect Actions
        </h3>
        <div className="cmp-upgrade-card__grid">
          {statusEffectActions()
            .filter(({ canPurchase }) => canPurchase?.(character) ?? false)
            .map(({ name, description, cost }) => (
              <UpgradeCard key={name} name={name} description={description} cost={cost} />
            ))}
        </div>

        <h3>
          Standard Bonus Actions
        </h3>
        <div className="cmp-upgrade-card__grid">
          {bonusActions()
            .filter(({ canPurchase }) => canPurchase?.(character) ?? false)
            .map(({ name, description, cost }) => (
              <UpgradeCard key={name} name={name} description={description} cost={cost} />
            ))}
        </div>

        <h3>
          Healing Bonus Actions
        </h3>
        <div className="cmp-upgrade-card__grid">
          {bonusHealingActions()
            .filter(({ canPurchase }) => canPurchase?.(character) ?? false)
            .map(({ name, description, cost }) => (
              <UpgradeCard key={name} name={name} description={description} cost={cost} />
            ))}
        </div>

        <h3>
          Status Effect Bonus Actions
        </h3>
        <div className="cmp-upgrade-card__grid">
          {bonusStatusEffectActions()
            .filter(({ canPurchase }) => canPurchase?.(character) ?? false)
            .map(({ name, description, cost }) => (
              <UpgradeCard key={name} name={name} description={description} cost={cost} />
            ))}
        </div>

        <h3>
          Reactions
        </h3>
        <div className="cmp-upgrade-card__grid">
          {reactionUpgrades()
            .filter(({ canPurchase }) => canPurchase?.(character) ?? false)
            .map(({ name, description, cost }) => (
              <UpgradeCard key={name} name={name} description={description} cost={cost} />
            ))}
        </div>
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
