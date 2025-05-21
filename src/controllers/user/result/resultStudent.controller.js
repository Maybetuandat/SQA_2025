// [GET] /admin/my-account
module.exports.index = async (req, res) => {
  res.render("admin/pages/viewResult/student.pug", {
    titlePage: "Kết quả sinh viên",
  });
};
