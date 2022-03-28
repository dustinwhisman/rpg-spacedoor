import React from 'react';
import { render } from 'react-dom';
import { damageTypes } from '../rules/damage-types';

const DamageTypes = () => (
  <ul>
    {damageTypes.map((type) => (
      <li key={type.name}>{type.name}</li>
    ))}
  </ul>
);

export const renderDamageTypes = () => {
  const element = document.querySelector('#damage-types');

  if (element) {
    render(<DamageTypes />, element);
  }
};
