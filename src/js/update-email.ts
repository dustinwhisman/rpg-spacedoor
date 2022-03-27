import { reauthenticateUser } from './auth/reauthenticate-user';
import { updateUserEmail } from './auth/update-user-email';

(() => {
  let isLoggedIn = false;

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
      () => { revealElement('[data-update-email-form]'); },
      () => { revealElement('[data-reauthentication-failure]'); },
    );
  };

  const handleLoggedOutEvent = () => {
    revealElement('[data-logged-out]');
  };

  document.addEventListener('user-logged-in', handleLoggedInEvent);
  document.addEventListener('user-logged-out', handleLoggedOutEvent);

  document.addEventListener('submit', (event) => {
    const target = event.target as HTMLFormElement;
    if (target.matches('[data-update-email-form]')) {
      event.preventDefault();

      const emailElement = target.elements.namedItem('new-email') as HTMLInputElement;
      const newEmail = emailElement.value;
      updateUserEmail(
        newEmail,
        () => { revealElement('[data-success-message]'); },
        () => { revealElement('[data-failure-message]'); },
      );
    }
  });
})();
