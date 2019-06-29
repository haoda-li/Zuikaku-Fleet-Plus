const mEdit = require('electron').remote
  .require('./electron-module/missionEdit.js');

// Lists
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

let currentPage = 1;
let pageNumber = 1;

const page = (next) => {
  const hyp = currentPage + (next * mList.page);
  if (hyp >= 0 && hyp <= mList.size()) {
    currentPage = hyp;
    mList.show(currentPage, mList.page)
    pageNumber += next;
    $("#currentPage").text(pageNumber)
    $(".finishButton").click(e => {
      finishMission(e)
    })
  }
}


const mList = new List('mission_ul', options, mEdit.getMissions());

mList.filter((i) => {
  return i.values().status != 't'
})
$("#itemsize").text(mList.matchingItems.length)

// Events
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



const search = () => {
  mList.search($("#search_input").val())
  $("#search_input").val("")
}


// Filters
let filterFinished = true
let typeFilter = "all"
let intervalFilter = "all"

$("#m_finished").click(() => {
  filterFinished = ! filterFinished;
  $("#m_finished > i").text((filterFinished) ? "done" : "clear")
  applyFilter()
})

$(".m_type").click((e) => {
  let target_id = e.target.id
  if (target_id === "") {
    target_id = e.target.parentNode.id
  }
  if (target_id === "") {
    return
  }
  if (typeFilter === target_id[1]) {
    typeFilter = "all"
  } else {
    typeFilter = target_id[1]
  }
  applyFilter()
})

$(".m_interval").click((e) => {
  let target_id = e.target.id
  if (target_id === "") {
    target_id = e.target.parentNode.id
  }
  if (target_id === "") {
    return
  }
  if (intervalFilter === target_id) {
    intervalFilter = "all"
  } else {
    intervalFilter = target_id
  }
  applyFilter()
})

const applyFilter = () => {
  // clear filter
  mList.filter((i) => {
    if (filterFinished && i.values().status == 't') {
      return false
    }
    if (typeFilter === "O" && ['A', 'B', 'D', 'F'].includes(i.values().id[0])) {
      return false
    }
    if (typeFilter != "all" && typeFilter != "O" && i.values().id[0] != typeFilter) {
      return false
    }
    if (intervalFilter != "all" && i.values().interval != intervalFilter){
      return false
    }
    return true
  })
  $(".finishButton").click(e => {
    finishMission(e)
  })

  document.querySelectorAll(".m_interval").forEach((e) => {
    $(e).children().text(e.id)
  })
  if (intervalFilter != "all") {
    $("#" + intervalFilter + " > i").text("clear")
  }

  document.querySelectorAll(".m_type").forEach((e) => {
    $(e).children().text($(e).children().data('text'))
  })
  if (typeFilter != "all") {
    $("#m" + typeFilter + " > i").text("clear")
  }
}

mList.on("updated", () => {
  $("#itemsize").text(mList.matchingItems.length)
})
