const sequelize = require("sequelize");

const db = new sequelize("employee", "root", "", {
  dialect: "mysql",
});

db.sync({});

module.exports = db;
