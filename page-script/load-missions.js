
const options = {
    item: 'li_template',
    valueNames: ['id', 'interval',
                 'name_ja', 'name',
                 'prerequisite',
                 'description_ja', 'description',
                 'fuel', 'arma', 'steal', 'al',
                 'tips', 'reward'
                ]
};

const loaded = require('electron').remote
              .require('fs').readFileSync("./data/missions.json");
const values = JSON.parse(loaded);

const hackerList = new List('mission_ul', options, values);
