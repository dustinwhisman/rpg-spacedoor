export const updateAuthState = (isLoggedIn: boolean): void => {
  const element = document.querySelector('[data-auth-state]');
  if (!element) {
    return;
  }

  if (isLoggedIn) {
    element.setAttribute('data-auth-state', 'logged-in');
    localStorage.setItem('is-logged-in', 'true');
  } else {
    element.setAttribute('data-auth-state', 'logged-out');
    localStorage.removeItem('is-logged-in');
  }
};
