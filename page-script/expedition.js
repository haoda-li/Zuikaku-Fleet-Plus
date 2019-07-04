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
