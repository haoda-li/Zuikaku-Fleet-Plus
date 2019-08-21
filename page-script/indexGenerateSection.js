const generateSection = (name, image) => {
  const bgPath = "../assets/" + image + ".png"
  const cell = $(
    '<div class="mdl-cell--middle mdl-cell mdl-cell--3-col">' +
    '</div>'
  )

  const link = $('<a href="' + image +'.html"></a>')

  const content = $(
    '<div class="demo-card-image mdl-card mdl-shadow--2dp" style=\"background-image: url(' + bgPath + ')\">' +
      '<div class="mdl-card__title mdl-card--expand">' +
        '<img style="margin-left: -10px" class="section-icon" src=\"..\/assets\/' + image + '_fairy.png\" />' +
      '</div>' +
      '<div class="mdl-card__actions" style="background-color: rgba(255,255,255,0.6)">' +
        '<span class="section-text black-text">' + name + '</span>' +
      '</div>' +
    '</div>'
  )
  link.append(content)
  cell.append(link)
  $("#sections").append(cell)
}

generateSection("装备图鉴", "arma")
generateSection("地图列表", "map")
generateSection("任务列表", "mission")
generateSection("远征列表", "expedition")
