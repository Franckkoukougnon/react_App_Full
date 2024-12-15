const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./config/database");

// Importation des modèles après la configuration de la base de données
const Post = require("./models/Post");
const Comment = require("./models/Comment");

// Middleware pour analyser les données de la demande
app.use(express.json());

// Définir les associations après l'importation des modèles
Post.hasMany(Comment, {
  foreignKey: "postId",
  as: "comments",
});
Comment.belongsTo(Post, {
  foreignKey: "postId",
  as: "post",
});

// Connexion à la base de données et synchronisation des modèles
db.authenticate()
  .then(() => {
    console.log("Database connected");
    return db.sync({ alter: true }); // Synchroniser les modèles
  })
  .then(() => {
    console.log("Models synchronized");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
