export const initializeDisclosureWidgets = () => {
  const buttons = document.querySelectorAll('[aria-controls]');
  if (buttons.length) {
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        const contentElement = document.querySelector(`#${button.getAttribute('aria-controls')}`);
        const helperTextElement = button.querySelector('[data-menu-text]');

        if (!contentElement || !helperTextElement) {
          return;
        }

        if (isExpanded) {
          contentElement.classList.remove('cmp-menu-link__content--visible');
          button.setAttribute('aria-expanded', 'false');
          helperTextElement.textContent = 'Open';
        } else {
          contentElement.classList.add('cmp-menu-link__content--visible');
          button.setAttribute('aria-expanded', 'true');
          helperTextElement.textContent = 'Close';
        }
      });
    });
  }
};
