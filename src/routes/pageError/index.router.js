const pageErrorController = require("./404.router.js");
module.exports = (app) => {
  app.use("/404", pageErrorController);
  app.use("/500", pageErrorController);
};
