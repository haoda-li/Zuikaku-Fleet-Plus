const fs = require("fs")

const updateMissions = (mid, field, newValue) => {
  const missions = getMissions();
  const index = missions.findIndex((m) => {
    return m.id === mid
  })
  missions[index][field] = newValue;
  fs.writeFileSync("./data/missions.json", JSON.stringify(missions, null, "\t"));
}

const getMissions = () => {
  try {
    return JSON.parse(fs.readFileSync("./data/missions.json"));
  } catch (error) {
    return {};
  }
}

module.exports = {
  updateMissions,
  getMissions
}
