const fs = require("fs")



const getExpeditions = () => {
  try {
    return JSON.parse(fs.readFileSync("./data/expeditions.json"));
  } catch (error) {
    return {};
  }
}

module.exports = {
  getExpeditions
}
