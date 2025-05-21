// const { param } = require('../../../../routes/api.route');
const { getTestById, getCountTestWithFindObject, getTestWithFindObject } = require('../../../services/test.service');
// const { getQuestionOfTest } = require('../../../routes/api.route');
const paginationHelper = require('../../../helpers/paginationHelper');
const { Op } = require('sequelize');
const { testService } = require('../../../services/test.service');
const { getQuestionOfTest } = require('../../../services/question.service');

const testListPaginate = async (req, res) => {
    const find = {};
    const ten = req.query.name;
    if (ten) {
        find.Ten = ten;
    }


    if (req.query.keyword) {
        const regexExpression = new RegExp(req.query.keyword, "i").source;
        find[Op.or] = [
            { TenBaithi: { [Op.regexp]: regexExpression } },
            { MaBaiThi: { [Op.regexp]: regexExpression } },
        ];
    }

    // //console.log(find);
    const count = await getCountTestWithFindObject(find);
    const pagination = paginationHelper(
        {
            currentPage: 1,
            limitedItem: 5,
        },
        req.query,
        count.data.length
    );
    const testList = await getTestWithFindObject(
        find,
        pagination
    );

    var data = testList.data;

    // //console.log(data);
    for (var i = 0; i < data.length; i++) {
        var y = data[i].ThoiGianBatDau;
        var timeFormat = new Date(y)
        data[i].ThoiGianBatDau = timeFormat.toLocaleString()
    }

    res.render("admin/pages/viewTest/index.pug", {
        titlePage: "Danh sách bài thi",
        className: ten || "Tất cả",
        tests: data,
        pagination: pagination,
        keyword: req.query.keyword || "",
    });
}

const createNewTest = async (req, res) => {

    res.render("admin/pages/viewTest/newTest.pug", {
        titlePage: "Tạo mới bài thi"
    });
}

const EditTest = async (req, res) => {
    const testId = req.params.id;
    // //console.log("id: ", testId);
    var metadata = await getTestById(testId);
    var questions = await getQuestionOfTest(testId);

    const startTime = metadata.data[0].ThoiGianBatDau;


    const datetimeString = startTime.toISOString();

    const datePart = datetimeString.split('T')[0];
    const timePart = datetimeString.split('T')[1].split('.')[0];

    // //console.log(metadata.data[0].MaBaiThi)
    metadata.data[0].date = datePart
    metadata.data[0].time = timePart
    // //console.log(metadata[0].MaBaiThi);

    var list = questions.data;

    res.render("admin/pages/viewTest/editTest.pug", {
        titlePage: "Chỉnh sửa bài thi",
        metadata: metadata.data[0],
        questions: list,
    });
}


module.exports = { createNewTest, EditTest, testListPaginate }

