const Sequelize = require("sequelize");
const db = require("../config/db");

const Employee = db.define(
  "employee",
  {
    first_name: { type: Sequelize.STRING },
    last_name: { type: Sequelize.STRING },
    phone_number: { type: Sequelize.STRING },
    dob: { type: Sequelize.DATEONLY },
    current_position: { type: Sequelize.STRING },
    bank_account: { type: Sequelize.STRING },
    bank_account_number: { type: Sequelize.INTEGER },
    province: { type: Sequelize.STRING },
    city: { type: Sequelize.STRING },
    address: { type: Sequelize.TEXT },
    ktp_number: { type: Sequelize.INTEGER },
    image_url: { type: Sequelize.STRING },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Employee;
