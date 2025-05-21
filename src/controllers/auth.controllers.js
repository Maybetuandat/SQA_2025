require('dotenv').config()
const jwtHelper = require("../helpers/jwt.helper");
const { getStudentById } = require('../services/student.service')
const testServices = require("../services/test.service");
const bcrypt = require('bcrypt');
const saltRounds = 10;

let tokenList = {};

// Thời gian sống của token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "24h";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
// Thời gian sống của refreshToken
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET

const refreshToken = async (req, res) => {

    const refreshTokenFromClient = req.body.refreshToken;



    if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
        try {

            const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);

            const userFakeData = decoded.data;

            const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);


            return res.status(200).json({ accessToken });
        } catch (error) {
            res.status(403).json({
                code: 0,
                status: 403,
                message: 'Invalid refresh token.',
            });
        }
    } else {

        return res.status(403).send({
            code: 0,
            status: 403,
            message: 'No token provided.',
        });
    }
};

const checkLoginApp = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        const response = {
            code: 0,
            status: 404,
            message: "Yêu cầu điền thông tin đầy đủ",
        };

        res.status(404).json(response);
    }
    else {
        let data = await getStudentById(req.body.username);
        if (data.status === 404) {
            const response = {
                code: 0,
                status: 404,
                message: "Đăng nhập thất bại",
            };
            res.status(400).json(response);
        }
        if (data.status === 500) {
            const response = {
                code: 0,
                status: 500,
                message: "Đăng nhập thất bại",
            };
            res.status(500).json(response);
        }
        if (data.status === 200) {
            var ok = await bcrypt.compareSync(req.body.password, data.data[0].MatKhau);
            let response = {}
            if (ok) {
                response = {
                    code: 1,
                    status: 200,
                    message: "Đăng nhập thành công",

                };
                res.status(200).json(response);
            }
            else {
                response = {
                    code: 0,
                    status: 404,
                    title: "Đăng nhập thất bại",
                    message: "Thông tin tài khoản hoặc mật khẩu không chính xác",
                };
                res.status(404).json(response);
            }
        }
    }
}

const checkLoginUser = async (req, res) => {
    // //console.log(req.params.role)
    // if (req.params.role === 'user') {
    //check valid user and password
    if (!req.body.msv || !req.body.password) {
        const response = {
            code: 0,
            status: 400,
            message: "Yêu cầu điền thông tin đầy đủ",
        };

        res.status(400).json(response);
    }
    else {
        // check database
        let data = await getStudentById(req.body.msv);
        //status = 200 -> tim thay sinh vien -> check password 
        //status = 404 -> khong tim thay sinh vien -> response failed to login 
        //status = 500 -> lỗi trong quá trình xử lý
        if (data.status === 404) {
            const response = {
                code: 0,
                status: 404,
                message: "Đăng nhập thất bại",
            };
            res.render("user/login.pug", {
                data: response,
            });
        }
        if (data.status === 500) {
            const response = {
                code: 0,
                status: 500,
                message: "Đăng nhập thất bại",
            };
            res.render("user/login.pug", {
                data: response,
            });
        }
        if (data.status === 200) {
            var ok = await bcrypt.compareSync(req.body.password, data.data[0].MatKhau);
            let response = {}
            if (ok) {
                console.log(data.data[0])
                const userData = {
                    id: req.body.msv,
                    role: req.params.role,
                    email: data.data[0].email,
                };

                data = await createTokenResponse(userData)

                response = {
                    code: 1,
                    status: 200,
                    message: "Đăng nhập thành công",
                    // data: data
                };
                res.cookie("jwt", data.accessToken, { maxAge: 86400000, httpOnly: true, SameSite: "None" });
                return res.redirect("/result")
            }
            else {
                response = {
                    code: 0,
                    status: 404,
                    title: "Đăng nhập thất bại",
                    message: "Thông tin tài khoản hoặc mật khẩu không chính xác",
                };
                res.render("user/login.pug", {
                    data: response,
                });
                // res.status(404).json(response);
            }

        }
    }



}

const createTokenResponse = async (userData) => {
    // //console.log(userData);


    const accessToken = await jwtHelper.generateToken(userData, accessTokenSecret, accessTokenLife);
    const refreshToken = await jwtHelper.generateToken(userData, refreshTokenSecret, refreshTokenLife);

    // Lưu lại 2 mã access & Refresh token, với key chính là cái refreshToken để đảm bảo unique và không sợ hacker sửa đổi dữ liệu truyền lên.
    tokenList[refreshToken] = { accessToken, refreshToken };

    return { accessToken, refreshToken }
}

module.exports = {
    refreshToken, checkLoginUser, createTokenResponse, checkLoginApp
}