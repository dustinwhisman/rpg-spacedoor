import React from 'react';
import { createRoot } from 'react-dom/client';
import { Character } from '../../types/types';
import { CharacterName } from './CharacterName';

const CharacterSheet = ({ character }: { character: Character }) => (
  <CharacterName name={character.name} />
);

export const renderCharacterSheet = (character: Character) => {
  const element = document.querySelector('#character-sheet');

  if (element) {
    const root = createRoot(element);
    root.render(<CharacterSheet character={character} />);
  }
};
