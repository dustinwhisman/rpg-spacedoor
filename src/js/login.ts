import { sendSignInLink } from './auth/send-sign-in-link';

const handleSuccess = (email: string) => {
  window.localStorage.setItem('emailForSignIn', email);

  const successMessageContainer = document.querySelector('[data-success-message]');
  successMessageContainer?.removeAttribute('hidden');
};

const handleError = () => {
  const errorMessageContainer = document.querySelector('[data-error-message]');
  errorMessageContainer?.removeAttribute('hidden');
};

document.addEventListener('submit', (event) => {
  const target = event.target as HTMLFormElement;
  if (target.matches('[data-sign-in-form]')) {
    event.preventDefault();

    const url = `${window.location.origin}/login/confirm`;
    const emailElement = target.elements.namedItem('sign-in-email') as HTMLInputElement;
    const email = emailElement.value;
    sendSignInLink(url, email, handleSuccess, handleError);
  }
});
