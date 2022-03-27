import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { auth } from './auth.js';

export const completeSignIn = (
  email: string,
  handleSuccess: () => void,
  handleError: () => void,
): void => {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    signInWithEmailLink(auth, email, window.location.href)
      .then(handleSuccess)
      .catch(handleError);
  } else {
    handleError();
  }
};
