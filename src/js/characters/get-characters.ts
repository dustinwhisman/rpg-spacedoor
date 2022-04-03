import { auth } from '../auth/auth';
import { fetcher } from '../utilities/fetcher';

export const getCharacters = async () => {
  const { uid } = auth.currentUser ?? {};
  if (!uid) {
    return [];
  }

  const query = `
    query {
      charactersByGame(uid: "${uid}", game: "Spacedoor!") {
        data {
          _id
          name
        }
      }
    }
  `;

  const response = await fetcher('/api/graphql', {
    method: 'POST',
    body: JSON.stringify({ query }),
  });

  const { result } = await response.json();
  const characters = result.data.charactersByGame.data;

  return characters;
};
