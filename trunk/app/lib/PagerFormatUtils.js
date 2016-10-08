export default function(result) {
  let newResult = {
    total: 0,
    rows: [],
    pagenumber: 1,
    pagecount: 0
  };

  newResult.total = result.totalRows;
  newResult.rows = result.result;
  newResult.pagenumber = result.currentPage;
  newResult.pagecount = result.totalPage;

  return newResult;

}
