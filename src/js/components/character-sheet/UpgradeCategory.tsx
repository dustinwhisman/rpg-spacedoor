import React, { Dispatch, SetStateAction } from 'react';
import { Character, Upgrade } from '../../types/types';
import { UpgradeCard } from './UpgradeCard';

export const UpgradeCategory = (
  {
    title,
    upgrades,
    character,
    update,
  }: {
    title: string,
    upgrades: Upgrade[],
    character: Character,
    update: Dispatch<SetStateAction<Character>>,
  },
) => {
  const availableUpgrades = upgrades
    .filter(({ canPurchase, cost }) => (
      canPurchase?.(character) && character.experiencePoints >= cost
    ));

  if (!availableUpgrades.length) {
    return null;
  }

  return (
    <details>
      <summary>
        {title}
      </summary>
      <div className="cmp-upgrade-card__grid">
        {availableUpgrades.map(({
          name, description, cost, type, onPurchase,
        }) => (
          <UpgradeCard
            key={name}
            character={character}
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
  );
};
