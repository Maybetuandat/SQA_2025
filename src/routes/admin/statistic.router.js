const express = require("express");
const router = express.Router();

const statisticController = require("../../controllers/admin/statistic/statistic.controller");
const { isAuth } = require("../../middleware/auth.middleware");

router.get("/test", statisticController.testStatistic);
router.get("/student", statisticController.studentStatistic);
module.exports = router;
