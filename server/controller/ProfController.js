const Classe = require("../models/Classe");
const Prof = require("../models/Prof");

// Get All Profs
const getAllProfs = async (req, res) => {
  try {
    const profs = await Prof.findAll();
    if (profs.length === 0) {
      return res.status(404).json({
        error: "Aucun professeur trouvé dans la base de données",
      });
    }
    res.json(profs);
  } catch (err) {
    res.status(500).json({
      error: "Impossible de récupérer les professeurs",
      details: err.message,
    });
  }
};

// Create prof
const addProfToClasse = async (req, res) => {
  try {
    const { classeId, nom, prenom, dateDeNaissance, adresse, sexe } = req.body;

    //Verifie si la classe existe
    const classe = await Classe.findByPk(classeId);
    if (!classe) {
      return res.status(404).json({
        error: "Classe non trouvée",
      });
    }
    // Créer un professeur
    const prof = await Prof.create({
      nom,
      prenom,
      dateDeNaissance,
      adresse,
      sexe,
      classeId,
    });
    res.status(201).json({
      message: "Professeur ajouté à la classe",
      prof,
    });
  } catch (err) {
    res.status(500).json({
      error: "Impossible d'ajouter le professeur à la classe",
      details: err.message,
    });
  }
};

// Récupérer tous les professeurs d'une classe
const getProfsByClasse = async (req, res) => {
  try {
    const { classeId } = req.params;

    const profs = await Prof.findAll({ where: { classeId } });
    if (profs.length === 0) {
      return res.status(404).json({
        error: "Aucun professeur trouvé dans la classe",
      });
    }

    res.json(profs);
  } catch (err) {
    res.status(500).json({
      error: "Impossible de récupérer les professeurs de la classe",
      details: err.message,
    });
  }
};

// mise a jour de professeur
const updateProf = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, dateDeNaissance, adresse, sexe, classeId } = req.body;
    // Vérifie que l'ID est un nombre valide
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID invalide" });
    }

    // Vérifie que le prof existe
    const prof = await Prof.findByPk(id);
    if (!prof) {
      return res.status(404).json({
        error: "Professeur non trouvé",
      });
    }

    // Vérifie que la classe existe
    const classe = await Classe.findByPk(classeId);
    if (!classe) {
      return res.status(404).json({
        error: "Classe non trouvée",
      });
    }

    // Mettre à jour le professeur
    await prof.update({
      nom,
      prenom,
      dateDeNaissance,
      adresse,
      sexe,
      classeId,
    });
    res.json({
      message: "Professeur mis à jour avec succès",
      prof,
    });
  } catch (err) {
    res.status(500).json({
      error: "Impossible de mettre à jour le professeur",
      details: err.message,
    });
  }
};

// Suppression de professeur
const deleteProf = async (req, res) => {
  try {
    const prof = await Prof.findByPk(req.params.id);
    if (!prof) {
      return res.status(404).json({
        error: "Professeur non trouvé",
      });
    }

    await prof.destroy();
    res.json({ message: "Professeur supprimé avec succès" });
  } catch (err) {
    res.status(500).json({
      error: "Impossible de supprimer le professeur",
      details: err.message,
    });
  }
};

module.exports = {
  getAllProfs,
  addProfToClasse,
  getProfsByClasse,
  updateProf,
  deleteProf,
};
