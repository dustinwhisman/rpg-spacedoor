import { completeSignIn } from './auth/complete-sign-in';

const handleSuccess = () => {
  window.localStorage.removeItem('emailForSignIn');

  const successMessageContainer = document.querySelector('[data-success-message]');
  successMessageContainer?.removeAttribute('hidden');

  window.location.href = '/';
};

const handleError = () => {
  const errorMessageContainer = document.querySelector('[data-error-message]');
  errorMessageContainer?.removeAttribute('hidden');
};

const showConfirmationForm = () => {
  const waitMessage = document.querySelector('[data-wait-message]');
  const form = document.querySelector('[data-confirm-form]');
  waitMessage?.setAttribute('hidden', 'true');
  form?.removeAttribute('hidden');
};

const emailForSignIn = window.localStorage.getItem('emailForSignIn');
if (!emailForSignIn) {
  showConfirmationForm();

  document.addEventListener('submit', (event) => {
    const target = event.target as HTMLFormElement;
    if (target.matches('[data-confirm-form]')) {
      event.preventDefault();

      const emailElement = target.elements.namedItem('confirm-email') as HTMLInputElement;
      const email = emailElement.value;
      completeSignIn(email, handleSuccess, handleError);
    }
  });
} else {
  completeSignIn(emailForSignIn, handleSuccess, handleError);
}
