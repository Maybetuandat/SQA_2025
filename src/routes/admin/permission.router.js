const express = require("express");
const router = express.Router();

const renderPermissionPage = require("../../controllers/admin/permission/set-permission");
router.get("/", renderPermissionPage.getPermissions);
router.post("/save-permission", renderPermissionPage.savePermissions);
router.post("/update-admin", renderPermissionPage.updateAdmin);
router.get("/get-admin/:username", renderPermissionPage.getAdminData);
router.get("/hack", renderPermissionPage.genPass)
module.exports = router;