const express = require("express");
const router = express.Router();
const db = require("../../models/index");
const User = require("../../controllers/user/user.controller");
const { checkLoginUser } = require("../../controllers/auth.controllers");


router.get('/', User.index);
router.post('/checkLoginUser', checkLoginUser);
router.get('/register', User.register);
router.post('/register/createNewUser', User.createUser);
router.get('/forgotPassword', User.forgotPassword_index);
router.post('/forgotPassword/resetPassword', User.forgotPassword);
router.post('/forgotPassword/resetPassword/verifyOTP', User.verifyOTP);

router.post('/forgotPassword/resetPassword/verifyOTP/newPassword', User.changePassword);
module.exports = router;