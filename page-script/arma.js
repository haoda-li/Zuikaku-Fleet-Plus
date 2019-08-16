const mData = require('electron').remote
  .require('./electron-module/dataEdit.js');


const options = {
  item:
  `<tr id="li_template">
    <td class="mdl-data-table__cell--non-numeric">
      <span class="mdl-chip mdl-chip--contact">
        <img class="list_icon type">
        <span class="mdl-chip__text id"></span>
      </span>
    </td>
    <td class="mdl-data-table__cell--non-numeric">
      <b><span class="mdl-color-text--amber-700 name_cn">template</span></b>
      <br><span class="mdl-color-text--grey-400 name_jp"></span>
    </td>
    <td class="mdl-data-table__cell--non-numeric">
      <span class="list_tag data"></span>
    </td>
    <td class="mdl-data-table__cell--non-numeric">
      <i class="material-icons produce mdl-color-text--green-A400"></i>
    </td>
    <td class="mdl-data-table__cell--non-numeric">
      <i class="material-icons enhance mdl-color-text--green-A400"></i>
    </td>
  </tr>`,
  valueNames: [{
      name: 'type',
      attr: "src"
    },
    'id', 'name_cn',
    'name_jp', 'data', 'produce', 'enhance'
  ]
};

const mList = new List('arma_ul', options, mData.getArma());
mList.remove("name_cn", "template")
