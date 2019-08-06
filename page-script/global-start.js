const $ = require("jquery");

const updateBG = () => {
  const bg = require('electron').remote.require('./electron-module/wallpaper.js').getBGSettings();
  $('body').css("background-image",
    'linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)),' +
    'url(' + bg.url + ')')
}
updateBG();

$('body').append($('<div class="se-pre-con"></div>'))
