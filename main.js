const {
  app,
  BrowserWindow
} = require('electron');
const DownloadManager = require("electron-download-manager");
const fs = require('fs')
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

// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。
