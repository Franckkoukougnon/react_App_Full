const Eleve = require("../models/Eleve");
const Classe = require("../models/Classe");

// Get All Eleves
const getAllEleves = async (req, res) => {
  try {
    const eleves = await Eleve.findAll();
    if (eleves.length === 0) {
      return res.status(404).json({
        error: "Aucun élève trouvé dans la base de données",
      });
    }

    res.json(eleves);
  } catch (err) {
    res.status(500).json({
      error: "Impossible de récupérer les élèves",
      details: err.message,
    });
  }
};

// Create eleve
const addEleveToClasse = async (req, res) => {
  try {
    const { classeId, nom, prenom, dateDeNaissance, adresse, sexe } = req.body;

    //Verifie si la classe existe
    const classe = await Classe.findByPk(classeId);
    if (!classe) {
      return res.status(404).json({
        error: "Classe non trouvée",
      });
    }
    // Créer un élève
    const eleve = await Eleve.create({
      nom,
      prenom,
      dateDeNaissance,
      adresse,
      sexe,
      classeId,
    });
    res.status(201).json({
      message: "Elève ajouté à la classe",
      eleve,
    });
  } catch (err) {
    res.status(500).json({
      error: "Impossible d'ajouter l'élève à la classe",
      details: err.message,
    });
  }
};

// Récupérer tous les élèves d'une classe
const getElevesByClasse = async (req, res) => {
  try {
    const { classeId } = req.params;

    // Vérifie que la classe existe
    const classe = await Classe.findByPk(classeId, {
      include: [{ model: Eleve, as: "eleves" }],
    });
    if (!classe) {
      return res.status(404).json({ error: "Classe non trouvée" });
    }

    res.json(classe);
  } catch (err) {
    res.status(500).json({
      error: "Impossible de récupérer les élèves",
      details: err.message,
    });
  }
};

module.exports = { getAllEleves, addEleveToClasse, getElevesByClasse };
