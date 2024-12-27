const express = require("express");
const router = express.Router();
const {
  getAllNotes,
  addNoteToEleve,
  getNotesByEleve,
  getNotesByMatiere,
  updateNote,
  deleteNote,
  getMoyenneByEleve,
} = require("../controller/NoteController");

router.get("/", getAllNotes);
router.post("/:eleveId", addNoteToEleve);
router.get("/eleves/:eleveId", getNotesByEleve);
router.get("/matieres/:matiereId", getNotesByMatiere);
router.put("/:noteId", updateNote);
router.delete("/:noteId", deleteNote);
router.get("/moyenne/:eleveId", getMoyenneByEleve);

module.exports = router;
