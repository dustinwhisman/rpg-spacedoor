import React, { FormEvent, useState } from 'react';
import { Character } from '../../types/types';
import { deleteCharacter } from '../../characters/delete-character';

const loadingStates = {
  EMPTY: 'empty',
  INVALID: 'invalid',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

export const DeleteCharacter = ({ character }: { character: Character }) => {
  const [loadingState, setLoadingState] = useState(loadingStates.EMPTY);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const input = target.elements.namedItem('character-name') as HTMLInputElement;
    const { value } = input;

    if (value === character.name) {
      setLoadingState(loadingStates.LOADING);
      // eslint-disable-next-line no-underscore-dangle
      const characterId = await deleteCharacter(character._id);

      if (characterId == null) {
        setLoadingState(loadingStates.ERROR);
      } else {
        setLoadingState(loadingStates.SUCCESS);
        window.location.href = '/characters';
      }
    } else {
      setLoadingState(loadingStates.INVALID);
    }
  };

  return (
    <>
      <h2>
        Delete Character
      </h2>
      <p>
        {`Type "${character.name}" to confirm that you want to delete this character.`}
      </p>
      {loadingState === loadingStates.INVALID && (
        <p className="cmp-error-message">
          {`Your text does not match "${character.name}".`}
        </p>
      )}
      {loadingState === loadingStates.SUCCESS && (
        <p>
          {`RIP: ${character.name}`}
        </p>
      )}
      <form onSubmit={handleSubmit} className="cmp-stack">
        <div>
          <label htmlFor="character-name">
            Character Name
          </label>
          <input id="character-name" type="text" name="character-name" />
        </div>
        <div>
          <button type="submit" className="cmp-danger-button" disabled={loadingState === loadingStates.LOADING}>
            {loadingState === loadingStates.LOADING ? 'Deleting...' : 'Delete Character'}
          </button>
        </div>
      </form>
    </>
  );
};
