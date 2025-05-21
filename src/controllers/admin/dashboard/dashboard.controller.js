
const db = require("../../../models/index");
const { getAllStatistic, LaySoLuongToanBoBaiThi, LaySoLuongSinhVienTheoThang, LayNguoiDungMoiTrongMotThang, LaySoLuongToanBoKetQua, getStudentsWithHighestAverageScore, laythongkemon, getAllNumberofStudent } = require("../../../services/statistic.service");
module.exports.index = async (req, res) => {

    var data = await getAllNumberofStudent();
    var TongSoBaiThi = await LaySoLuongToanBoBaiThi();
    // console.log(TongSoBaiThi);
    var TongSoKetQua = await LaySoLuongToanBoKetQua();

    var nguoiDungMoi = await LayNguoiDungMoiTrongMotThang();
    var data1 = await LaySoLuongSinhVienTheoThang();
    var data2 = await laythongkemon();
    console.log(data1);
    // console.log(data2.first);
    // console.log(data2.second);
    var data3 = await getStudentsWithHighestAverageScore();

    if (data.status != 200) {
        console.log("Lỗi khi lấy dữ liệu thống kê");
    }
    else {

        res.render("admin/pages/dashboard/index.pug", {
            titlePage: "Đăng nhập ",
            TongSoNguoiDung: data.length,
            TongSoBaiThi: TongSoBaiThi.length,
            TongSoKetQua: TongSoKetQua.length,
            NguoiDungMoi: nguoiDungMoi.length,
            data1: data1,
            data2: data2,
            data3: data3
        });
    }



};