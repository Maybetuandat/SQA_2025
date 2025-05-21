
const db = require("../../../models/index");
const { getAdminWithUsername } = require("../../../services/admin.service")

const { createTokenResponse } = require('../../auth.controllers')

let tokenList = {};

module.exports.index = async (req, res) => {

    // res.render("user/login.pug", {
    //     titlePage: "Thông tin cá nhân"
    // });
    // const response = {
    //     code: 0,
    //     status: 500,
    //     message: "Truy vấn cơ sở dữ liệu thất bại",
    // };
    // res.status(500).json(response);
    res.render("admin/pages/login/login.pug", {
        titlePage: "Đăng nhập "
    });
};
module.exports.checkLoginAdmin = async (req, res) => {
    const { username, password } = req.body;
    let data = await getAdminWithUsername(username);
    if (data.status != 200) {
        const response = {
            message: "Thông tin tài khoản hoặc mật khẩu không chính xác",
            title: "Thất bại",
        };
        res.render("admin/pages/login/login.pug", {
            data: response
        });
    }
    else {
        const admin = data.data[0];
        console.log(admin.Pass, password);
        if (admin.Pass == password) {


            const userData = {
                id: req.body.username,
                role: data.data[0].Role_id,
                email: data.data[0].Email,
            };

            data = await createTokenResponse(userData)

            response = {
                code: 1,
                status: 200,
                message: "Đăng nhập thành công",
                // data: data
            };
            res.cookie("jwt", data.accessToken, { maxAge: 86400000, httpOnly: true, SameSite: "None" });
            return res.redirect("/admin/dashboard")
            res.status(200).json({ message: "Đăng nhập thành công" });

        }
        else {
            const response = {
                message: "Thông tin tài khoản hoặc mật khẩu không chính xác",
                title: "Thất bại",
            };

            res.render("admin/pages/login/login.pug", {
                data: response
            });
        }
    }
    // ddungs thi lam lam gi do

}