import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './auth';

export const observeAuthState = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const loggedInEvent = new CustomEvent('user-logged-in', { detail: user });
      document.dispatchEvent(loggedInEvent);
    } else {
      const loggedOutEvent = new CustomEvent('user-logged-out');
      document.dispatchEvent(loggedOutEvent);
    }
  });
};
