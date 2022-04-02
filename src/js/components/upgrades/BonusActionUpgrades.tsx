import React from 'react';
import { createRoot } from 'react-dom/client';
import { bonusActions, bonusHealingActions, bonusStatusEffectActions } from '../../rules/upgrades/bonus-action-upgrades';
import { UpgradeCard } from './UpgradeCard';

const BonusActionUpgrades = () => {
  const bonuses = bonusActions();
  const bonusHealing = bonusHealingActions();
  const bonusStatusEffect = bonusStatusEffectActions();

  return (
    <>
      <h2>
        Standard Bonus Actions
      </h2>
      <div className="cmp-upgrade-card__grid">
        {bonuses.map(({ name, description, cost }) => (
          <UpgradeCard key={name} name={name} description={description} cost={cost} />
        ))}
      </div>

      <h2>
        Upgraded Healing Actions
      </h2>
      <div className="cmp-upgrade-card__grid">
        {bonusHealing.map(({ name, description, cost }) => (
          <UpgradeCard key={name} name={name} description={description} cost={cost} />
        ))}
      </div>

      <h2>
        Upgraded Status Effect Actions
      </h2>
      <div className="cmp-upgrade-card__grid">
        {bonusStatusEffect.map(({ name, description, cost }) => (
          <UpgradeCard key={name} name={name} description={description} cost={cost} />
        ))}
      </div>
    </>
  );
};

export const renderBonusActionUpgrades = () => {
  const element = document.querySelector('#bonus-action-upgrades');

  if (element) {
    const root = createRoot(element);
    root.render(<BonusActionUpgrades />);
  }
};
