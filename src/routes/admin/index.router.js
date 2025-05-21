const viewResultRoutes = require("./viewResult.router");
const testListRoutes = require("./testList.router");
const accountManageRoutes = require("./account.router");
const profileRoutes = require("./profile.router");

const indexAdmin = require("./admin.login.router");
const statisticRouter = require("./statistic.router");
const permissionRouter = require("./permission.router");
const messageRouter = require("./message.router");
const dashboardRouter = require("./dashboard.router"); const errorRouter = require("./error.router");

const { isAdminPermission } = require("../../middleware/auth.middleware");
module.exports = (app) => {
  app.use("/admin/result", viewResultRoutes);
  app.use("/admin/test", isAdminPermission, testListRoutes);
  app.use("/admin/account", isAdminPermission, accountManageRoutes);
  app.use("/admin/profile", profileRoutes);
  app.use("/admin/statistic", isAdminPermission, statisticRouter);
  app.use("/admin/permission", isAdminPermission, permissionRouter);
  app.use("/admin/message", isAdminPermission, messageRouter);
  app.use("/admin/error", errorRouter);
  app.use("/admin", indexAdmin);
  app.use("/admin/dashboard", isAdminPermission, dashboardRouter);
};
