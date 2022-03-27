import { auth } from './auth/auth';
import { signUserOut } from './auth/sign-user-out';
import { sendSignInLink } from './auth/send-sign-in-link';

(() => {
  const showEmailAddress = (details: { email: string }) => {
    const { email } = details;
    const emailPhrase = document.querySelector('[data-email-address]');

    if (emailPhrase) {
      emailPhrase.textContent = email;
    }
  };

  const showLoggedInState = () => {
    const loggedInBlocks = document.querySelectorAll('[data-logged-in]');
    loggedInBlocks.forEach((block) => {
      block.removeAttribute('hidden');
    });

    const loggedOutBlocks = document.querySelectorAll('[data-logged-out]');
    loggedOutBlocks.forEach((block) => {
      block.setAttribute('hidden', 'true');
    });
  };

  const showLoggedOutState = () => {
    const loggedInBlocks = document.querySelectorAll('[data-logged-in]');
    loggedInBlocks.forEach((block) => {
      block.setAttribute('hidden', 'true');
    });

    const loggedOutBlocks = document.querySelectorAll('[data-logged-out]');
    loggedOutBlocks.forEach((block) => {
      block.removeAttribute('hidden');
    });
  };

  const handleLoggedInEvent = (event: CustomEvent): void => {
    showEmailAddress(event.detail);
    showLoggedInState();
  };

  const handleLoggedOutEvent = () => {
    showLoggedOutState();
  };

  const handleLogoutError = () => {
    const errorMessage = document.querySelector('[data-logout-failure]');
    errorMessage?.removeAttribute('hidden');
  };

  const revealMessage = (selector: string) => {
    const element = document.querySelector(selector);
    element?.removeAttribute('hidden');
  };

  document.addEventListener('user-logged-in', handleLoggedInEvent as EventListener);
  document.addEventListener('user-logged-out', handleLoggedOutEvent);

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLButtonElement;
    if (target.matches('[data-logout-button]')) {
      signUserOut(handleLoggedOutEvent, handleLogoutError);
      return;
    }

    if (target.matches('[data-update-email-button]')) {
      const url = `${window.location.origin}/account/update-email`;
      const { email } = auth.currentUser ?? { email: '' };

      if (email) {
        sendSignInLink(
          url,
          email,
          () => { revealMessage('[data-update-email-success]'); },
          () => { revealMessage('[data-update-email-failure]'); },
        );
      }
    }

    if (target.matches('[data-delete-account-button]')) {
      const url = `${window.location.origin}/account/delete-account`;
      const { email } = auth.currentUser ?? { email: '' };

      if (email) {
        sendSignInLink(
          url,
          email,
          () => { revealMessage('[data-delete-account-success]'); },
          () => { revealMessage('[data-delete-account-failure]'); },
        );
      }
    }
  });
})();
