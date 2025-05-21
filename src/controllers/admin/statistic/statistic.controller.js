module.exports.studentStatistic = async (req, res) => {
  res.render("admin/pages/statistic/student.pug", {
    titlePage: "Thống kê sinh viên",
  });
};

module.exports.testStatistic = async (req, res) => {
  res.render("admin/pages/statistic/test.pug", {
    titlePage: "Thống kê bài thi",
  });
};
