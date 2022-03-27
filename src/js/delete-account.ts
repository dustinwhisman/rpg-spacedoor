import { reauthenticateUser } from './auth/reauthenticate-user';
import { deleteAccount } from './auth/delete-account';

(() => {
  let isLoggedIn = false;
  let isDeleted = false;

  const revealElement = (selector: string) => {
    const element = document.querySelector(selector);
    element?.removeAttribute('hidden');
  };

  const handleLoggedInEvent = () => {
    // prevent reauthentication from triggering this again
    if (isLoggedIn) {
      return;
    }

    isLoggedIn = true;

    reauthenticateUser(
      () => { revealElement('[data-delete-account]'); },
      () => { revealElement('[data-reauthentication-failure]'); },
    );
  };

  const handleLoggedOutEvent = () => {
    if (!isDeleted) {
      revealElement('[data-logged-out]');
    }
  };

  document.addEventListener('user-logged-in', handleLoggedInEvent);
  document.addEventListener('user-logged-out', handleLoggedOutEvent);

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLButtonElement;
    if (target.matches('[data-delete-account-button]')) {
      isDeleted = true;
      deleteAccount(
        () => { revealElement('[data-success-message]'); },
        () => { revealElement('[data-failure-message]'); },
      );
    }
  });
})();
