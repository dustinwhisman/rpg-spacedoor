import React from 'react';
import { skillUpgrades } from '../../rules/upgrades';
import { Character } from '../../types/types';
import { UpgradeCard } from './UpgradeCard';

export const SkillUpgrades = ({ characterData }: { characterData: Character }) => {
  const upgrades = skillUpgrades();
  const skillsWithUpgrades = upgrades
    .filter((upgradesForSkill) => upgradesForSkill.some(({ canPurchase, cost }) => (
      canPurchase?.(characterData) && characterData.experiencePoints >= cost
    )));

  if (!skillsWithUpgrades.length) {
    return (
      <>
        <h3>
          Skill Upgrades
        </h3>
        <p>
          You don&apos;t qualify for any Skill Upgrades yet.
        </p>
      </>
    );
  }

  return (
    <details>
      <summary>
        Skill Upgrades
      </summary>
      {skillsWithUpgrades
        .map((upgradesForSkill) => (
          <details key={upgradesForSkill[0].skill}>
            <summary className="summary-deca">
              {`${upgradesForSkill[0].skill} Upgrades`}
            </summary>
            <div className="cmp-upgrade-card__grid">
              {upgradesForSkill
                .filter(({ canPurchase, cost }) => (
                  canPurchase?.(characterData) && characterData.experiencePoints >= cost
                ))
                .map(({ name, description, cost }) => (
                  <UpgradeCard key={name} name={name} description={description} cost={cost} />
                ))}
            </div>
          </details>
        ))}
    </details>
  );
};
