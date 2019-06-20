const { app, BrowserWindow } = require('electron');

// get global variables
global.wallpaper = require('./electron-module/authManage.js').getWallpaperAuth();

let win;

function createWindow() {
  win = new BrowserWindow({
    icon: 'icons/logo.png',
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 加载index.html文件
  win.maximize()
  win.setMenu(null)
  win.webContents.openDevTools()
  win.loadFile('index.html')

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
