export const updateCharacterLinks = (characterNames: string[]) => {
  const navList = document.querySelectorAll('[data-character-nav-list]');

  navList?.forEach((list) => {
    characterNames.forEach((name) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.setAttribute('href', `/character?name=${encodeURIComponent(name)}`);
      a.textContent = name;
      li.appendChild(a);
      list.appendChild(li);
    });
  });
};
