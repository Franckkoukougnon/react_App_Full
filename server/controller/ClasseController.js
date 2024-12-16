const Classe = require("../models/Classe");

// Get All Classes

const allClasses = async (req, res) => {
  try {
    const classes = await Classe.findAll();
    if (classes.length === 0) {
      return res.status(404).json({
        error: "Aucune classe trouvée dans la base de données",
      });
    }

    res.json(classes);
  } catch (err) {
    res.status(500).json({
      error: "impossible de récupérer les classes",
      details: err.message,
    });
  }
};

// Get One Class
const classeById = async (req, res) => {
  try {
    const classe = await Classe.findByPk(req.params.id);
    if (!classe) {
      return res.status(404).json({
        error: "Classe non trouvée",
      });
    }

    res.json(classe);
  } catch (err) {
    res.status(500).json({
      error: "impossible de récupérer les classes",
      details: err.message,
    });
  }
};

// Create Class
const createClasse = async (req, res) => {
  try {
    const { nom } = req.body;
    if (!nom) {
      return res.status(400).json({
        error: "Le nom de la classe est obligatoire",
      });
    }

    const classe = await Classe.create({ nom });
    res.status(201).json(classe);
  } catch (err) {
    res.status(500).json({
      error: "Impossible de créer la classe",
      details: err.message,
    });
  }
};

// Update Class
const updateClasse = async (req, res) => {
  try {
    const { nom } = req.body;
    const classe = await Classe.findByPk(req.params.id);
    if (!classe) {
      return res.status(404).json({
        error: "Classe non trouvée",
      });
    }
    await classe.update({ nom });
    res.status(201).json(classe);
  } catch (err) {
    res.status(500).json({
      error: "Impossible de mettre à jour la classe",
      details: err.message,
    });
  }
};

// Delete Class
const deleteClasse = async (req, res) => {
  try {
    const classe = await Classe.findByPk(req.params.id);
    if (!classe) {
      return res.status(404).json({
        error: "Classe non trouvée",
      });
    }
    await classe.destroy();
    res.status(204).json({
      message: "Classe supprimée avec succès",
    });
  } catch (err) {
    res.status(500).json({
      error: "Impossible de supprimer la classe",
      details: err.message,
    });
  }
};

module.exports = {
  allClasses,
  classeById,
  createClasse,
  updateClasse,
  deleteClasse,
};
