
const jwtHelper = require("../helpers/jwt.helper");

require('dotenv').config()
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

const { checkPermission } = require("../services/permission.service")

const isAuth = async (req, res, next) => {

    const tokenFromClient = req.cookies.jwt;
    // //console.log('token: ',tokenFromClient)
    if (tokenFromClient) {

        try {

            const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
            req.jwtDecoded = decoded;
            // //console.log(decoded)
            next();
        } catch (error) {
            return res.status(401).json({
                code: 0,
                status: 401,
                message: 'User Unauthorized.',
            });
        }
    } else {
        return res.redirect('/')
    }
}

const isAdmin = async (req, res, next) => {
    const tokenFromClient = req.cookies.jwt;
    if (tokenFromClient) {
        try {
            const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
            // //console.log(decoded);
            if (decoded.data.role === 'admin') {
                next();
            } else {
                return res.status(401).json({
                    code: 0,
                    status: 401,
                    message: 'Không có quyền admin'
                });
            }
        } catch (error) {
            return res.status(401).json({
                code: 0,
                status: 401,
                message: 'Unauthorized.'
            });
        }
    } else {
        return res.status(403).json({
            code: 0,
            status: 403,
            message: 'No token provided.'
        });

    }
}

const isAdminPermission = async (req, res, next) => {
    var orginUrl = req.originalUrl;
    //console.log(req.params.id)
    var len = Object.keys(req.params).length;
    var count = orginUrl.split(/[\/?]/);
    // console.log("len:", len)
    // console.log("count:", count)
    var url
    // if (len > 0) {
    //     url = orginUrl.substring(0, orginUrl.indexOf('/', 1));
    // }
    // else {
    //     url = orginUrl;
    // }

    // url = orginUrl.substring(0, orginUrl.indexOf('/', 3));

    url = '/' + count[1] + '/' + count[2]

    // //console.log(url);
    // //console.log("hê")

    const tokenFromClient = req.cookies.jwt;
    // //console.log(req.cookies)
    // //console.log(tokenFromClient)
    if (tokenFromClient) {
        try {
            const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
            // //console.log(decoded);

            var role = decoded.data.role;
            var check = await checkPermission(url, role);
            if (check.status == 200) {
                next();
            } else {
                return res.redirect('/admin/error')
                return res.status(401).json({
                    code: 0,
                    status: 401,
                    message: 'Không có quyền admin'
                });
            }
        } catch (error) {
            console.log(error);
            return res.redirect('/admin/error')
            return res.status(401).json({
                code: 0,
                status: 401,
                message: 'Unauthorized.'
            });
        }
    } else {
        return res.redirect('/admin')
        return res.status(403).json({
            code: 0,
            status: 403,
            message: 'No token provided.'
        });

    }
}

module.exports = {
    isAuth,
    isAdmin,
    isAdminPermission
};