const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./config/database");

// Importation des modèles après la configuration de la base de données

// Middleware pour analyser les données de la demande
app.use(express.json());

// Importation des relations entre les tables
require("./models/association");

// Connexion à la base de données et synchronisation des modèles
db.authenticate()
  .then(() => {
    console.log("Database connected");
    return db.sync({ alter: true });
  })
  .then(() => {
    console.log("Models synchronized");
  })
  .catch((err) => {
    console.error("Error during database initialization:", err);
  });

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
