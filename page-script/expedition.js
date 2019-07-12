const eEdit = require('electron').remote
  .require('./electron-module/expeditionEdit.js');

// Lists
const options = {
  item: 'li_template',
  valueNames: [
    'id',
    'name_ja', 'name',
    'time',
    'exp_commander', 'exp_ship',
    'fuel', 'arma', 'steal', 'al',
    'reward_a', 'reward_b',
    'fleet_level', 'flag_level',
    'min_number', 'required',
    'required_arma', 'fuel_consume',
    'arma_consume'
  ]
};


const mList = new List('expd_list', options, eEdit.getExpeditions());

const search = () => {
  mList.search($("#search_input").val())
  $("#search_input").val("")
}

$(".mdl-navigation.mdl-layout--large-screen-only").append($(
  '<div class="mdl-textfield mdl-js-textfield">' +
    '<input class="mdl-textfield__input" type="text" id="search_input">' +
    '<label class="mdl-textfield__label" for="search_input">...</label>' +
  '</div>' +
  '<button onclick="search()" class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored">' +
    '<i class="material-icons">search</i>' +
  '</button>')
)
