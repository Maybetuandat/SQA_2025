module.exports = (objectPagination, query, countProducts) => {
  // page for step
  if (query.page) {
    objectPagination.currentPage = parseInt(query.page);
  }

  objectPagination.skip =
    (objectPagination.currentPage - 1) * objectPagination.limitedItem;

  // calculate total pages
  const totalPage = Math.ceil(countProducts / objectPagination.limitedItem);

  objectPagination.totalPages = totalPage;

  return objectPagination;
};
