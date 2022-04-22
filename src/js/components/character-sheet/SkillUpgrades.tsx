import React, { Dispatch, SetStateAction } from 'react';
import { skillUpgrades } from '../../rules/upgrades';
import { Character } from '../../types/types';
import { UpgradeCard } from './UpgradeCard';

export const SkillUpgrades = ({
  characterData,
  update,
}: {
  characterData: Character,
  update: Dispatch<SetStateAction<Character>>,
}) => {
  const upgrades = skillUpgrades();
  const skillsWithUpgrades = upgrades
    .filter((upgradesForSkill) => upgradesForSkill.some(({ canPurchase, cost }) => (
      canPurchase?.(characterData) && characterData.experiencePoints >= cost
    )));

  if (!skillsWithUpgrades.length) {
    return null;
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
                .map(({
                  name, description, cost, type, onPurchase,
                }) => (
                  <UpgradeCard
                    key={name}
                    character={characterData}
                    name={name}
                    description={description}
                    cost={cost}
                    type={type}
                    onPurchase={onPurchase}
                    update={update}
                  />
                ))}
            </div>
          </details>
        ))}
    </details>
  );
};
