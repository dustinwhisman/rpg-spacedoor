import React from 'react';
import { createRoot } from 'react-dom/client';
import { damageTypeUpgrades, damageUpgrades, statusEffectUpgrades } from '../../rules/upgrades/offense-upgrades';
import { UpgradeCard } from './UpgradeCard';

const OffenseUpgrades = () => {
  const damage = damageUpgrades();
  const damageTypes = damageTypeUpgrades();
  const statusEffects = statusEffectUpgrades();

  return (
    <>
      <h2>
        Damage Upgrades
      </h2>
      <div className="cmp-upgrade-card__grid">
        {damage.map(({ name, description, cost }) => (
          <UpgradeCard key={name} name={name} description={description} cost={cost} />
        ))}
      </div>

      <h2>
        Damage Type Upgrades
      </h2>
      <div className="cmp-upgrade-card__grid">
        {damageTypes.map(({ name, description, cost }) => (
          <UpgradeCard key={name} name={name} description={description} cost={cost} />
        ))}
      </div>

      <h2>
        Status Effect Upgrades
      </h2>
      <div className="cmp-upgrade-card__grid">
        {statusEffects.map(({ name, description, cost }) => (
          <UpgradeCard key={name} name={name} description={description} cost={cost} />
        ))}
      </div>
    </>
  );
};

export const renderOffenseUpgrades = () => {
  const element = document.querySelector('#offense-upgrades');

  if (element) {
    const root = createRoot(element);
    root.render(<OffenseUpgrades />);
  }
};
