import React from 'react';
import { createRoot } from 'react-dom/client';
import { statUpgrades } from '../../rules/upgrades/stat-upgrades';
import { UpgradeCard } from './UpgradeCard';

const StatUpgrades = () => {
  const upgrades = statUpgrades();

  return (
    <>
      {upgrades.map((upgradesForStat) => (
        <React.Fragment key={upgradesForStat[0].stat}>
          <h2>
            {`${upgradesForStat[0].stat} Upgrades`}
          </h2>
          <div className="cmp-upgrade-card__grid">
            {upgradesForStat.map(({ name, description, cost }) => (
              <UpgradeCard key={name} name={name} description={description} cost={cost} />
            ))}
          </div>
        </React.Fragment>
      ))}
    </>
  );
};

export const renderStatUpgrades = () => {
  const element = document.querySelector('#stat-upgrades');

  if (element) {
    const root = createRoot(element);
    root.render(<StatUpgrades />);
  }
};
