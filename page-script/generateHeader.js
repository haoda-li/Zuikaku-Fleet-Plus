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
          '<a class="mdl-navigation__link" style="color: white" href="">Link</a>' +
          '<a class="mdl-navigation__link" style="color: white" href="">Link</a>' +
          '<a class="mdl-navigation__link" style="color: white" href="">Link</a>' +
          '<a class="mdl-navigation__link" style="color: white" href="">Link</a>' +
        '</nav>' +
      '</div>' +
    '</headr>'
  )

  $(".mdl-layout--fixed-header").append(header)
}
