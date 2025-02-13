const fs = require('fs');
const path = require('path');
const { app } = require('electron');

const settingsPath = path.join(app.getPath('userData'), 'settings.json');

function loadSettings() {
  try {
    return JSON.parse(fs.readFileSync(settingsPath));
  } catch (e) {
    return { theme: 'system' };
  }
}

function saveSettings(settings) {
  fs.writeFileSync(settingsPath, JSON.stringify(settings));
}

function initializeSettings() {
  if (!fs.existsSync(settingsPath)) {
    const defaultSettings = { theme: 'system' };
    saveSettings(defaultSettings);
    return defaultSettings;
  }
  return loadSettings();
}

module.exports = { loadSettings, saveSettings, initializeSettings };