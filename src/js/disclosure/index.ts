type DisclosureElements = {
  isExpanded: boolean
  contentElement: Element | null
};

export const getDisclosureButtons = (selector: string): NodeListOf<Element> => (
  document.querySelectorAll(selector)
);

export const getDisclosureElements = (button: Element | null): DisclosureElements => {
  if (!button) {
    return {
      isExpanded: false,
      contentElement: null,
    };
  }

  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  const contentElement = document.querySelector(`#${button.getAttribute('aria-controls')}`);

  return {
    isExpanded,
    contentElement,
  };
};

export const closeMenu = (button: Element | null, contentElement: Element | null): void => {
  contentElement?.classList.remove('cmp-menu-link__content--visible');
  button?.setAttribute('aria-expanded', 'false');

  const helperTextElement = button?.querySelector('[data-menu-text]');
  if (helperTextElement) {
    helperTextElement.textContent = 'Open';
  }
};

export const openMenu = (button: Element | null, contentElement: Element | null): void => {
  contentElement?.classList.add('cmp-menu-link__content--visible');
  button?.setAttribute('aria-expanded', 'true');

  const helperTextElement = button?.querySelector('[data-menu-text]');
  if (helperTextElement) {
    helperTextElement.textContent = 'Close';
  }
};

export const initializeDisclosureWidgets = () => {
  const buttons = getDisclosureButtons('[aria-controls]');
  if (buttons.length) {
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const { isExpanded, contentElement } = getDisclosureElements(button);

        if (isExpanded) {
          closeMenu(button, contentElement);
        } else {
          openMenu(button, contentElement);
        }
      });
    });
  }
};
