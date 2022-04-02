import React from 'react';
import { createRoot } from 'react-dom/client';
import { shieldUpgrades } from '../../rules/upgrades/shield-upgrades';
import { UpgradeCard } from './UpgradeCard';

const ShieldUpgrades = () => {
  const upgrades = shieldUpgrades();

  return (
    <>
      <h2>
        Shield Upgrades
      </h2>
      <div className="cmp-upgrade-card__grid">
        {upgrades.map(({ name, description, cost }) => (
          <UpgradeCard key={name} name={name} description={description} cost={cost} />
        ))}
      </div>
    </>
  );
};

export const renderShieldUpgrades = () => {
  const element = document.querySelector('#shield-upgrades');

  if (element) {
    const root = createRoot(element);
    root.render(<ShieldUpgrades />);
  }
};
