const generateSection = (name, image) => {
  const bgPath = "./assets/" + image + ".png"
  const htmlContent = $(
    '<div class="mdl-cell--middle mdl-cell mdl-cell--3-col">' +
      '<div class="demo-card-image mdl-card mdl-shadow--2dp" style=\"background-image: url(' + bgPath + ')\">' +
        '<div class="mdl-card__title mdl-card--expand">' +
          '<img style="margin-left: -10px" class="section-icon" src=\".\/assets\/' + image + '_fairy.png\" />' +
        '</div>' +
        '<div class="mdl-card__actions">' +
          '<a class="section-text mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">' + name + '</a>' +
        '</div>' +
      '</div>' +
    '</div'
  )
  $("#sections").append(htmlContent)
}

generateSection("装备图鉴", "arma")
generateSection("舰娘图鉴", "fleet")
