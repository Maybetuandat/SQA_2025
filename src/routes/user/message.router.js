const express = require("express");
const router = express.Router();

const messageCon = require("../../controllers/user/message/message.controller");
router.get("/", messageCon.getMessage);
module.exports = router;