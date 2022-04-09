import React from 'react';
import { Character, Upgrade } from '../../types/types';
import { UpgradeCard } from './UpgradeCard';

export const UpgradeCategory = (
  { title, upgrades, character }: { title: string, upgrades: Upgrade[], character: Character },
) => {
  const availableUpgrades = upgrades
    .filter(({ canPurchase, cost }) => (
      canPurchase?.(character) && character.experiencePoints >= cost
    ));

  if (!availableUpgrades.length) {
    return (
      <>
        <h3>
          {title}
        </h3>
        <p>
          {`You don't qualify for any ${title} yet.`}
        </p>
      </>
    );
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
