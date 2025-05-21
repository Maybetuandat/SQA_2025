const connection = require("../config/database.config");
const db = require("../models/index");

const getAllStudent = async () => {
    const students = await connection.query(
        `SELECT * FROM sinhvien`
    )
    return students
}

const getAllUsers = async () => {
    try {
        const users = await db.User.findAll();
        return users;
    } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu:", error);
        return null;
    }
}

const getAllTest = async () => {
    try {
        const tests = await db.Test.findAll({ include: db.Question });
        return tests;
    } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu:", error);
        return null;
    }
}

const getAllQuestion = async () => {
    try {
        const questions = await db.Question.findAll();
        return questions;
    } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu:", error);
        return null;
    }
}


module.exports = { getAllStudent, getAllTest }