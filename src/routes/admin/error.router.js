const express = require("express");
const router = express.Router();
const { errorRedirect } = require("../../controllers/admin/error/error.controller");
router.get("/", errorRedirect);
module.exports = router;