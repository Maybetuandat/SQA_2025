const db = require("../../../models/index");
module.exports.index = async (req, res) => {
  const admin = await db.Admin.findAll({raw:true});
  //console.log(admin);
  res.render("admin/pages/profile/index.pug", {
    titlePage: "Thông tin Admin",
    admin: admin[0],
  });
};
