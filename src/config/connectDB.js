const { Sequelize } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize("quiz", "maybetuandat", "123456", {
  host: "localhost",
  port: "3306",
  dialect: "mysql",
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    //console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { connection, sequelize };
