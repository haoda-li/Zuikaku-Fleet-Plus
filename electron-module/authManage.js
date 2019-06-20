const fs =require("fs")

const updateWallpaperAuth = (s) => {
  let info;
  try {
    info = JSON.parse(fs.readFileSync("./auth.json"))
  } catch (error) {
    info = {}
  }
  info.wallpaper = s;
  fs.writeFileSync("./auth.json", JSON.stringify(info))
}

const getWallpaperAuth = () => {
  try {
    return JSON.parse(fs.readFileSync("./auth.json")).wallpaper;
  } catch (error) {
    return null;
  }

}

module.exports = {
  updateWallpaperAuth,
  getWallpaperAuth
}
