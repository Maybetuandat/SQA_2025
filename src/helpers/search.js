module.exports = (query) => {
  let objectSearch = {
    keyword: "",
  };

  if (query.keyword) {
    objectSearch.keyword = query.keyword;

    const regex = new RegExp(objectSearch.keyword, "i");
    // Chuyển đổi đối tượng RegExp thành chuỗi biểu thức chính quy
    objectSearch.regex = regex.source;
  }

  return objectSearch;
};
