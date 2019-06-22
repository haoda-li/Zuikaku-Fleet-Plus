const notification = document.querySelector('.mdl-js-snackbar');
const remote = require('electron').remote;
const wallpaper = remote.require('./electron-module/authManage.js');
const bgSettings = remote.require('./electron-module/wallpaper.js');

const updateAuth = () => {
  const newAPI = $('#new_API').val();
  console.log(newAPI);
  $.get("https://wall.alphacoders.com/api2.0/get.php", {
    "auth": newAPI,
    "method": "random",
  }, (data) => {
    if (data.success) {
      wallpaper.updateWallpaperAuth(newAPI);
      notification.MaterialSnackbar.showSnackbar({
        message: 'Varified API KEY'
      });
      $("#current_id").text(newAPI);
    } else {
      notification.MaterialSnackbar.showSnackbar({
        message: 'Invalid API KEY'
      })
    }
  })
}

const setOffline = () => {
  const checked = $("#bg-online").prop("checked");
  bgSettings.updateBGSettings("online", String(checked));
}

const getOffine = () => {
  if (bgSettings.getBGSettings().online === "true") {
    $("#bg-online").prop("checked", true);
  } else {
    $("#bg-online").prop("checked", false);
  }
}

getOffine()

const loadLocalWallPaper = () => {
  const dir = remote.require('fs').readdirSync('./wallpapers/');
  const local = $("#local-wallpapers");
  dir.forEach((img) => {
    const htmlContent = $(
      '<div class="card-image mdl-card mdl-shadow--2dp"' +
      'style=\"background-image: url(../wallpapers/' + img + ')\">' +
      '</div>'
    )
    local.append(htmlContent);
  })
}

loadLocalWallPaper();

$(".card-image").click((e) => {
  const bg = $(e.target).css("background-image")
              .replace(/.*\s?url\([\'\"]?/, '')
              .replace(/[\'\"]?\).*/, '')

  $('body').css("background-image",
    'linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)),' +
    'url(' + bg + ')')
  bgSettings.updateBGSettings('url', bg);
})
