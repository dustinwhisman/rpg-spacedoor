import { auth } from '../auth/auth';
import { fetcher } from '../utilities/fetcher';

export const deleteCharacter = async (id: string): Promise<string | null> => {
  const { uid } = auth.currentUser ?? {};
  if (!uid) {
    return null;
  }

  const query = `
    mutation {
      deleteCharacter(id: ${JSON.stringify(id)}) {
        _id
      }
    }
  `;

  const response = await fetcher('/api/graphql', {
    method: 'POST',
    body: JSON.stringify({ query }),
  });

  const { result } = await response.json();
  // eslint-disable-next-line no-underscore-dangle
  const characterId = result.data.deleteCharacter._id;

  return characterId;
};
