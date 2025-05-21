const db = require("../models/index");
const { Sequelize } = require("sequelize");
const moment = require('moment');
const laythongkemon = async () => {
    var data = { status: null, first: null, second: null };
    try {
        // Lấy danh sách thể loại và số lượng của mỗi thể loại
        const categoriesAndCounts = await db.Test.findAll({
            attributes: ['TheLoai', [db.sequelize.fn('COUNT', 'TheLoai'), 'SoLuong']],
            group: ['TheLoai']
        });
        data.status = 200;
        // Assumed that tests is an array containing Test objects

        // Lấy các giá trị SoLuong và TheLoai từ mỗi đối tượng Test
        var first = [];
        var second = [];
        for (var i = 0; i < categoriesAndCounts.length; i++) {
            first.push(categoriesAndCounts[i].dataValues.TheLoai);
            second.push(categoriesAndCounts[i].dataValues.SoLuong);
        }
        data.first = first;
        data.second = second;
        return data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        throw error;
    }
}

// viết cho tôi hàm có tác dụng là lấy tất cả dữ liệu từ model thống kê, sau đó trả về dữ liệu đó
const getAllStatistic = async () => {
    var data = { status: null, data: null };
    try {
        const totalData = await db.thongke.findOne({
            attributes: [
                [db.sequelize.fn('SUM', db.sequelize.col('LuotXem')), 'TongLuotXem'],
                [db.sequelize.fn('SUM', db.sequelize.col('TaiKhoanMoi')), 'TongTaiKhoanMoi'],
                [db.sequelize.fn('SUM', db.sequelize.col('BaiThiMoi')), 'TongBaiThiMoi'],
                [db.sequelize.fn('SUM', db.sequelize.col('SoLanLamBaiTheoThang')), 'TongSoLanLamBaiTheoThang']
            ]
        });
        data.status = 200;
        data.data = totalData;

        return data;
    } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu:", error);
        data.status = 500;
        return data;
    }

}

const getStudentsWithHighestAverageScore = async () => {
    try {
        const highestAverageScoreStudents = await db.Result.findAll({
            attributes: [
                'MSV',
                [Sequelize.fn('AVG', Sequelize.col('Diem')), 'averageScore']
            ],
            group: ['MSV'],
            order: [[Sequelize.literal('averageScore'), 'DESC']],
            include: [{
                model: db.Student,
                attributes: ['Ten', 'Lop'] // Chọn các trường thông tin sinh viên cần hiển thị
            }]
        });
        return highestAverageScoreStudents;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        throw error;
    }
}
const getAllNumberofStudent = async () => {
    var data = { status: null, length: null };

    try {
        const students = await db.Student.findAll({
            raw: true,
        });
        if (students.length > 0) {
            data.status = 200;
            data.length = students.length;
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
const LaySoLuongToanBoBaiThi = async () => {
    try {
        const tests = await db.Test.findAll();
        const length = tests.length;
        const status = length > 0 ? 200 : 404;

        return { status, length };
    } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu:", error);
        return { status: 500, length: 0 };
    }
};


const LaySoLuongToanBoKetQua = async () => {
    try {
        var results = await db.Result.findAll();
        const length = results.length;
        const status = length > 0 ? 200 : 404;

        return { status, length };
    } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu:", error);
        return { status: 500, length: 0 };
    }
};
const LayNguoiDungMoiTrongMotThang = async () => {
    const data = { status: null, length: null };
    try {
        // Tạo thời gian bắt đầu là một tháng trước đến thời điểm hiện tại
        const startTime = moment().subtract(1, 'month').toDate(); // Chuyển thành kiểu Date

        // Truy vấn cơ sở dữ liệu để lấy người dùng mới trong khoảng thời gian đã chỉ định
        const nguoiDungMoi = await db.Student.findAll({
            where: {
                ThoiGian: {
                    [Sequelize.Op.gte]: startTime // Lớn hơn hoặc bằng thời gian bắt đầu
                }
            }
        });
        if (nguoiDungMoi.length > 0) {
            data.status = 200;
            data.length = nguoiDungMoi.length;
        }
        else {
            data.status = 404;
            data.length = 0;
        }
        return nguoiDungMoi;
    } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu:", error);
        throw error;
    }
};

// Sử dụng hàm trên để lấy người dùng mới trong khoảng thời gian một tháng trước đến thời điểm hiện tại
const LaySoLuongSinhVienTheoThang = async () => {
    const data = { status: null, first: null, second: null };
    try {
        // Tạo truy vấn để đếm số lượng sinh viên trong mỗi tháng
        const result = await db.Student.findAll({
            attributes: [
                [db.sequelize.fn('MONTH', db.sequelize.col('ThoiGian')), 'month'],
                [db.sequelize.fn('COUNT', db.sequelize.col('MSV')), 'count']
            ],
            group: [db.sequelize.fn('MONTH', db.sequelize.col('ThoiGian'))],
            raw: true
        });
        if (result.length > 0) {
            data.status = 200;
            console.log(result[0].month);
            result.sort(function (a, b) {
                return a.month - b.month;
            });
            var first = [];
            var second = [];
            for (var i = 0; i < result.length; i++) {
                first.push(result[i].month);
                second.push(result[i].count);
            }
            data.first = first;
            data.second = second;
        }
        else {
            data.status = 404;
        }

        return data;
    } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu:", error);
        throw error;
        data.status = 500;
    }
    return data;
};

module.exports = { getStudentsWithHighestAverageScore, LaySoLuongSinhVienTheoThang, LayNguoiDungMoiTrongMotThang, LaySoLuongToanBoKetQua, LaySoLuongToanBoBaiThi, getAllStatistic, laythongkemon, getAllNumberofStudent }