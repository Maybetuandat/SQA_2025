const db = require("../../../models/index");
const jwtHelper = require("../../../helpers/jwt.helper");
const secretKey = process.env.ACCESS_TOKEN_SECRET
module.exports.index = async (req, res) => {
  const token = req.cookies.jwt;
  const decoded = await jwtHelper.verifyToken(token, secretKey);
  //console.log(decoded)
  let msv = decoded.data.id

  const user = await db.Student.findAll({ where: { MSV: msv }, raw: true });
  //console.log(user);
  res.render("user/pages/profile/index.pug", {
    titlePage: "Thông tin Admin",
    admin: user[0],
  });
};
