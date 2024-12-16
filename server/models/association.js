const Classe = require("./Classe");
const Eleve = require("./Eleve");
const Prof = require("./Prof");
const Matiere = require("./Matiere");
const Note = require("./Note");

// Définir les relations

// Classe et Eleve
Classe.hasMany(Eleve, {
  foreignKey: "classeId",
  as: "eleves",
});

Eleve.belongsTo(Classe, {
  foreignKey: "classeId",
  as: "classe",
});

// Classe et Prof (Many-to-Many)
Classe.belongsToMany(Prof, {
  through: "ClasseProfs",
  foreignKey: "classeId",
  otherKey: "profId",
  as: "profs",
});

Prof.belongsToMany(Classe, {
  through: "ClasseProfs",
  foreignKey: "profId",
  otherKey: "classeId",
  as: "classes",
});

// Classe et Matiere (One-to-Many)
Classe.hasMany(Matiere, {
  foreignKey: "classeId",
  as: "matieres",
});

Matiere.belongsTo(Classe, {
  foreignKey: "classeId",
  as: "classe",
});

// Prof et Matiere (One-to-Many)
Prof.hasMany(Matiere, {
  foreignKey: "profId",
  as: "matieres",
});

Matiere.belongsTo(Prof, {
  foreignKey: "profId",
  as: "prof",
});

// Eleve et Note (One-to-Many)
Eleve.hasMany(Note, {
  foreignKey: "eleveId", // Clé étrangère dans le modèle Note
  as: "notes", // Alias pour accéder aux notes d'un élève
});

Note.belongsTo(Eleve, {
  foreignKey: "eleveId", // Clé étrangère qui lie une note à un élève
  as: "eleve", // Alias pour accéder à l'élève d'une note
});

// Matiere et Note (One-to-Many)
Matiere.hasMany(Note, {
  foreignKey: "matiereId", // Clé étrangère dans le modèle Note
  as: "notes", // Alias pour accéder aux notes d'une matière
});

Note.belongsTo(Matiere, {
  foreignKey: "matiereId", // Clé étrangère qui lie une note à une matière
  as: "matiere", // Alias pour accéder à la matière d'une note
});

module.exports = { Classe, Eleve, Prof, Matiere, Note };
