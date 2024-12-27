const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors"); // Importez le middleware CORS
const db = require("./config/database");

// Importation des routes
const classeRoutes = require("./routes/ClasseRoute");
const eleveRoutes = require("./routes/EleveRoute");
const matiereRoutes = require("./routes/MatiereRoute");
const noteRoutes = require("./routes/NoteRoute");
const profRoutes = require("./routes/ProfRoute");

// Middleware pour analyser les données de la demande
app.use(express.json());
app.use(cors()); // Utilisez le middleware CORS

// Importation des relations entre les tables
require("./models/association");

// Utilisation des routes
app.use("/classes", classeRoutes);
app.use("/eleves", eleveRoutes);
app.use("/matieres", matiereRoutes);
app.use("/notes", noteRoutes);
app.use("/profs", profRoutes);

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

// Démarrer le serveur
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
