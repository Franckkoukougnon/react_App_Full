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

// Mettre à jour un élève
const updateEleve = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, dateDeNaissance, adresse, sexe, classeId } = req.body;

    // Vérifie que l'ID est un nombre valide
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID invalide" });
    }

    // Vérifie que l'élève existe
    const eleve = await Eleve.findByPk(id);
    if (!eleve) {
      return res.status(404).json({ error: "Elève non trouvé" });
    }

    // Vérifie que la classe existe seulement si classeId est fourni
    if (classeId) {
      const classe = await Classe.findByPk(classeId);
      if (!classe) {
        return res.status(404).json({ error: "Classe non trouvée" });
      }
    }

    // Validation des données
    if (!nom || !prenom) {
      return res.status(400).json({ error: "Nom et prénom sont obligatoires" });
    }

    if (dateDeNaissance && isNaN(Date.parse(dateDeNaissance))) {
      return res.status(400).json({ error: "Date de naissance invalide" });
    }

    // Mettre à jour l'élève
    await eleve.update({
      nom,
      prenom,
      dateDeNaissance,
      adresse,
      sexe,
      classeId,
    });

    // Réponse
    res.json({
      message: "Elève mis à jour avec succès",
      eleve,
    });
  } catch (err) {
    res.status(500).json({
      error: "Impossible de mettre à jour l'élève",
      details: err.message,
    });
  }
};

// Supprimer un élève
const deleteEleve = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifie que l'id est un nombre valide
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID invalide" });
    }
    const eleve = await Eleve.findByPk(req.params.id);
    if (!eleve) {
      return res.status(404).json({
        error: "Elève non trouvé",
      });
    }

    await eleve.destroy();
    res.json({ message: "Elève supprimé avec succès" });
  } catch (err) {
    res.status(500).json({
      error: "Impossible de supprimer l'élève",
      details: err.message,
    });
  }
};

module.exports = {
  getAllEleves,
  addEleveToClasse,
  getElevesByClasse,
  updateEleve,
  deleteEleve,
};
