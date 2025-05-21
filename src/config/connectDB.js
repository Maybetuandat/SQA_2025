const { Sequelize } = require("sequelize");
require('dotenv').config()
const sequelize = new Sequelize("blzgbosgrt5jimzh2ude", "uhv7bqutywjwtaga", "s9uR0I1udWuGpSWmat3d", {
  host: "blzgbosgrt5jimzh2ude-mysql.services.clever-cloud.com",
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