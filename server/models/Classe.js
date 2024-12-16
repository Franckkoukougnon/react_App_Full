const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Classe extends Model {}

Classe.init(
  {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "classe",
  }
);

module.exports = Classe;
