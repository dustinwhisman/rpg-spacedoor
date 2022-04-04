/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Character } from '../../types/types';
import { CharacterName } from './CharacterName';
import { CharacterStats } from './CharacterStats';
import { SecondaryStats } from './SecondaryStats';
import { CharacterSkills } from './CharacterSkills';

const CharacterSheet = ({ character }: { character: Character }) => (
  <>
    <CharacterName name={character.name} />
    <CharacterStats stats={character.stats} />
    <SecondaryStats {...character} />
    <CharacterSkills stats={character.stats} />
  </>
);

export const renderCharacterSheet = (character: Character) => {
  const element = document.querySelector('#character-sheet');

  if (element) {
    const root = createRoot(element);
    root.render(<CharacterSheet character={character} />);
  }
};
