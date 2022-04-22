import React from 'react';
import { Upgrade } from '../../types/types';

export const Actions = ({ upgrades, actionType }: { upgrades: Upgrade[], actionType: 'action' | 'bonus-action' | 'reaction' }) => {
  const actions = upgrades.filter(({ type }) => type === actionType);

  if (!actions.length) {
    return null;
  }

  return (
    <>
      <h2>
        {actionType === 'action' && 'Actions'}
        {actionType === 'bonus-action' && 'Bonus Actions'}
        {actionType === 'reaction' && 'Reactions'}
      </h2>
      <dl className="cmp-stack">
        {actions.map(({ _id, name, description }) => (
          <div key={_id}>
            <dt>{name}</dt>
            <dd>{description}</dd>
          </div>
        ))}
      </dl>
    </>
  );
};
