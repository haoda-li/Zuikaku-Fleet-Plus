const fs = require("fs")

const updateMissions = (mid, field, newValue) => {
  try {
    fs.readFileSync("./data/missions.json")
  } catch (error) {
    return;
  }
  const missions = getFile("./data/missions.json");
  const index = missions.findIndex((m) => {
    return m.id === mid
  })
  missions[index][field] = newValue;
  fs.writeFileSync("./data/missions.json", JSON.stringify(missions, null, "\t"));
}

const getFile = (f) => {
  try {
    return JSON.parse(fs.readFileSync(f));
  } catch (error) {
    return {};
  }
}
module.exports = {
  updateMissions,
  getFile
}
