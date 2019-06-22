const shell = require('electron').shell;

const generateHeader = (name) => {
  const header = $(
    '<header class="mdl-layout__header mdl-layout__header--transparent">' +
      '<div class="mdl-layout__header-row">' +
        '<a href="./index.html" class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored">' +
          '<i class="material-icons">chevron_left</i>' +
        '</a>' +
        '<span class="mdl-layout-title">' + name + '</span>' +
        '<div class="mdl-layout-spacer"></div>' +
        '<nav class="mdl-navigation mdl-layout--large-screen-only">' +
          //'<a class="mdl-navigation__link" style="color: white" href=""></a>' +
          //'<a class="mdl-navigation__link" style="color: white" href=""></a>' +
          //'<a class="mdl-navigation__link" style="color: white" href=""></a>' +
          //'<a class="mdl-navigation__link" style="color: white" href=""></a>' +
        '</nav>' +
      '</div>' +
    '</headr>'
  )

  $(".mdl-layout--fixed-header").prepend(header)
}

const generateToast = () => {
  $('body').append(
    $(
      '<div aria-live="assertive" aria-atomic="true" aria-relevant="text" class="mdl-snackbar mdl-js-snackbar">' +
        '<div class="mdl-snackbar__text"></div>' +
        '<button type="button" class="mdl-snackbar__action"></button>' +
      '</div>'
    )
  )
}

const externalLink = (url) => {
  shell.openExternal(url);
}
