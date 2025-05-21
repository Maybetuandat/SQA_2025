const { raw } = require("mysql2");
const db = require("../models/index");
const { where, Op } = require("sequelize");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const getAdminWithUsername = async (username) => {
    var data = { status: null, data: null };

    try {
        const admin = await db.Admin.findAll({
            raw: true,
            where: { UserName: username }
        });
        if (admin.length > 0) {
            data.status = 200;
            data.data = admin;
        } else {
            data.status = 404;
        }
        return data;
    } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu:", error);
        data.status = 500;
        return data;
    }
};
module.exports = { getAdminWithUsername };