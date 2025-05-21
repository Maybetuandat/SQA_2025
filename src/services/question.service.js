
const { default: Transaction } = require("sequelize/lib/transaction");
const db = require("../models/index");

const getAllQuestion = async () => {
    var data = { status: null, data: null };
    try {
        const questions = await db.Question.findAll();
        if (questions.length > 0) {
            data.status = 200
            data.data = questions
        }
        else {
            data.status = 404
        }
        return data
    } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu:", error);
        data.status = 500
        return data;
    }
}

const getQuestionOfTest = async (id) => {
    var data = { status: null, data: null };
    try {
        var questions = await db.Question.findAll(
            {
                where: {
                    MaBaiThi: id
                },
                raw: true
            }
        );
        var allOptions = await db.Option.findAll({
            raw: true
        });
        for (var question of questions) {

            var filterOptions = await allOptions.filter(option => option.MaBaiThi === question.MaBaiThi && option.MaCauHoi === question.MaCauHoi);

            question.LuaChon = filterOptions.map(option => {
                const { MaBaiThi, MaCauHoi, ...rest } = option;
                return rest;
            });
        }

        questions = await questions.map(question => {
            const { MaBaiThi, ...rest } = question;
            return rest
        })
        if (questions.length > 0) {
            data.status = 200
            data.data = questions
        }
        else {
            data.status = 404
        }
        return data
    } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu:", error);
        data.status = 500
        return data;
    }
}

const createNewQuestion = async (question, testId, index, t) => {
    try {
        await db.Question.create(
            {
                MaCauHoi: 'C' + String(index).padStart(2, '0'),
                MaBaiThi: testId,
                DeBai: question.questionContent,
                SoThuTu: index,
                TheLoai: "Trắc nghiệm",
            },
            { transaction: t }
        )
        for (var i = 1; i <= 4; i++) {
            var answerProperty = 'answer' + i
            var correct = 0
            if (question.check == i) {
                correct = 1
            }
            await db.Option.create({
                MaCauHoi: 'C' + String(index).padStart(2, '0'),
                MaLuaChon: String.fromCharCode('A'.charCodeAt(0) + i - 1),
                MaBaiThi: testId,
                Dung: correct,
                NoiDung: question[answerProperty]

            },
                { transaction: t }
            )
        }
    }
    catch (error) {
        t.rollback()
    }
}
const getQuestionOfTestUser = async (id) => {
    try {
        const questions = await db.Question.findAll(
            {
                where: {
                    MaBaiThi: id
                },
                raw: true
            }
        );
        const allOptions = await db.Option.findAll(
            {
                attributes: { exclude: ['Dung'] }
            }
        );
        for (var question of questions) {
            question.LuaChon = await allOptions.filter(option => option.MaBaiThi === question.MaBaiThi && option.MaCauHoi === question.MaCauHoi);
        }
        return questions;

    } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu:", error);
        return null;
    }
}



module.exports = { getAllQuestion, getQuestionOfTest, createNewQuestion, getQuestionOfTestUser }
