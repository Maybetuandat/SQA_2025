const express = require("express");
const router = express.Router();
const Error = require("../../controllers/pageError.controller");
router.get("/", Error.page404);
module.exports = router;
