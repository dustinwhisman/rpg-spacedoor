import { getCharacter } from './characters/get-character';
import { renderCharacterSheet } from './components/character-sheet/CharacterSheet';
import { Character } from './types/types';

document.addEventListener('user-logged-in', async () => {
  const search = new URLSearchParams(window.location.search);
  const characterName = search.get('name');

  if (characterName) {
    const character = await getCharacter(characterName) as Character;

    if (character) {
      renderCharacterSheet(character);
    }
  }
});
