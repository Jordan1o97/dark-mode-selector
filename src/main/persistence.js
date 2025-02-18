const fs = require('fs');
const path = require('path');
const { app } = require('electron');

const settingsPath = path.join(app.getPath('userData'), 'settings.json');

function loadSettings() {
  try {
    return fs.readFileSync(settingsPath, 'utf8');
  } catch (e) {
    return 'system';
  }
}

function saveSettings(theme) {
  fs.writeFileSync(settingsPath, theme, 'utf8');
}

function initializeSettings() {
  if (!fs.existsSync(settingsPath)) {
    const defaultTheme = 'system';
    saveSettings(defaultTheme);
    return defaultTheme;
  }
  return loadSettings();
}

module.exports = { loadSettings, saveSettings, initializeSettings };