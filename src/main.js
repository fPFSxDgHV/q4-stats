const { app, BrowserWindow, session } = require('electron');
const path = require('path');

const initAppFolder = require('./node/appFolder')
const initStaticServer = require('./node/staticServer')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },

    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#192638',
      symbolColor: '#ffffff'
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(path.join(__dirname,'index.html'));
  // mainWindow.removeMenu()
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
function createWindowOnAppReady() {
  app.on('ready', onAppReady);

}

function setupListeners() {
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
}

function setupStaticProtocol() {
  session.defaultSession.protocol.registerFileProtocol('static', (request, callback) => {
    const fileUrl = request.url.replace('static://', '');
    const filePath = path.join(app.getAppPath(), '.webpack/renderer', fileUrl);
    callback(filePath);
  });
}

async function init() {
  initAppFolder()
  initStaticServer()
  await createWindowOnAppReady()
  setupListeners()
}

async function onAppReady() {
  createWindow()
  setupStaticProtocol()

}

init()