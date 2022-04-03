import { auth } from '../auth/auth';

const fetchOptions = async (options: RequestInit) => {
  const updatedOptions = { ...options };
  const user = auth.currentUser;

  if (user) {
    const accessToken = await user.getIdToken();
    updatedOptions.headers = {
      ...updatedOptions.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return updatedOptions;
};

export const fetcher = async (url: string, options = {}) => fetch(url, await fetchOptions(options));
