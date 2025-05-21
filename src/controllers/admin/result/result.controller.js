const studentController = require("../../student.controllers");
const studentServices = require("../../../services/student.service");
const testServices = require("../../../services/test.service");
const resultServices = require("../../../services/result.services");
const resultController = require("../../result.controllers");
const paginationHelper = require("../../../helpers/paginationHelper");
const searchHelper = require("../../../helpers/search");
const { Op } = require("sequelize");
// [GET] /admin/my-account
module.exports.index = async (req, res) => {
  res.render("admin/pages/viewResult/index.pug", {
    titlePage: "Thông tin cá nhân",
  });
};
// [GET] /admin/my-account
module.exports.student = async (req, res) => {
  const find = {};
  const lop = req.query.class;
  if (lop) {
    find.Lop = lop;
  }

  //console.log(req.query.keyword);

  if (req.query.keyword && req.query.keyword !== "") {
    const regexExpression = new RegExp(req.query.keyword, "i").source;
    find[Op.or] = [
      { Ten: { [Op.regexp]: regexExpression } },
      { MSV: { [Op.regexp]: regexExpression } },
    ];
  }

  //console.log(find);
  const count = await studentServices.getCountStudentWithFindObject(find);
  const pagination = paginationHelper(
    {
      currentPage: 1,
      limitedItem: 5,
    },
    req.query,
    count.data ? count.data.length : 0
  );
  const studentList = await studentServices.getStudentWithFindObject(
    find,
    pagination
  );
  res.render("admin/pages/viewResult/student.pug", {
    titlePage: "Kết quả sinh viên",
    className: lop || "Tất cả",
    studentList: studentList.data ? studentList.data : null,
    pagination: pagination,
    keyword: req.query.keyword || "",
  });
};
module.exports.studentWithId = async (req, res) => {
  const studentId = req.params.studentId;
  //console.log(studentId);
  const testList = await testServices.getTestByStudentId(studentId);
  const pagination = paginationHelper(
    {
      currentPage: 1,
      limitedItem: 5,
    },
    req.query,
    testList.data.length
  );
  const student = await studentServices.getStudentById(studentId);
  const testListWithPage = await testServices.getTestByStudentIdWithPage(
    studentId,
    pagination
  );
  // //console.log(testListWithPage)
  res.render("admin/pages/viewResult/studentDetail.pug", {
    titlePage: "Kết quả sinh viên",
    student: student.data[0],
    testList: testListWithPage.data,
    pagination: pagination,
  });
};
module.exports.detailStudentAndTest = async (req, res) => {
  const result = await resultController.getDetailTestWithIdStuAndIdTest(
    req.params.studentId,
    req.params.testId
  );
  res.render("admin/pages/viewResult/studentAndTestDetail.pug", {
    titlePage: "Kết quả sinh viên",
    result: result.result.data[0],
    student: result.student.data[0],
    test: result.test.data[0],
    detail: result.detail,
  });
};
// [GET] /admin/my-account
module.exports.test = async (req, res) => {
  const find = {};
  if (req.query.keyword && req.query.keyword !== "") {
    console.log(req.query.keyword);
    const regexExpression = new RegExp(req.query.keyword, "i").source;
    find[Op.or] = [
      { TenBaiThi: { [Op.regexp]: regexExpression } },
      { TheLoai: { [Op.regexp]: regexExpression } },
    ];
  }
  const testList = await testServices.getAllTest();
  const pagination = paginationHelper(
    {
      currentPage: 1,
      limitedItem: 5,
    },
    req.query,
    testList.data.length
  );
  const testListWithPage = await testServices.getTestWithFindObjectAndPage(
    find,
    pagination
  );
  console.log(find);
  console.log(testListWithPage);
  // let token
  // if(req.token) token = req.token
  res.render("admin/pages/viewResult/test.pug", {
    // token: token,
    titlePage: "Kết quả bài thi",
    tests: testListWithPage.data,
    pagination: pagination,
    keyword: req.query.keyword || "",
  });
};
module.exports.testWithId = async (req, res) => {
  const testId = req.params.testId;
  const test = await testServices.getTestById(testId);
  const resultList = await resultServices.getResultByIdTest(testId);
  const studentList = [];
  const find = {};
  if (req.query.keyword && req.query.keyword !== "") {
    const regexExpression = new RegExp(req.query.keyword, "i").source;
    find[Op.or] = [
      { Ten: { [Op.regexp]: regexExpression } },
      { MSV: { [Op.regexp]: regexExpression } },
    ];
  }
  if (req.query.class) find.Lop = req.query.class;
  for (let i = 0; i < resultList.data.length; i++) {
    find.MSV = resultList.data[i].MSV;
    const student = await studentServices.getCountStudentWithFindObject(find);
    if (student.data) studentList.push(student.data[0]);
  }

  res.render("admin/pages/viewResult/testResultStudent.pug", {
    titlePage: "Kết quả bài thi",
    test: test.data[0],
    resultList: resultList.data,
    studentList: studentList,
    className: req.query.class || "Tất cả",
    keyword: req.query.keyword || "",
  });
};

// [GET] /admin/my-account
