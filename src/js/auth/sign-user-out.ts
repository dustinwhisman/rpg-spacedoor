import { signOut } from 'firebase/auth';
import { auth } from './auth.js';

export const signUserOut = (handleSuccess: () => void, handleError: () => void) => {
  signOut(auth)
    .then(handleSuccess)
    .catch(handleError);
};
