const fs =require("fs")

const updateWallpaperAuth = (s) => {
  let info;
  try {
    info = JSON.parse(fs.readFileSync("./settings/auth.json"))
  } catch (error) {
    info = {}
  }
  info.wallpaper = s;
  fs.writeFileSync("./settings/auth.json", JSON.stringify(info, null, "\t"));



}

const getWallpaperAuth = () => {
  try {
    return JSON.parse(fs.readFileSync("./settings/auth.json")).wallpaper;
  } catch (error) {
    return "null";
  }
}

module.exports = {
  updateWallpaperAuth,
  getWallpaperAuth
}
