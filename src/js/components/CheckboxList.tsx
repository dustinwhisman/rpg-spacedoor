import React from 'react';
import { createRoot } from 'react-dom/client';
import { statusEffects } from '../rules/status-effects';
import { damageTypes } from '../rules/damage-types';

type Option = {
  label: string,
  value: string,
};

const CheckboxList = (
  { options, name }: { options: Option[], name: string },
) => (
  <>
    {options.map(({ label, value }) => (
      <div key={value}>
        <input id={`${name}-${value.toLowerCase().replace(' ', '')}`} type="checkbox" name={name} value={value} />
        <label htmlFor={`${name}-${value.toLowerCase().replace(' ', '')}`}>
          {label}
        </label>
      </div>
    ))}
  </>
);

export const renderEffectTypeChecklist = (
  fieldType: 'vulnerabilities' | 'resistances' | 'immunities',
) => {
  const statusEffectOptions = statusEffects.map(({ name }) => ({
    label: `${name} Status`,
    value: name,
  }));
  const damageTypeOptions = damageTypes.map(({ name }) => ({
    label: `${name} Damage`,
    value: name,
  }));
  const element = document.querySelector(`#${fieldType}`);

  if (element) {
    const root = createRoot(element);
    root.render(
      <>
        <CheckboxList name={fieldType} options={statusEffectOptions} />
        <CheckboxList name={fieldType} options={damageTypeOptions} />
      </>,
    );
  }
};
