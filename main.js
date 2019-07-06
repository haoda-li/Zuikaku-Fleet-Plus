const {
  app,
  BrowserWindow
} = require('electron');
const DownloadManager = require("electron-download-manager");
const fs = require('fs')
const status = require('./electron-module/repeatedMissions.js')
// get global variables
global.wallpaperAuth = require('./electron-module/authManage.js').getWallpaperAuth();

// make necessary folders
try {
  fs.readdirSync("./settings");
} catch {
  fs.mkdirSync("./settings");
}

try {
  fs.readdirSync("./wallpapers");
} catch {
  fs.mkdirSync("./wallpapers");
}

try {
  fs.readFileSync("./settings/status.json")
} catch {
  status.updateTime()
}

status.refreshMissions()
status.updateTime()

DownloadManager.register({
  downloadFolder: "./wallpapers"
});

let win;

function createWindow() {
  win = new BrowserWindow({
    icon: './icons/logo.png',
    title: 'Zuikaku Fleet +',
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.maximize()
  // win.removeMenu()
  win.loadFile('./page/index.html')

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
