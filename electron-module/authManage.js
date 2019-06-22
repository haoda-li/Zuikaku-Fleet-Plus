const fs =require("fs")

const updateWallpaperAuth = (s) => {
  let info;
  try {
    info = JSON.parse(fs.readFileSync("./settings/auth.json"))
  } catch (error) {
    info = {}
  }
  info.wallpaper = s;

  try {
    fs.writeFileSync("./settings/auth.json", JSON.stringify(info));
  } catch (error) {
    fs.mkdir("./settings");
    fs.writeFileSync("./settings/auth.json", JSON.stringify(info));
  }


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
