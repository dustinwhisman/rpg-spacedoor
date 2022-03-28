import React from 'react';
import { render } from 'react-dom';
import { statusEffects } from '../rules/status-effects';

const StatusEffects = () => (
  <dl>
    {statusEffects.map((effect) => (
      <React.Fragment key={effect.name}>
        <dt>{effect.name}</dt>
        <dd>{effect.description}</dd>
      </React.Fragment>
    ))}
  </dl>
);

export const renderStatusEffects = () => {
  const element = document.querySelector('#status-effects');

  if (element) {
    render(<StatusEffects />, element);
  }
};
