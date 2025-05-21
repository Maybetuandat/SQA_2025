const express = require("express");
const router = express.Router();

const controllerResult = require("../../controllers/user/result/result.controller");
// const controllerResult2 = require("../../controllers/admin/result/result.controller");

const { isAuth } = require("../../middleware/auth.middleware")

router.get("/", isAuth, controllerResult.index);

router.get("/tn", isAuth, controllerResult.resultTestOfStudent);
router.get("/tn/:idResult", isAuth, controllerResult.detailStudentAndTest);
router.get("/code", isAuth, controllerResult.submitOfStudent);
router.get("/code/:idSubmit", isAuth, controllerResult.source);
router.get("/test", controllerResult.test);
router.get("/test/:testId", isAuth, controllerResult.testWithId);
router.get("/test/:testId/:studentId", controllerResult.detailStudentAndTest);

// router.get("/:studentId/:testId", controllerResult2.detailStudentAndTest);
module.exports = router;
