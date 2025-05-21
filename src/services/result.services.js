const { default: Transaction } = require("sequelize/lib/transaction");
const db = require("../models/index");
const { sequelize } = require('../config/connectDB')
const { Op } = require('sequelize')
const { createNewDetail } = require('./detail.services')

const getResultByIdStuAndIdTest = async (idStu, idTest) => {
  const data = {
    status: null,
    data: null,
  };
  try {
    const res = await db.Result.findAll({
      raw: true,
      where: {
        MSV: idStu,
        MaBaiThi: idTest,
      },
    });
    ////console.log(res);
    if (res) {
      data.status = 200;
      data.data = res;
    } else {
      data.status = 404;
    }
    return data;
  } catch (e) {
    //console.log(e);
    data.status = 500;
    return data;
  }
};
const getResultByIdTest = async (idTest) => {
  const data = {
    status: null,
    data: null,
  };
  try {
    const res = await db.Result.findAll({
      raw: true,
      where: {
        MaBaiThi: idTest,
      },
    });
    ////console.log(res);
    if (res) {
      data.status = 200;
      data.data = res;
    } else {
      data.status = 404;
    }
    return data;
  } catch (e) {
    //console.log(e);
    data.status = 500;
    return data;
  }
};

const getAllResult = async (req, res) => {

  const data = {
    status: null,
    data: null,
  };
  try {
    const res = await db.Result.findAll();
    // //console.log(res);
    if (res.length > 0) {
      data.status = 200;
      data.data = res;
    } else {
      data.status = 404;
    }
    return data;
  } catch (e) {
    //console.log(e);
    data.status = 500;
    return data;
  }
}



const getResultWithIdResult = async (idResult) => {
  const data = {
    status: null,
    data: null,
  };

  try {
    const res = await db.Result.findAll({
      raw: true,
      where: {
        MaBaiThi: idResult,
      },
    });
    ////console.log(res);
    //neu ton tai -> 200
    // khong ton tai -> 400
    //truy van loi -> 500
    if (res.length > 0) {
      data.status = 200;
      data.data = res;
    } else {
      data.status = 404;
      data.data = null;
    }
  } catch (e) {
    //console.log(e);
    data.status = 500;
  }
  return data;
};

const getResultWithMaKetQua = async (idResult) => {
  const data = {
    status: null,
    data: null,
  };

  try {
    const res = await db.Result.findAll({
      raw: true,
      where: {
        MaKetQua: idResult,
      },
    });
    ////console.log(res);
    //neu ton tai -> 200
    // khong ton tai -> 400
    //truy van loi -> 500
    if (res.length > 0) {
      data.status = 200;
      data.data = res;
    } else {
      data.status = 404;
      data.data = null;
    }
  } catch (e) {
    //console.log(e);
    data.status = 500;
  }
  return data;
};

const getResultWithDate = async (Date) => { };

const getResultbyIdStuandIdResult = async (mkq) => {
  try {
    const result = await db.Result.findAll({
      where: {
        MaKetQua: mkq,
      },
      raw: true,
    });
    return result[0].Diem;
  } catch (error) {
    console.error("Lỗi khi truy vấn dữ liệu:", error);
    return null;
  }
};

const getResultListofStudent = async (msv) => {
  try {
    const resultList = await db.Result.findAll({
      where: {
        MSV: msv,
      },
      order: [["ThoiGianLamBai", "DESC"]],
      raw: true,
    });
    return resultList;
  } catch (error) {
    console.error("Lỗi khi truy vấn dữ liệu:", error);
    return null;
  }
};

const tinhdiem = async (questionList, testID, t) => {
  questionList.sort((a, b) => {
    if (a.macauhoi < b.macauhoi) {
      return -1;
    }
    if (a.macauhoi > b.macauhoi) {
      return 1;
    }
    return 0;
  });
  let cauhoi = [];
  try {
    cauhoi = await db.Option.findAll({
      where: {
        MaBaiThi: testID,
        Dung: "1",
      },
      attributes: ["MaCauHoi", "MaLuaChon"],
      raw: true,
      transaction: t,
    });
  } catch (error) {
    console.error("Lỗi khi truy vấn dữ liệu:", error);
    await t.rollback();
  }
  cauhoi.sort((a, b) => {
    if (a.macauhoi < b.macauhoi) {
      return -1;
    }
    if (a.macauhoi > b.macauhoi) {
      return 1;
    }
    return 0;
  });
  //console.log("questionlist: ", questionList);
  //console.log("cauhoi: ", cauhoi);
  let diem = [];
  for (var i = 0; i < questionList.length; i++) {
    if (questionList[i].maluachon == cauhoi[i].MaLuaChon) {
      diem[i] = 1;
    } else diem[i] = 0;
  }
  return diem;
};

const createNewResult = async (msv, test, questionList) => {
  let t;
  try {
    t = await sequelize.transaction();
    var diem = await tinhdiem(questionList, test.mabaithi, t);

    let tongdiem = 0;
    diem.forEach((element) => {
      // Thực hiện công việc với mỗi phần tử
      tongdiem += element;
    });
    tongdiem = ((tongdiem / diem.length) * 10).toFixed(2);
    //console.log(tongdiem);
    let result = await db.Result.create(
      {
        MSV: msv,
        MaBaiThi: test.mabaithi,
        Diem: tongdiem,
        ThoiGianLamBai: test.start,
        ThoiGianNopBai: test.finish,
      },
      { transaction: t }
    );
    //console.log('result:', result.dataValues.MaKetQua)

    for (var i = 0; i < questionList.length; i++) {
      if(questionList[i].maluachon != 'E') {
        await createNewDetail(
          questionList[i],
          result.dataValues.MaKetQua,
          test.mabaithi,
          i + 1,
          diem[i],
          t
        );
      }
    }
    await t.commit();
    return result;
  } catch (error) {
    console.error("Lỗi khi truy vấn dữ liệu:", error);
    await t.rollback();
    return false;
  }
};

const createSubmitCode = async (msv, submitid, problemname, namestatus, uri) => {
  try {
    // //console.log(status)
    let submit = await db.Submit.create(
      {
        MaSubmit: submitid,
        MSV: msv,
        TenVanDe: problemname,
        TrangThai: namestatus,
        Source: uri
      },
    )
    //console.log(submit)
  }
  catch (error) {
    //console.log(error)
  }
}



module.exports = {
  getResultWithIdResult,
  getResultWithDate,
  getResultByIdStuAndIdTest,
  getResultListofStudent,
  getResultbyIdStuandIdResult,
  createNewResult,
  getResultByIdTest,
  getResultWithMaKetQua,
  createSubmitCode 
};
