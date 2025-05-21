const db = require("../models/index");
const getOtpWithEmail = async (email) => {
    var data = { status: null, data: null };
    try {
        const otp = await db.otp.findAll({
            raw: true,
            where: { email: email }
        });
        if (otp.length > 0) {
            data.status = 200;
            data.data = otp;
        } else {
            data.status = 404;
        }
        return data;
    } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu:", error);
        data.status = 500;
        return data;
    }
}
const createOtp = async (email, start_time, end_time, otp_code) => {
    var data = { status: null, data: null };
    try {
        const otp = await db.otp.create({
            email: email,
            start_time: start_time,
            end_time: end_time,
            otp_code: otp_code
        });
        data.status = 200;

    } catch (error) {
        data.status = 500;

    }
    return data;
}
const deleteOtp = async (email) => {
    var data = { status: null, data: null };
    try {
        const otp = await db.otp.destroy({
            where: { email: email }
        });
        data.status = 200;
        return data;
    } catch (error) {
        console.error("Lỗi khi xóa OTP:", error);
        data.status = 500;
        return data;
    }
}
const updateOtp = async (email, start_time, end_time, otp_code) => {
    var data = { status: null, data: null };
    try {
        const otp = await db.otp.update({
            start_time: start_time,
            end_time: end_time,
            otp_code: otp_code
        }, {
            where: { email: email }
        });
        data.status = 200;
        return data;
    } catch (error) {
        console.error("Lỗi khi cập nhật OTP:", error);
        data.status = 500;
        return data;
    }
}
module.exports = {
    getOtpWithEmail,
    createOtp,
    deleteOtp, updateOtp
}