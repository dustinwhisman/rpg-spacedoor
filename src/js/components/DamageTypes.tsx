import React from 'react';
import { createRoot } from 'react-dom/client';
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
    const root = createRoot(element);
    root.render(<DamageTypes />);
  }
};
