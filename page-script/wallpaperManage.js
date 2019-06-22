const remote = require('electron').remote;
const wallpaper = remote.getGlobal('wallpaper');
const setAuth = remote.require('./electron-module/authManage.js').updateWallpaperAuth;
let image_url = "../wallpapers/685241.jpg";
const notification = document.querySelector('.mdl-js-snackbar');

const getBackground = () => {
  $.get("https://wall.alphacoders.com/api2.0/get.php", {
      "auth": wallpaper,
      "method": "search",
      "term": "kancolle",
      "page": String(Math.floor(Math.random() * 50)),
      "width": "1920"
    },
    (data) => {
      image_url = data.wallpapers[Math.floor(Math.random() * 30)].url_image;
      $("#bg-link").attr("href", image_url)
      $('body').css("background-image",
        'linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)),' +
        'url(' + image_url + ')')
    }
  )
}

const saveBackground = () => {
  if (! image_url.startsWith("https")) {
    return;
  }
  remote.require("electron-download-manager").download({
    url: image_url
  }, (error, info) => {
    if (error) {
      notification.MaterialSnackbar.showSnackbar(
        {
          message: 'Download failed, ' + error
        }
      );
      return;
    }
    notification.MaterialSnackbar.showSnackbar(
      {
        message: 'Saved at ' + info.filePath
      }
    );
  });
}
