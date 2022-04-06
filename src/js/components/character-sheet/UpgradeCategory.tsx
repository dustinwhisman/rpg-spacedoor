import React from 'react';
import { Character, Upgrade } from '../../types/types';
import { UpgradeCard } from './UpgradeCard';

export const UpgradeCategory = (
  { title, upgrades, character }: { title: string, upgrades: Upgrade[], character: Character },
) => {
  const availableUpgrades = upgrades
    .filter(({ canPurchase }) => canPurchase?.(character) ?? false);

  if (!availableUpgrades.length) {
    return null;
  }

  return (
    <details>
      <summary>
        {title}
      </summary>
      <div className="cmp-upgrade-card__grid">
        {availableUpgrades.map(({ name, description, cost }) => (
          <UpgradeCard key={name} name={name} description={description} cost={cost} />
        ))}
      </div>
    </details>
  );
};
