const mockThemes = [
  {
    name: 'default',
    label: 'System',
    variables: {
      '--primary': '#52BAE2',
      '--secondary': '#C2E9F5',
      '--border': '#E5E5E5',
      '--text': '#000000',
      '--background': '#FFFFFF'
    }
  },
  {
    name: 'magenta',
    label: 'Magenta',
    variables: {
      '--primary': '#ff00ff',
      '--secondary': '#ff99ff',
      '--border': '#e500e5',
      '--text': '#330033',
      '--background': '#fff0ff'
    }
  },
  {
    name: 'rainbow',
    label: 'Rainbow',
    variables: {
      '--primary': '#ff0000',
      '--secondary': '#ffa500',
      '--border': '#ffff00',
      '--text': '#008000',
      '--background': '#00ffff'
    }
  },
  {
    name: 'ocean',
    label: 'Ocean',
    variables: {
      '--primary': '#0077be',
      '--secondary': '#00a0e3',
      '--border': '#005f94',
      '--text': '#ffffff',
      '--background': '#001f3f'
    }
  },
  {
    name: 'forest',
    label: 'Forrest',
    variables: {
      '--primary': '#228B22',
      '--secondary': '#66CDAA',
      '--border': '#006400',
      '--text': '#ffffff',
      '--background': '#2E8B57'
    }
  }
];

document.addEventListener('DOMContentLoaded', async () => {
  // get computed style values for radio size and gap from :root
  const rootStyles = getComputedStyle(document.documentElement);
  const radioSize = parseInt(rootStyles.getPropertyValue('--radio-size'));
  const gap = parseInt(rootStyles.getPropertyValue('--gap'));

  // calculate a cell width for each radio (you can adjust this if needed)
  const cellWidth = radioSize + gap;
  const styleElement = document.createElement('style');
  document.head.appendChild(styleElement);

  // calc pos for each radio button/animation
  mockThemes.forEach((theme, index) => {
    const rule = `
      .radio-container[data-selected="${theme.name}"] .radio-indicator {
        left: calc(${index} * (var(--radio-size) + var(--gap)) + ((var(--radio-size) - var(--indicator-size)) / 2));
      }
    `;
    styleElement.innerHTML += rule;
  });

  // Todo update this
  let savedThemeName = await getSavedTheme() || 'default';

  // get containers
  const titleContainer = document.querySelector('.title-container');
  const radioContainer = document.querySelector('.radio-container');
  const borderContainer = document.querySelector('.border-container');

  // clear any style in the containers
  titleContainer.innerHTML = '';
  radioContainer.innerHTML = '';

  // create title spans and radio buttons
  mockThemes.forEach((theme) => {
    // create title span and style it
    const span = document.createElement('span');
    span.textContent = theme.label;
    span.style.width = `${cellWidth}px`;
    span.style.textAlign = 'center';
    titleContainer.appendChild(span);

    // create radio button container
    const radioDiv = document.createElement('div');
    radioDiv.className = 'radio';
    radioDiv.setAttribute('data-theme', theme.name);

    // create radio button styling element
    const btnDiv = document.createElement('div');
    btnDiv.className = 'radio-btn';
    radioDiv.appendChild(btnDiv);

    // apply theme if selected
    if (theme.name === savedThemeName) {
      radioContainer.setAttribute('data-selected', theme.name);
      applyTheme(theme);
    }
    // add click listener for switching theme
    radioDiv.addEventListener('click', async () => {
      savedThemeName = theme.name;
      await saveTheme(savedThemeName);
      applyTheme(theme);
      radioContainer.setAttribute('data-selected', theme.name);
    });
    // append radio button to container
    radioContainer.appendChild(radioDiv);
  });

  // append the track and indicator elements to the radio container
  const trackDiv = document.createElement('div');
  trackDiv.className = 'radio-track';
  radioContainer.appendChild(trackDiv);

  const indicatorDiv = document.createElement('div');
  indicatorDiv.className = 'radio-indicator';
  radioContainer.appendChild(indicatorDiv);

  // update border size given data
  const numThemes = mockThemes.length;
  // container width is determined by the radio sizes and gaps
  const containerWidth = (numThemes * radioSize) + ((numThemes - 1) * gap);
  borderContainer.style.width = `${containerWidth + gap * 2}px`;
  radioContainer.style.width = `${containerWidth}px`;
  titleContainer.style.width = `${containerWidth + gap}px`;
});

// apply the theme logic
function applyTheme(theme) {
  Array.from(document.body.classList).forEach(cls => {
    if (cls.endsWith('-theme')) {
      document.body.classList.remove(cls);
    }
  });
  document.body.classList.add(`${theme.name}-theme`);
  Object.entries(theme.variables).forEach(([prop, value]) => {
    document.documentElement.style.setProperty(prop, value);
  });
}

async function getSavedTheme() {
  return await window.darkMode.getTheme();
}

async function saveTheme(themeName) {
  await window.darkMode.setTheme(themeName);
}