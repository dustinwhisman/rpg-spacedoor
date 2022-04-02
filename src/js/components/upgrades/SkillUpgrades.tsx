import React from 'react';
import { createRoot } from 'react-dom/client';
import { skillUpgrades } from '../../rules/upgrades/skill-upgrades';
import { UpgradeCard } from './UpgradeCard';

const SkillUpgrades = () => {
  const upgrades = skillUpgrades();

  return (
    <>
      {upgrades.map((upgradesForSkill) => (
        <React.Fragment key={upgradesForSkill[0].skill}>
          <h2>
            {`${upgradesForSkill[0].skill} Upgrades`}
          </h2>
          <div className="cmp-upgrade-card__grid">
            {upgradesForSkill.map(({ name, description, cost }) => (
              <UpgradeCard key={name} name={name} description={description} cost={cost} />
            ))}
          </div>
        </React.Fragment>
      ))}
    </>
  );
};

export const renderSkillUpgrades = () => {
  const element = document.querySelector('#skill-upgrades');

  if (element) {
    const root = createRoot(element);
    root.render(<SkillUpgrades />);
  }
};
