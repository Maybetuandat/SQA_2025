const express = require("express");
const router = express.Router();

const controllerStudentAccount = require("../../controllers/admin/account/account.controller");
router.get("/", controllerStudentAccount.student);
module.exports = router;
