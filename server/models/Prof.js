const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Prof extends Model {}

Prof.init(
  {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateDeNaissance: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sexe: {
      type: DataTypes.ENUM("M", "F"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "prof",
  }
);

module.exports = Prof;
