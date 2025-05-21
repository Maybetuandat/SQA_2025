const { saveMessage, getMessageByRoomId } = require('../services/message.service')

const jwtHelper = require("../helpers/jwt.helper");

require('dotenv').config()
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

const saveMessageHandler = async (req, res) => {
    const data = req.body;
    // //console.log(data);
    try {
        const result = await saveMessage(data.message, data.room, data.isAdmin);
        if (result.status == 200) {
            res.status(200).json({ message: 'Message saved successfully' })
        }
        else {
            res.status(404).json({ message: 'Message not saved' })
        }
    } catch (error) {
        //console.log(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const getMessageByRoomIdHandler = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await getMessageByRoomId(id);
        if (result.status == 200) {
            res.status(200).json({ data: result.data })
        }
        else if (result.status == 404) {
            res.status(404).json({ message: 'Không có tin nhắn nào' })
        }
        else {
            res.status(500).json({ message: 'Internal server error' })
        }
    } catch (error) {
        //console.log(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const getMessageRoom = async (req, res) => {
    const tokenFromClient = req.cookies.jwt;
    var room
    if (tokenFromClient) {
        try {
            const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
            room = decoded.data.id;
            return res.status(200).json({ room: room })
        } catch (error) {
            return null;
        }
    }
    else {
        return null;
    }
}

module.exports = { saveMessageHandler, getMessageByRoomIdHandler, getMessageRoom }