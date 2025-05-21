const indexUser = require("./user");
const userListTest = require("./usertestlist.router");
const userResult = require("./viewResult.router");
const profileRoutes = require("./profile.router");
const { isAuth } = require('../../middleware/auth.middleware')

module.exports = (app) => {
  app.use("/", indexUser);
  app.use("/practice", isAuth, userListTest);
  app.use("/result", isAuth, userResult);
  app.use("/profile", isAuth, profileRoutes)
};
