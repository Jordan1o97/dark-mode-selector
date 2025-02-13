document.addEventListener('DOMContentLoaded', async () => {
  const radios = document.querySelectorAll('.radio');
  const indicator = document.querySelector('.radio-indicator');
  const themeValues = ['dark', 'system', 'light'];

  let savedTheme = await window.darkMode.getTheme();
  let initialIndex = themeValues.indexOf(savedTheme);
  if (initialIndex === -1) {
    initialIndex = 1;
    savedTheme = themeValues[1];
  }
  moveIndicator(initialIndex);
  applyTheme(savedTheme);

  radios.forEach((radio, index) => {
    radio.addEventListener('click', async () => {
      const theme = radio.getAttribute('data-theme');
      await window.darkMode.setTheme(theme);
      applyTheme(theme);
      moveIndicator(index);
    });
  });

  function moveIndicator(index) {
    const circleSize = 25;
    const gap = 50;
    const indicatorSize = 18;
    const offset = (circleSize - indicatorSize) / 2;
    const positions = [
      0,
      circleSize + gap,
      2 * (circleSize + gap)
    ];
    indicator.style.left = `${positions[index] + offset}px`;
  }

  function applyTheme(theme) {
    document.body.classList.remove('dark-theme', 'light-theme', 'system-theme');
    document.body.classList.add(`${theme}-theme`);
  }
});