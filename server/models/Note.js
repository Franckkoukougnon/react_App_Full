const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Note extends Model {}

Note.init(
  {
    note: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "note",
  }
);

module.exports = Note;
