import { sendSignInLinkToEmail } from 'firebase/auth';
import { auth } from './auth.js';

export const sendSignInLink = (
  url: string,
  email: string,
  handleSuccess: (email: string) => void,
  handleError: () => void,
) => {
  sendSignInLinkToEmail(auth, email, {
    url,
    handleCodeInApp: true,
  })
    .then(() => handleSuccess(email))
    .catch(handleError);
};
