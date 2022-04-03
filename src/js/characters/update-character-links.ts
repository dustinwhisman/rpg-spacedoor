export const updateCharacterLinks = (characterNames: string[]) => {
  const navList = document.querySelector('#character-nav-list');
  if (navList) {
    characterNames.forEach((name) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.setAttribute('href', `/characters/${encodeURIComponent(name)}`);
      a.textContent = name;
      li.appendChild(a);
      navList.appendChild(li);
    });
  }
};
