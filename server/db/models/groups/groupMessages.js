const Sequelize = require("sequelize");
const db = require("../../db");

const GroupMessage = db.define("groupMessage", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  readBy: {
    type: Sequelize.STRING,
    get: function () {
      return JSON.parse(this.getDataValue("readBy"));
    },
    set: function (val) {
      return this.setDataValue("readBy", JSON.stringify(val));
    },
  },
});

module.exports = GroupMessage;
