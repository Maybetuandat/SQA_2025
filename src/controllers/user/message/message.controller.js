
const jwtHelper = require("../../../helpers/jwt.helper");

require('dotenv').config()
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

const getMessage = async (req, res) => {
    const tokenFromClient = req.cookies.jwt;
    var room
    if (tokenFromClient) {
        try {
            const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
            room = decoded.data.id;
        } catch (error) {
        }
    }
    //console.log(room)
    res.render("user/pages/message/message.pug", {
        room: room
    });
}

module.exports = {
    getMessage
}