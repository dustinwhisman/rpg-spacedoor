import React, {
  Dispatch, FormEvent, SetStateAction, useState,
} from 'react';
import { updateBasicValue } from '../../characters/update-character';
import { Character } from '../../types/types';

export const UpdateStatus = (
  {
    id,
    statName,
    value,
    maxValue,
    update,
  }: {
    id: string,
    statName: string,
    value: number,
    maxValue: number,
    update: Dispatch<SetStateAction<Character>>,
  },
) => {
  const [trackedValue, setTrackedValue] = useState(value);

  const handleSubmit = async (event: FormEvent, val: number) => {
    event.preventDefault();
    const updatedCharacter = await updateBasicValue(id, statName, val);

    if (updatedCharacter) {
      update(updatedCharacter);
    }
  };

  const handleChange = (event: FormEvent) => {
    const element = event.target as HTMLInputElement;
    const numericValue = Number.parseInt(element?.value, 10);
    if (Number.isNaN(numericValue)) {
      return;
    }

    if (numericValue <= 0) {
      setTrackedValue(0);
    } else if (numericValue >= maxValue) {
      setTrackedValue(maxValue);
    } else {
      setTrackedValue(numericValue);
    }
  };

  return (
    <form className="util-display-flex" onSubmit={(event) => handleSubmit(event, trackedValue)}>
      <div>
        <label htmlFor={`update-${statName}`} className="util-visually-hidden">{statName}</label>
        <input id={`update-${statName}`} type="text" className="cmp-mini-input" onChange={handleChange} />
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};
