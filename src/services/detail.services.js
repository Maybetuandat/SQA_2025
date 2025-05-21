const { raw } = require("mysql2");
const db = require("../models/index");
const { where, Op } = require("sequelize");
const { default: Transaction } = require("sequelize/lib/transaction");

const getDetailListWithIdResult = async (idResult) => {
  const data = await db.Detail.findAll({
    raw: true,
    where: {
      MaKetQua: idResult,
    },
  });
  return data;
};



const getDetailListWithIdResultandIdStu = async (mkq, msv) => {
  try {
    let result = await db.Result.findAll(
      {
        where: {
          MaKetQua: mkq,
          MSV: msv
        },
        raw: true
      }
    );
    if (result) {
      let details = await db.Detail.findAll(
        {
          where: {
            MaKetQua: mkq,
          },
          raw: true
        }
      );
      let allQuestions = await db.Question.findAll({
        raw: true
      });
      for (let detail of details) {
        let filterQuestions = await allQuestions.filter(question => detail.MaBaiThi === question.MaBaiThi && detail.MaCauHoi === question.MaCauHoi);

        detail.DeBai = filterQuestions.map(question => {
          const { MaBaiThi, MaCauHoi, ...rest } = question;
          return rest;
        });
      }
      let allOptions = await db.Option.findAll({
        raw: true
      });
      for (let detail of details) {
        let filterOptions = await allOptions.filter(option => detail.MaBaiThi === option.MaBaiThi && detail.MaCauHoi === option.MaCauHoi);

        detail.LuaChon = filterOptions.map(option => {
          const { MaBaiThi, MaCauHoi, ...rest } = option;
          return rest;
        });
      }

      return details
    }

    else return null
  } catch (error) {
    console.error("Lỗi khi truy vấn dữ liệu:", error);
    return null;
  }
}

const createNewDetail = async (question, maketqua, mabaithi, index, dung, t) => {
  try {
    await db.Detail.create(
      {
        MaChiTiet: 'CT' + String(index).padStart(2, '0'),
        MaKetQua: maketqua,
        MaBaiThi: mabaithi,
        MaCauHoi: question.macauhoi,
        MaLuaChon: question.maluachon,
        Dung: dung
      },
      { transaction: t }
    )
  }
  catch (error) {
    t.rollback()
  }
}


module.exports = {
  getDetailListWithIdResult, getDetailListWithIdResultandIdStu, createNewDetail
};
