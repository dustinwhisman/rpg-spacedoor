import { deleteUser } from 'firebase/auth';
import { auth } from './auth';

export const deleteAccount = (handleSuccess: () => void, handleError: () => void) => {
  const user = auth.currentUser;

  if (user) {
    deleteUser(user)
      .then(handleSuccess)
      .catch(handleError);
  }
};
