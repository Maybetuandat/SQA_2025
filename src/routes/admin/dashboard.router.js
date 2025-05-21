const express = require("express");
const router = express.Router();
const dashboard = require("../../controllers/admin/dashboard/dashboard.controller")
router.get("/", dashboard.index);
module.exports = router;
