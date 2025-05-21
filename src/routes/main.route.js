// const viewResultRoutes = require("./viewResult.router");
// const profileRoutes = require("./profile.router");
const apiRoutes = require("./api.route");
// const indexUser = require("../user/user.index")
module.exports = (app) => {
  // admin
  // app.use("/admin/result", viewResultRoutes);
  // app.use("/admin/profile", profileRoutes);
  //user
  // app.use("/", indexUser);
  app.use("/api", apiRoutes)
};
