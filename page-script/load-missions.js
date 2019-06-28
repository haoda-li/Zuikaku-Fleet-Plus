const mEdit = require('electron').remote
  .require('./electron-module/missionEdit.js');

const options = {
  item: 'li_template',
  page: 10,
  valueNames: ['id', 'interval',
    'name_ja', 'name',
    'prerequisite',
    'description_ja', 'description',
    'fuel', 'arma', 'steal', 'al',
    'tips', 'reward',
    'memo', 'status'
  ]
};


const mList = new List('mission_ul', options, mEdit.getMissions());

const finishMission = (e) => {
  const id = $(e.target).parent().parent().parent().find($('.id')).text()
  mEdit.updateMissions(id, 'status', 't');
}

$(".finishButton").click(e => {
  finishMission(e)
})
