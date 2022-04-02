import React from 'react';
import { createRoot } from 'react-dom/client';
import { healthUpgrades } from '../../rules/upgrades/health-upgrades';
import { UpgradeCard } from './UpgradeCard';

const HealthUpgrades = () => {
  const upgrades = healthUpgrades();

  return (
    <>
      <h2>
        Health Upgrades
      </h2>
      <div className="cmp-upgrade-card__grid">
        {upgrades.map(({ name, description, cost }) => (
          <UpgradeCard key={name} name={name} description={description} cost={cost} />
        ))}
      </div>
    </>
  );
};

export const renderHealthUpgrades = () => {
  const element = document.querySelector('#health-upgrades');

  if (element) {
    const root = createRoot(element);
    root.render(<HealthUpgrades />);
  }
};
