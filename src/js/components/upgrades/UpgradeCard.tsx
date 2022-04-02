import React from 'react';

export const UpgradeCard = (
  { name, description, cost }: { name: string, description: string, cost: number },
) => (
  <article className="cmp-upgrade-card">
    <p className="cmp-upgrade-card__name">
      {name}
    </p>
    <p className="cmp-upgrade-card__description">
      {description}
    </p>
    <p className="cmp-upgrade-card__cost">
      <span className="cmp-upgrade-card__cost-label">
        Cost:
      </span>
      <strong>
        {` ${cost} XP`}
      </strong>
    </p>
  </article>
);
