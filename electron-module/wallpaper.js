const fs = require("fs")

const updateBGSettings = (property, value) => {
  let info;
  try {
    info = JSON.parse(fs.readFileSync("./settings/settings.json"))
  } catch (error) {
    info = {
      wallpaper: {}
    }
  }
  info.wallpaper[property] = value;
  fs.writeFileSync("./settings/settings.json", JSON.stringify(info, null, "\t"));
}

const getBGSettings = () => {
  try {
    return JSON.parse(fs.readFileSync("./settings/settings.json")).wallpaper;
  } catch (error) {
    return {};
  }
}

module.exports = {
  updateBGSettings,
  getBGSettings
}
