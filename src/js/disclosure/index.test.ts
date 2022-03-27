import {
  getDisclosureButtons, getDisclosureElements, closeMenu, openMenu, initializeDisclosureWidgets,
} from '.';

describe('getDisclosureButtons', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button aria-controls="one">One</button>
      <button aria-controls="two">Two</button>
      <button aria-contorls="three">Three</button>
      <button>Four</button>
    `;
  });

  it('gets the correct buttons', () => {
    const buttons = getDisclosureButtons('[aria-controls]');

    expect(buttons.length).toEqual(2);
    expect(buttons[0].getAttribute('aria-controls')).toEqual('one');
    expect(buttons[1].getAttribute('aria-controls')).toEqual('two');
  });
});

describe('getDisclosureElements', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button aria-controls="content" aria-expanded="false">
        <span class="util-visually-hidden" data-menu-text>Open</span>
        Menu
      </button>
      <button aria-controls="content-missing" aria-expanded="true">
        <span class="util-visually-hidden" data-menu-text>Open</span>
        Menu
      </button>
      <div id="content">
        Content
      </div>
    `;
  });

  it('returns the correct elements and attributes', () => {
    const button = document.querySelector('[aria-controls="content"]');

    const { isExpanded, contentElement } = getDisclosureElements(button);
    expect(isExpanded).toEqual(false);
    expect(contentElement).not.toBe(null);
  });

  it('returns correctly when button is not found', () => {
    const button = document.querySelector('[aria-controls="contents"]');

    const { isExpanded, contentElement } = getDisclosureElements(button);
    expect(isExpanded).toEqual(false);
    expect(contentElement).toBe(null);
  });

  it('returns correctly when content is not found', () => {
    const button = document.querySelector('[aria-controls="content-missing"]');

    const { isExpanded, contentElement } = getDisclosureElements(button);
    expect(isExpanded).toEqual(true);
    expect(contentElement).toBe(null);
  });
});

describe('closeMenu', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button aria-controls="content" aria-expanded="true">
        <span class="util-visually-hidden" data-menu-text>Close</span>
        Menu
      </button>
      <div id="content" class="cmp-menu-link__content--visible">
      Content
      </div>
    `;
  });

  it('applies the correct changes to close the menu', () => {
    const button = document.querySelector('[aria-controls="content"]');

    const { contentElement } = getDisclosureElements(button);
    closeMenu(button, contentElement);

    expect(contentElement?.classList).not.toContain('cmp-menu-link__content--visible');
    expect(button?.getAttribute('aria-expanded')).toEqual('false');
    expect(document.querySelector('[data-menu-text]')?.textContent).toEqual('Open');
  });
});

describe('openMenu', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button aria-controls="content" aria-expanded="false">
        <span class="util-visually-hidden" data-menu-text>Open</span>
        Menu
      </button>
      <div id="content">
        Content
      </div>
    `;
  });

  it('applies the correct changes to open the menu', () => {
    const button = document.querySelector('[aria-controls="content"]');

    const { contentElement } = getDisclosureElements(button);
    openMenu(button, contentElement);

    expect(contentElement?.classList).toContain('cmp-menu-link__content--visible');
    expect(button?.getAttribute('aria-expanded')).toEqual('true');
    expect(document.querySelector('[data-menu-text]')?.textContent).toEqual('Close');
  });
});

describe('initializeDisclosureWidgets', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button aria-controls="content" aria-expanded="false">
        <span class="util-visually-hidden" data-menu-text>Open</span>
        Menu
      </button>
      <button aria-controls="content-two" aria-expanded="true">
        <span class="util-visually-hidden" data-menu-text>Close</span>
        Menu
      </button>
      <button aria-expanded="true">
        <span class="util-visually-hidden" data-menu-text>Close</span>
        Menu
      </button>
      <div id="content">
        Content
      </div>
      <div id="content-two" class="cmp-menu-link__content--visible">
        Content
      </div>
    `;
  });

  it('adds event listeners to the right elements', () => {
    initializeDisclosureWidgets();

    const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('[aria-controls]');

    expect(buttons.length).toEqual(2);

    buttons[0].click();

    expect(document.querySelector('#content')?.classList).toContain('cmp-menu-link__content--visible');
    expect(buttons[0].getAttribute('aria-expanded')).toEqual('true');
    expect(buttons[0].querySelector('[data-menu-text]')?.textContent).toEqual('Close');

    buttons[1].click();

    expect(document.querySelector('#content-two')?.classList).not.toContain('cmp-menu-link__content--visible');
    expect(buttons[1].getAttribute('aria-expanded')).toEqual('false');
    expect(buttons[1].querySelector('[data-menu-text]')?.textContent).toEqual('Open');
  });
});
