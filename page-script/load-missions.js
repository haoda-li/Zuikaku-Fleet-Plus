const mEdit = require('electron').remote
  .require('./electron-module/missionEdit.js');

const options = {
  item: 'li_template',
  page: 10,
  valueNames: [{
      name: 'status',
      attr: "data-status"
    },
    'id', 'interval',
    'name_ja', 'name',
    'prerequisite',
    'description_ja', 'description',
    'fuel', 'arma', 'steal', 'al',
    'tips', 'reward',
    'memo',
  ]
};


const mList = new List('mission_ul', options, mEdit.getMissions());

const finishMission = (e) => {
  let targetButton = $(e.target)
  if (targetButton.text() === "done") {
    targetButton = targetButton.parent()
  }
  const id = targetButton.parent().find($('.id')).text()
  mEdit.updateMissions(id, 'status', 't');
  targetButton.attr("data-status", "t");
  targetButton.remove()
}

$(".finishButton").click(e => {
  finishMission(e)
})


document.querySelectorAll(".finishButton").forEach((e) => {
  if ($(e).attr('data-status') === "t") {
    $(e).remove()
  }
})
