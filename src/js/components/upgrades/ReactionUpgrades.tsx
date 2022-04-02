import React from 'react';
import { createRoot } from 'react-dom/client';
import { reactionUpgrades } from '../../rules/upgrades/reaction-upgrades';
import { UpgradeCard } from './UpgradeCard';

const ReactionUpgrades = () => {
  const reactions = reactionUpgrades();

  return (
    <>
      <h2>
        Standard Reactions
      </h2>
      <div className="cmp-upgrade-card__grid">
        {reactions.map(({ name, description, cost }) => (
          <UpgradeCard key={name} name={name} description={description} cost={cost} />
        ))}
      </div>
    </>
  );
};

export const renderReactionUpgrades = () => {
  const element = document.querySelector('#reaction-upgrades');

  if (element) {
    const root = createRoot(element);
    root.render(<ReactionUpgrades />);
  }
};
