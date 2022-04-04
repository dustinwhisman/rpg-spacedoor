/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Character } from '../../types/types';
import { CharacterName } from './CharacterName';
import { CharacterStatus } from './CharacterStatus';
import { CharacterStats } from './CharacterStats';
import { SecondaryStats } from './SecondaryStats';
import { CharacterSkills } from './CharacterSkills';
import { CharacterTraits } from './CharacterTraits';

const CharacterSheet = ({ character }: { character: Character }) => (
  <>
    <CharacterName name={character.name} />
    <CharacterStatus {...character} />
    <CharacterStats stats={character.stats} />
    <SecondaryStats {...character} />
    <CharacterSkills stats={character.stats} />
    <CharacterTraits {...character} />
  </>
);

export const renderCharacterSheet = (character: Character) => {
  const element = document.querySelector('#character-sheet');

  if (element) {
    const root = createRoot(element);
    root.render(<CharacterSheet character={character} />);
  }
};
