const remote = require('electron').remote;
const wallpaper = remote.require('./electron-module/wallpaper.js');
const wallpaperAuth = remote.require('./electron-module/authManage.js').getWallpaperAuth();
const bg = wallpaper.getBGSettings();
const bgSettings = remote.require('./electron-module/wallpaper.js');


const notification = document.querySelector('.mdl-js-snackbar');

const getBackground = () => {
  $.get("https://wall.alphacoders.com/api2.0/get.php", {
      "auth": wallpaperAuth,
      "method": "search",
      "term": "kancolle",
      "page": String(Math.floor(Math.random() * 50)),
      "width": "1920"
    },
    (data) => {
      bg.url = data.wallpapers[Math.floor(Math.random() * 30)].url_image;
      $('body').css("background-image",
        'linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)),' +
        'url(' + bg.url + ')')
      wallpaper.updateBGSettings('url', bg.url);
    }
  )
}

const saveBackground = () => {
  if (bg.url && !bg.url.startsWith("https")) {
    return;
  }
  remote.require("electron-download-manager").download({
    url: bg.url
  }, (error, info) => {
    if (error) {
      notification.MaterialSnackbar.showSnackbar({
        message: 'Download failed, ' + error
      });
      return;
    }
    notification.MaterialSnackbar.showSnackbar({
      message: 'Saved at ' + info.filePath
    });
  });
}

const getOffine = () => {
  if (bgSettings.getBGSettings().online === "false") {
    $("#save-button").toggle(false);
    $("#refresh-button").toggle(false);
  }
}

getOffine()
