const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron');
const path = require('path');
const started = require('electron-squirrel-startup');
const { initializeSettings, loadSettings, saveSettings } = require('./persistence');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 450,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      contextIsolation: true,
      nodeIntegration: true
    },
  });

  const settings = initializeSettings();;

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {

  ipcMain.handle('get-theme', () => {
    return loadSettings();
  });
  
  ipcMain.handle('set-theme', (_, theme) => {
    saveSettings(theme);
    return theme;
  });
  
  createWindow();

  // OSX only
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
