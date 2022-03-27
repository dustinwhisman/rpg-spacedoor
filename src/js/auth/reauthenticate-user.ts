import { reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from './auth.js';

export const reauthenticateUser = (handleSuccess: () => void, handleError: () => void) => {
  const user = auth.currentUser;

  if (user && user.email) {
    const credential = EmailAuthProvider.credentialWithLink(user.email, window.location.href);
    reauthenticateWithCredential(user, credential)
      .then(handleSuccess)
      .catch(handleError);
  }
};
