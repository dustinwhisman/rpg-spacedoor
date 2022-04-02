import React from 'react';
import { createRoot } from 'react-dom/client';
import { healingActions, statusEffectActions } from '../../rules/upgrades/action-upgrades';
import { UpgradeCard } from './UpgradeCard';

const ActionUpgrades = () => {
  const healing = healingActions();
  const statusEffects = statusEffectActions();

  return (
    <>
      <h2>
        Healing Actions
      </h2>
      <div className="cmp-upgrade-card__grid">
        {healing.map(({ name, description, cost }) => (
          <UpgradeCard key={name} name={name} description={description} cost={cost} />
        ))}
      </div>

      <h2>
        Status Effect Actions
      </h2>
      <div className="cmp-upgrade-card__grid">
        {statusEffects.map(({ name, description, cost }) => (
          <UpgradeCard key={name} name={name} description={description} cost={cost} />
        ))}
      </div>
    </>
  );
};

export const renderActionUpgrades = () => {
  const element = document.querySelector('#action-upgrades');

  if (element) {
    const root = createRoot(element);
    root.render(<ActionUpgrades />);
  }
};
