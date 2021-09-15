const Sequelize = require("sequelize");
const db = require("../../db");

const Members = db.define("members", {
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});


module.exports = Members;