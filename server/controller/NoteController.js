const Note = require("../models/Note");
const Eleve = require("../models/Eleve");
const Matiere = require("../models/Matiere");

// Get All Notes
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.findAll();
    if (notes.length === 0) {
      return res.status(404).json({
        error: "Aucune note trouvée dans la base de données",
      });
    }
    res.json({
      message: "Liste des notes",
      notes,
    });
  } catch (err) {
    res.status(500).json({
      error: "Impossible de récupérer les notes",
      details: err.message,
    });
  }
};

// Create NotebyMatiere
const addNoteToEleve = async (req, res) => {
  try {
    const { eleveId, matiereId, note } = req.body;

    //Verifie si l'eleve existe
    const eleve = await Eleve.findByPk(eleveId);
    if (!eleve) {
      return res.status(404).json({
        error: "Eleve non trouvé",
      });
    }
    //Verifie si la matiere existe
    const matiere = await Matiere.findByPk(matiereId);
    if (!matiere) {
      return res.status(404).json({
        error: "Matiere non trouvée",
      });
    }
    // Créer une note
    const newNote = await Note.create({
      note,
      eleveId,
      matiereId,
    });
    res.status(201).json({
      message: "Note ajoutée à l'élève",
      newNote,
    });
  } catch (err) {
    res.status(500).json({
      error: "Impossible d'ajouter la note à l'élève",
      details: err.message,
    });
  }
};

// Récupérer toutes les notes d'un élève
const getNotesByEleve = async (req, res) => {
  try {
    const { eleveId } = req.params;

    const notes = await Note.findAll({ where: { eleveId } });
    if (notes.length === 0) {
      return res.status(404).json({
        error: "Aucune note trouvée pour cet élève",
      });
    }
    res.json({
      message: "Liste des notes de l'élève",
      notes,
    });
  } catch (err) {
    res.status(500).json({
      error: "Impossible de récupérer les notes de l'élève",
      details: err.message,
    });
  }
};

// Récupérer toutes les notes d'une matière
const getNotesByMatiere = async (req, res) => {
  try {
    const { matiereId } = req.params;

    const notes = await Note.findAll({ where: { matiereId } });
    if (notes.length === 0) {
      return res.status(404).json({
        error: "Aucune note trouvée pour cette matière",
      });
    }
    res.json({
      message: "Liste des notes de la matière",
      notes,
    });
  } catch (err) {
    res.status(500).json({
      error: "Impossible de récupérer les notes de la matière",
      details: err.message,
    });
  }
};

// Moyenne des notes d'un élève
const getMoyenneByEleve = async (req, res) => {
  try {
    const { eleveId } = req.params;

    const notes = await Note.findAll({ where: { eleveId } });
    if (notes.length === 0) {
      return res.status(404).json({
        error: "Aucune note trouvée pour cet élève",
      });
    }

    const total = notes.reduce((acc, note) => acc + note.note, 0);
    const moyenne = total / notes.length;

    res.json({
      message: "Moyenne de l'élève",
      moyenne,
    });
  } catch (err) {
    res.status(500).json({
      error: "Impossible de calculer la moyenne de l'élève",
      details: err.message,
    });
  }
};

// Update Note
const updateNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { note } = req.body;

    const noteToUpdate = await Note.findByPk(noteId);
    if (!noteToUpdate) {
      return res.status(404).json({
        error: "Note non trouvée",
      });
    }

    noteToUpdate.note = note;
    await noteToUpdate.save();

    res.json({
      message: "Note modifiée avec succès",
      noteToUpdate,
    });
  } catch (err) {
    res.status(500).json({
      error: "Impossible de modifier la note",
      details: err.message,
    });
  }
};

// Delete Note
const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findByPk(noteId);
    if (!note) {
      return res.status(404).json({
        error: "Note non trouvée",
      });
    }

    await note.destroy();

    res.json({
      message: "Note supprimée avec succès",
    });
  } catch (err) {
    res.status(500).json({
      error: "Impossible de supprimer la note",
      details: err.message,
    });
  }
};

module.exports = {
  getAllNotes,
  addNoteToEleve,
  getNotesByEleve,
  getNotesByMatiere,
  updateNote,
  deleteNote,
  getMoyenneByEleve,
};
