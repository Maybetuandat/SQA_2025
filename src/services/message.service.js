const { raw } = require("mysql2");
const db = require("../models/index");
const { where, Op } = require("sequelize");
const { default: Transaction } = require("sequelize/lib/transaction");

const getMessageByRoomId = async (id) => {
    var data = { status: null, data: null };
    try {
        const messages = await db.Message.findAll(
            {
                where: { MSV: id }
            }
            , {
                raw: true,
            });

        if (messages.length > 0) {
            data.status = 200;
            data.data = messages;
        }
        else {
            data.status = 404;
            data.data = "";
        }
        return data
    } catch (error) {
        //console.log(error);
        return { status: 500 }
    }
}

const saveMessage = async (content, id, isAdmin) => {
    var data = { status: null, data: null };
    try {
        const message = await db.Message.create({
            Content: content,
            MSV: id,
            fromAdmin: isAdmin
        });
        if (message) {
            data.status = 200;
        }
        else {
            data.status = 404;
        }
        return data;
    } catch (error) {
        data.status = 500;
        return data;
    }
}
module.exports = {
    getMessageByRoomId,
    saveMessage
}