const { getResultByIdStuAndIdTest, getAllResult, getResultWithIdResult, getResultWithMaKetQua, getResultWithDate } = require("../services/result.services");
const { getStudentById } = require("../services/student.service");
const { getTestById, getURL } = require("../services/test.service");
const { getQuestionOfTest } = require("../services/question.service");
const { getDetailListWithIdResult } = require("../services/detail.services");

const detail = require("../models/detail");
const getResultWithIdStuAndIdTest = async (req, res) => {
  const idStu = req.params.id;
  const idTest = req.params.idTest;
  const data = await getResultByIdStuAndIdTest(idStu, idTest);
  // //console.log(data);
  return res.json(data);
};
const getDetailTestWithIdStuAndIdTest = async (idStudent, idTest) => {
  const dataRes = {
    status: null,
    student: null,
    test: null,
    numberCorrect: null,
    numberTotal: null,
    result: null,
    detail: [],
  };
  const questionList = await getQuestionOfTest(idTest); //thong tin cac cau hoi
  const student = await getStudentById(idStudent); //thong tin sinh vien
  const result = await getResultByIdStuAndIdTest(idStudent, idTest); //thong tin ket qua

  const test = await getTestById(idTest); //thong tin bai thi

  if (result.data) {
    const detailList = await getDetailListWithIdResult(result.data[0].MaKetQua); //chi tiet tung cau
    dataRes.student = student;
    dataRes.status = 200;
    dataRes.test = test;
    dataRes.result = result;
    dataRes.numberTotal = detailList.length;
    var cntCorrect = 0;
    for (var i = 0; i < detailList.length; i++) {
      const questionInfor = { question: null, _detail: null };
      questionInfor.question = questionList.data[i];
      questionInfor._detail = detailList[i];
      if (detailList[i].Dung === 1) cntCorrect++;
      dataRes.detail.push(questionInfor);
    }
    dataRes.numberCorrect = cntCorrect;
  } else {
    dataRes.status = 404;
  }
  return dataRes;
};


const getDetailTestWithIdStuAndIdResult = async (idStudent, idResult) => {
  const dataRes = {
    status: null,
    student: null,
    test: null,
    numberCorrect: null,
    numberTotal: null,
    result: null,
    detail: [],
  };
  let result = await getResultWithMaKetQua(idResult);
  //console.log(result)
  let idTest = result.data[0].MaBaiThi;
  //console.log(idTest)
  const questionList = await getQuestionOfTest(idTest); //thong tin cac cau hoi
  //console.log(questionList)
  const student = await getStudentById(idStudent); //thong tin sinh vien
  // const result = await getResultByIdStuAndIdTest(idStudent, idTest); //thong tin ket qua

  const test = await getTestById(idTest); //thong tin bai thi

  if (result.data) {
    const detailList = await getDetailListWithIdResult(result.data[0].MaKetQua); //chi tiet tung cau
    dataRes.student = student;
    dataRes.status = 200;
    dataRes.test = test;
    dataRes.result = result;
    dataRes.numberTotal = detailList.length;
    var cntCorrect = 0;
    for (var i = 0; i < detailList.length; i++) {
      const questionInfor = { question: null, _detail: null };
      questionInfor.question = questionList.data[i];
      questionInfor._detail = detailList[i];
      if (detailList[i].Dung === 1) cntCorrect++;
      dataRes.detail.push(questionInfor);
    }
    dataRes.numberCorrect = cntCorrect;
  } else {
    dataRes.status = 404;
  }
  return dataRes;
};

const getAllResultHandler = async (req, res) => {
  const data = await getAllResult();
  if (data.status === 404) {
    res.status(404).json({
      code: 0,
      status: 404,
      message: "Không tìm thấy dữ liệu",
    });
  }
  res.status(data.status).json({
    code: 1,
    status: data.status,
    message: "Truy vấn cơ sở dữ liệu thành công",
    data: data.data,
  });

}
const getAllStaticWithIdResult = async (req, res) => {
  const idResult = req.params.id;;

  const data = await getResultWithIdResult(idResult);
  if (data.status === 404) {
    res.status(404).json({
      code: 0,
      status: 404,
      message: "Không tìm thấy dữ liệu",
      data: data.data
    });
  }
  if (data.status === 500) {
    res.status(500).json({
      code: 0,
      status: 500,
      message: "Internal Server Error",
    });
  }
  if (data.status === 200) {
    res.status(200).json({
      code: 1,
      status: data.status,
      message: "Truy vấn cơ sở dữ liệu thành công",
      data: data.data,
    });
  }

}
const getAllStaticWithIdDate = async (req, res) => {
  const ngay = req.params.date;
  if (!req.params.date) {
    res.status(404).json({
      code: 0,
      message: "hay nhap day du du lieu",
      data: null
    })
  }
  else {
    // truy vấn đến bài thi  với date được lấy từ req, sau đó trả về 1 danh sách các id bài thi 
    // từ id bài thi truy vấn trong ketqua và hiển thị tất cả bài thi có trong bảng kết quả 
    try {
      const listId = await getIdTestWithDate(ngay);
      data = []
      for (var i = 0; i < listId.length; i++) {
        var id = listId[i].MaBaiThi;
        const dataId = await getResultWithIdResult(id);
        if (dataId.status === 200) {
          data.push(dataId.data);
        }

      }

      if (data.length > 0) {
        res.status(200).json({
          code: 1,
          status: 200,
          message: "Tất cả kết quả bài thi vào ngày " + ngay,
          data: data
        });
      }
      else {
        res.status(404).json({
          code: 0,
          status: 404,
          message: "Không tìm thấy dữ liệu",
          data: data
        });
      }

    } catch (error) {
      res.status(500).json({
        code: 0,
        status: 500,
        message: "Internal Server Error",
        data: null
      })
    }
  }


}

module.exports = {
  getResultWithIdStuAndIdTest,
  getDetailTestWithIdStuAndIdTest,
  getAllResultHandler,
  getAllStaticWithIdResult,
  getDetailTestWithIdStuAndIdResult
};
