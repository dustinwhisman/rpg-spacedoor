import { signOut } from 'firebase/auth';
import { auth } from './auth';

export const signUserOut = (handleSuccess: () => void, handleError: () => void) => {
  signOut(auth)
    .then(handleSuccess)
    .catch(handleError);
};
