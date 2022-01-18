const {app, BrowserWindow, session} = require('electron');
const path = require('path');
const themes = require('./ui/themes')

const initAppFolder = require('./node/appFolder')
const initStaticServer = require('./node/staticServer')

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
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
      color: themes.dark.header,
      symbolColor: '#ffffff'
    }
  });

  mainWindow.loadURL(path.join(__dirname, 'index.html'));
  // mainWindow.removeMenu()
  mainWindow.webContents.openDevTools();
};

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