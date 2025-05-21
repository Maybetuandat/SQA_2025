const express = require("express");
const router = express.Router();

const messageCon = require("../../controllers/admin/message/message.controller");
router.get("/:room", messageCon.getMessage);
module.exports = router;