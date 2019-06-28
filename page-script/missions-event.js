let currentPage = 1;
let pageNumber = 1;

const page = (next) => {
  const hyp = currentPage + (next * mList.page);
  if (hyp >= 0 && hyp <= mList.items.length) {
    currentPage = hyp;
    mList.show(currentPage, mList.page)
    pageNumber += next;
    $("#currentPage").text(pageNumber)
    $(".finishButton").click(e => {
      finishMission(e)
    })
  }
}
