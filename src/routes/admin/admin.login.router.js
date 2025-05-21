const express = require("express");
const router = express.Router();
const admin = require("../../controllers/admin/login/login.controller")
router.get("/", admin.index);
router.post("/checkLoginAdmin", admin.checkLoginAdmin);
module.exports = router;
