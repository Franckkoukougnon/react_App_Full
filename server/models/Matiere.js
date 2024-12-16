const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Matiere extends Model {}

Matiere.init(
  {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coefficient: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "matiere",
  }
);

module.exports = Matiere;
