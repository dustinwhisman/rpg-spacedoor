import React from 'react';

export const UpgradeCard = (
  { name, description, cost }: { name: string, description: string, cost: number },
) => (
  <article className={`cmp-upgrade-card cmp-upgrade-card--rank-${cost > 5 ? 6 : cost}`}>
    <p className="cmp-upgrade-card__name">
      {name}
    </p>
    <p className="cmp-upgrade-card__description">
      {description}
    </p>
    <p className="cmp-upgrade-card__cost">
      {`${cost} XP`}
    </p>
  </article>
);
