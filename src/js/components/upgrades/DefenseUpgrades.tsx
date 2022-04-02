import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  shieldUpgrades, removeVulnerabilityUpgrades, resistanceUpgrades, immunityUpgrades,
} from '../../rules/upgrades/defense-upgrades';
import { UpgradeCard } from './UpgradeCard';

const DefenseUpgrades = () => {
  const shields = shieldUpgrades();
  const vulnerabilities = removeVulnerabilityUpgrades();
  const resistances = resistanceUpgrades();
  const immunities = immunityUpgrades();

  return (
    <>
      <h2>
        Shield Upgrades
      </h2>
      <div className="cmp-upgrade-card__grid">
        {shields.map(({ name, description, cost }) => (
          <UpgradeCard key={name} name={name} description={description} cost={cost} />
        ))}
      </div>

      <h2>
        Remove Vulnerabilities
      </h2>
      <div className="cmp-upgrade-card__grid">
        {vulnerabilities.map(({ name, description, cost }) => (
          <UpgradeCard key={name} name={name} description={description} cost={cost} />
        ))}
      </div>

      <h2>
        Resistances
      </h2>
      <div className="cmp-upgrade-card__grid">
        {resistances.map(({ name, description, cost }) => (
          <UpgradeCard key={name} name={name} description={description} cost={cost} />
        ))}
      </div>

      <h2>
        Immunities
      </h2>
      <div className="cmp-upgrade-card__grid">
        {immunities.map(({ name, description, cost }) => (
          <UpgradeCard key={name} name={name} description={description} cost={cost} />
        ))}
      </div>
    </>
  );
};

export const renderDefenseUpgrades = () => {
  const element = document.querySelector('#defense-upgrades');

  if (element) {
    const root = createRoot(element);
    root.render(<DefenseUpgrades />);
  }
};
