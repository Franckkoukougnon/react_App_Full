const Matiere = require("../models/Matiere");
const Classe = require("../models/Classe");
const Prof = require("../models/Prof");

// Get All Matieres
const getAllMatieres = async (req, res) => {
  try {
    const matieres = await Matiere.findAll();
    if (matieres.length === 0) {
      return res.status(404).json({
        error: "Aucune matière trouvée dans la base de données",
      });
    }
    res.json(matieres);
  } catch (err) {
    res.status(500).json({
      error: "impossible de récupérer les matières",
      details: err.message,
    });
  }
};

// Create Matiere
const addMatiereToClasse = async (req, res) => {
  try {
    const { classeId, nom, coefficient } = req.body;

    //Verifie si la classe existe
    const classe = await Classe.findByPk(classeId);
    if (!classe) {
      return res.status(404).json({
        error: "Classe non trouvée",
      });
    }
    // Créer une matière
    const matiere = await Matiere.create({
      nom,
      coefficient,
      classeId,
    });
    res.status(201).json({
      message: "Matière ajoutée à la classe",
      matiere,
    });
  } catch (err) {
    res.status(500).json({
      error: "Impossible d'ajouter la matière à la classe",
      details: err.message,
    });
  }
};

// Récupérer toutes les matières d'une classe
const getMatieresByClasse = async (req, res) => {
  try {
    const { classeId } = req.params;

    const matieres = await Matiere.findAll({ where: { classeId } });
    if (matieres.length === 0) {
      return res.status(404).json({
        error: "Aucune matière trouvée pour cette classe",
      });
    }
    res.json({
      matieres,
      classe: matieres[0].classe,
      message: "Matières trouvées pour la classe",
    });
  } catch (err) {
    res.status(500).json({
      error: "Impossible de récupérer les matières",
      details: err.message,
    });
  }
};

// Récupérer tous les professeurs d'une matière
const getProfsByMatiere = async (req, res) => {
  try {
    const { matiereId } = req.params;

    const profs = await Prof.findAll({ where: { matiereId } });
    if (profs.length === 0) {
      return res.status(404).json({
        error: "Aucun professeur trouvé pour cette matière",
      });
    }

    res.json(profs);
  } catch (err) {
    res.status(500).json({
      error: "Impossible de récupérer les professeurs de la matière",
      details: err.message,
    });
  }
};

// Modifier les professeurs
const updateProfsByMatiere = async (req, res) => {
  try {
    const { matiereId } = req.params;
    const { profs } = req.body;

    const matiere = await Matiere.findByPk(matiereId);
    if (!matiere) {
      return res.status(404).json({
        error: "Matière non trouvée",
      });
    }

    await matiere.setProfs(profs);
    res.json({
      message: "Professeurs mis à jour pour la matière",
      matiere,
    });
  } catch (err) {
    res.status(500).json({
      error: "Impossible de mettre à jour les professeurs de la matière",
      details: err.message,
    });
  }
};

// Supprimer une matière
const deleteMatiere = async (req, res) => {
  try {
    const { matiereId } = req.params;

    const matiere = await Matiere.findByPk(matiereId);
    if (!matiere) {
      return res.status(404).json({
        error: "Matière non trouvée",
      });
    }

    await matiere.destroy();
    res.json({
      message: "Matière supprimée",
    });
  } catch (err) {
    res.status(500).json({
      error: "Impossible de supprimer la matière",
      details: err.message,
    });
  }
};

module.exports = {
  getAllMatieres,
  addMatiereToClasse,
  getMatieresByClasse,
  getProfsByMatiere,
  updateProfsByMatiere,
  deleteMatiere,
};
