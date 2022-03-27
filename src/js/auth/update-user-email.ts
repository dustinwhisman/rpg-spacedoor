import { updateEmail } from 'firebase/auth';
import { auth } from './auth.js';

export const updateUserEmail = (
  newEmail: string,
  handleSuccess: () => void,
  handleError: () => void,
) => {
  const user = auth.currentUser;

  if (user) {
    updateEmail(user, newEmail)
      .then(handleSuccess)
      .catch(handleError);
  }
};
