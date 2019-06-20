const remote = require('electron').remote;
const wallpaper = remote.getGlobal('wallpaper');
const setAuth = remote.require('./electron-module/authManage.js').updateWallpaperAuth;

const getBackground = () => {
  $.get("https://wall.alphacoders.com/api2.0/get.php",
    {
      "auth": wallpaper,
      "method": "search",
      "term": "kancolle",
      "page": String(Math.floor(Math.random() * 50)),
      "width": "1920"
    },
    (data) => {
      const image_url = data.wallpapers[Math.floor(Math.random() * 30)].url_image;
      $('body').css("background-image",
                    'linear-gradient(rgba(0, 0, 0, 0.5),' +
                    ' rgba(0, 0, 0, 0.7)), ' +
                    'url(' + image_url + ')')
    }
  ).fail(function() {
    alert( "error" );
  });
}